import express, { Request, Response } from 'express';
import  db  from '../../models';
import { Sequelize, DataTypes, QueryTypes, Op, col } from 'sequelize';
import logger from '../../config/logger';
import {returnFormat} from '../../utils/return'
import CarTrim from '../../models/CarTrim';

const router = express.Router();

const Post = db.Post
const Tire = db.Tire
const Brand = db.Brand
const Car = db.Car
const Wheel = db.Wheel

router.post('/', async (req: Request, res: Response) => {
  const searchText: string = req.body.data;
  logger.info(searchText);
  try {
    const results = await Tire.findAll({
      attributes:[
          [col('TireId'), 'id'],  //
          'BrandId',
          'PCCD',
          'productName',
          'tireSize',
          'discountRate',
          'price',
          'discountPrice',
          'image'
      ],
      where: {
        [Op.or]: [
          { tireSize: { [Op.like]: `%${searchText}%` } },
          { productName: { [Op.like]: `%${searchText}%` } }
        ]
      },
      limit: 100,
    });

    logger.info(results);
    res.json({
      status: {
        code: 2000,
        message: '성공적으로 검색했습니다.'
      },
      data: results ?? ''
    });
  } catch (error) {
    logger.error(error);
    res.json({
      status: {
        code: 4000,
        message: '검색에 실패 했습니다. ' + error
      },
      data: ''
    });
  }
});
router.get('/brand', async (req: Request, res: Response) => { //차량브랜드
  try {
    const carBrand = await Brand.findAll({
      where: {
        PCCD: {
          [Op.like]: '%C07%',
        },
      },
    });
    const brand = JSON.parse(JSON.stringify(carBrand));
    const result = returnFormat(2000,'성공',brand)
    res.json(result);
  } catch (error) {
    logger.error(error);
    const result = returnFormat(5000,'서버오류',error)
    res.json(result);
    
  }
});
router.post('/car',async (req: Request, res: Response) => { //자동차 종류
  const brandId = req.body?.BrandId ?? 1

  try {
    const carDatas = await Car.findAll({
      where:{
        BrandId :brandId
      },
      raw:true
    })
    if(carDatas.length!== 0){
      logger.info('car 데이터 조회 성공')
      const result = returnFormat(2000,'car 데이터 조회 성공',carDatas)
      return res.json(result);
    }else{
      logger.info('해당 브랜드 car 데이터 미존재')
      const result = returnFormat(4000,'해당 브랜드 car 데이터 미존재',carDatas)
      return res.json(result);
    }
    
  } catch (error) {
    logger.error('car 데이터 조회 실패'+error);
    const result = returnFormat(4000,'car 데이터 조회 실패',error)
    res.json(result);
  }
});
router.get('/cartrim/:id',async (req:Request , res: Response)=>{
    const carId: number = parseInt(req.params.id);

    let carTrimData: any = {
        CarId: carId,
        name: null,
        brand: {
            BrandId: null,
            name: null,
            codeName: null,
            brandLogo: null,
            origin: null,
            nation: null
        },
        yearList: []
    };

    try {
        const carData = await Car.findOne({
            where: {
                CarId: carId
            }
        });

        if (carData) {
            carTrimData.CarId = carData.CarId;
            carTrimData.name = carData.name;
        } else {
            logger.error('차량 데이터를 찾을 수 없습니다');
        }
    } catch (error) {
        logger.error(error);
    }

    try {
        const carData = await Car.findOne({
            where: {
                CarId: carId
            }
        });

        if (carData) {
            const brandId = carData.BrandId;
            const findData = await Brand.findOne({
                where: {
                    BrandId: brandId
                }
            });

            if (findData) {
                carTrimData.brand.BrandId = findData.BrandId;
                carTrimData.brand.name = findData.name;
                carTrimData.brand.codeName = findData.codeName;
                carTrimData.brand.brandLogo = findData.brandLogo;
                carTrimData.brand.origin = findData.origin;
                carTrimData.brand.nation = findData.nation;
            } else {
                logger.error('브랜드 데이터를 정상적으로 찾아오지 못했습니다.');
            }
        } else {
            logger.error('차량 데이터가 정상적이지 않습니다.');
        }
    } catch (error) {
        logger.error(error);
    }

    try {
        const findData = await CarTrim.findAll({
            where: {
                CarId: carId
            }
        });

        const groupedDataByYear = transformCarData(findData);
        carTrimData.yearList = [...groupedDataByYear];


        const returnFormatData = returnFormat(2000,"트림 데이터를 성공적으로 가져왔습니다.",{ ...carTrimData })
        res.json(returnFormatData);

    } catch (error) {
        logger.error('차량 데이터를 가져오는데 실패했습니다.' + error);
        const returnFormatData = returnFormat(4000,"데이터를 가져오는데 실패했습니다.",{ ...carTrimData })
        res.json(returnFormatData);
    }
})
// Utility function to extract the numeric portion at the end of the tire size string
function extractNumericPortion(tireSize: string): string {
  const match = tireSize.match(/\d+$/);
  return match ? match[0] : '';
}
router.post('/fitwheels',async (req:Request , res: Response)=>{
  const sizeArray = req.body.data.size
  try {
    const extractedPortions = sizeArray.map(extractNumericPortion);
    logger.info(JSON.stringify(extractNumericPortion))

    // Construct the `where` clause dynamically
    const whereClause = {
      [Op.or]: extractedPortions.map((portion:any) => ({
        wheelSize: {
          [Op.like]: `%${portion}%`
        }
      }))
    };
    const wheelDatas = await Wheel.findAll({
      where: whereClause
    })
    if(wheelDatas.length!== 0){
      logger.info('맞는 wheel 데이터 조회 성공')
      const result = returnFormat(2000,'맞는 wheel 데이터 조회 성공',wheelDatas)
      return res.json(result);
    }else{
      logger.info('맞는 wheel 데이터 미존재')
      const result = returnFormat(4000,'맞는 wheel 데이터 미존재',wheelDatas)
      return res.json(result);
    }
    
  } catch (error) {
    logger.error('맞는 wheel 조회 실패'+error);
    const result = returnFormat(4000,'맞는 wheel 조회 실패',error)
    res.json(result);
  }
})
router.post('/fitTires',async (req:Request , res: Response)=>{
  const sizeArray = req.body.data.size
  try {
    const whereClause = {
      [Op.or]: sizeArray.map((portion:any) => ({
        tireSize: {
          [Op.like]: `%${portion}%`
        }
      }))
    };
    const tireDatas = await Tire.findAll({
      where: whereClause
    })
    if(tireDatas.length!== 0){
      logger.info('맞는 tire 데이터 조회 성공')
      const result = returnFormat(2000,'맞는 tire 데이터 조회 성공',tireDatas)
      return res.json(result);
    }else{
      logger.info('맞는 tire 데이터 미존재')
      const result = returnFormat(4000,'맞는 tire 데이터 미존재',tireDatas)
      return res.json(result);
    }
    
  } catch (error) {
    logger.error('맞는 tire 조회 실패'+error);
    const result = returnFormat(4000,'맞는 tire 조회 실패',error)
    res.json(result);
  }
})




function transformCarData(data: any[]) {
  let transformedData: any[] = [];

  // 연도별로 데이터 분리
  let years: Set<number> = new Set(data.map(carTrim => carTrim.year));
  years.forEach(year => {
      let trimList: any[] = [];
      data.forEach(carTrim => {
          if (carTrim.year === year) {
              let trim = {
                  id: carTrim.CarTrimId,
                  name: carTrim.name,
                  price: carTrim.price? carTrim.price.toLocaleString(): null,
                  image: carTrim.image,
                  frontTire: carTrim.frontTireSize,
                  rearTire: carTrim.rearTireSize,
                  frontBrake: carTrim.frontBrackeType,
                  rearBrake: carTrim.rearBrackeType,
                  traction: carTrim.traction,
                  curbWeight: carTrim.curbWeight,
                  combinedEfficiency: carTrim.combinedEfficiency + "km/l"
              };
              trimList.push(trim);
          }
      });
      transformedData.push({ year: year, trimList: trimList });
  });

  return transformedData;
}

router.get('/trim/:id', async (req: Request, res: Response) => {
  const carId: number = parseInt(req.params.id);

  let carTrimData: any = {
      CarId: carId,
      name: null,
      brand: {
          BrandId: null,
          name: null,
          codeName: null,
          brandLogo: null,
          origin: null,
          nation: null
      },
      yearList: []
  };

  try {
      const carData = await Car.findOne({
          where: {
              CarId: carId
          }
      });

      if (carData) {
          carTrimData.CarId = carData.CarId;
          carTrimData.name = carData.name;
      } else {
          logger.error('차량 데이터를 찾을 수 없습니다');
      }
  } catch (error) {
      logger.error(error);
  }

  try {
      const carData = await Car.findOne({
          where: {
              CarId: carId
          }
      });

      if (carData) {
          const brandId = carData.BrandId;
          const findData = await Brand.findOne({
              where: {
                  BrandId: brandId
              }
          });

          if (findData) {
              carTrimData.brand.BrandId = findData.BrandId;
              carTrimData.brand.name = findData.name;
              carTrimData.brand.codeName = findData.codeName;
              carTrimData.brand.brandLogo = findData.brandLogo;
              carTrimData.brand.origin = findData.origin;
              carTrimData.brand.nation = findData.nation;
          } else {
              logger.error('브랜드 데이터를 정상적으로 찾아오지 못했습니다.');
          }
      } else {
          logger.error('차량 데이터가 정상적이지 않습니다.');
      }
  } catch (error) {
      logger.error(error);
  }

  try {
      const findData = await CarTrim.findAll({
          where: {
              CarId: carId
          }
      });

      const groupedDataByYear = transformCarData(findData);
      carTrimData.yearList = [...groupedDataByYear];

      
      const returnFormatData = returnFormat(2000,"트림 데이터를 성공적으로 가져왔습니다.",{ ...carTrimData })
      res.json(returnFormatData);
      
  } catch (error) {
      logger.error('차량 데이터를 가져오는데 실패했습니다.' + error);
      const returnFormatData = returnFormat(4000,"데이터를 가져오는데 실패했습니다.",{ ...carTrimData })
      res.json(returnFormatData);
  }
});


export default router;
