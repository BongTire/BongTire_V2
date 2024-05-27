import express, { Request, Response } from 'express';
import { Sequelize, DataTypes, Op } from 'sequelize';
import axios from 'axios';
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';
import db from '../../models';
import logger from '../../config/logger';
import {returnFormat} from '../../utils/return'

const router = express.Router();
const Brand = db.Brand;
const Car = db.Car;
const CarTrim = db.CarTrim;
/**
 *
 * TODO
 *
 * 차량 Get - 제네시스, 벤츠로 default -> 완성
 * 차량 Insert, Update             -> 완성
 * 차량 Trim Insert, Update Init   -> 완성
 * 차량 Trim Insert, Update        -> 완성
 * delete 로직                     -> 미완
 *
 */

// init Get
router.get('/', async (req: Request, res: Response) => {
    const result:any = [
        {
            BrandId: 1,
            name: "",
            brandLogo: "",
            origin: true,
            nation: "",
            carList: []
        },
        {
            BrandId: 6,
            name: "",
            brandLogo: "",
            origin: true,
            nation: "",
            carList: []
        },
    ];
    try {
        const [domesticBrand, importedBrand] = await Promise.all([
            Brand.findOne({
                where: { BrandId: result[0].BrandId }
            }),
            Brand.findOne({
                where: { BrandId: result[1].BrandId }
            })
        ]);

        if (domesticBrand) {
            result[0].brandLogo = domesticBrand.brandLogo;
            result[0].name = domesticBrand.name;
            result[0].origin = domesticBrand.origin;
            result[0].nation = domesticBrand.nation;
            logger.info('국산 차량 브랜드 찾기 성공 ' + domesticBrand);
        }

        if (importedBrand) {
            result[1].brandLogo = importedBrand.brandLogo;
            result[1].name = importedBrand.name;
            result[1].origin = importedBrand.origin;
            result[1].nation = importedBrand.nation;
            logger.info('수입 차량 브랜드 찾기 성공 ' + importedBrand);
        }

        const [domesticCars, importedCars] = await Promise.all([
            Car.findAll({
                where: { BrandId: result[0].BrandId }
            }),
            Car.findAll({
                where: { BrandId: result[1].BrandId }
            })
        ]);

        const transformCarData = (cars: any[]) => {
            return cars.map(data => ({
                CarId: data.CarId,
                BrandId: data.BrandId,
                drivingMethodPCCD: JSON.parse(data.drivingMethodPCCD),
                PCCD: JSON.parse(data.PCCD),
                name: data.name,
                codeName: data.codeName,
                powerTrain: JSON.parse(data.powerTrain),
                displacement: data.displacement,
                image: data.image,
                year: data.year,
                deletedAt: data.deletedAt
            }));
        };

        if (domesticCars) {
            result[0].carList = transformCarData(domesticCars);
            logger.info('국산 차량 찾기 성공 ' + domesticCars);
        }

        if (importedCars) {
            result[1].carList = transformCarData(importedCars);
            logger.info('수입 차량 찾기 성공 ' + importedCars);
        }

        
        const returnFormatData = returnFormat(2000,'데이터를 성공적으로 전송했습니다.',result)
        res.json(returnFormatData);
    } catch (error) {
        console.error(error);
        const returnFormatData = returnFormat(5000,'데이터 전송 중 오류가 발생했습니다.',null)
        res.json(returnFormatData);
        
    }
});

// 클릭 이벤트 할시

router.get('/:id', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const BrandId: number = parseInt(req.params.id);
    let result: any = {
        BrandId: BrandId,
        name: "",
        codeName: "",
        brandLogo: "",
        origin: true,
        nation: "",
        carList: []
    };

    try {
        const findData = await Brand.findOne({
            where: {
                BrandId: BrandId
            }
        });

        if (findData) {
            logger.info('국산 브랜드 찾기 성공' + findData);
            result = {
                BrandId: findData.BrandId,
                name: findData.name,
                codeName: findData.codeName,
                brandLogo: findData.brandLogo,
                origin: findData.origin,
                nation: findData.nation,
                carList: []
            };
        } else {
            logger.error('브랜드 값 불러오기 오류');
        }

        const carData = await Car.findAll({
            where: {
                BrandId: BrandId
            }
        });

        if (carData && carData.length > 0) {
            logger.info('국산 차량 찾기 성공' + carData);
            const transArray: any[] = [];

            carData.forEach((data: any) => {
                transArray.push({
                    CarId: data.CarId,
                    BrandId: data.BrandId,
                    drivingMethodPCCD: JSON.parse(data.drivingMethodPCCD),
                    PCCD: JSON.parse(data.PCCD),
                    name: data.name,
                    codeName: data.codeName,
                    powerTrain: JSON.parse(data.powerTrain),
                    displacement: data.displacement,
                    image: data.image,
                    year: data.year,
                    deletedAt: data.deletedAt
                });
            });

            result.carList = [...transArray];
        } else {
            logger.error('차량 값이 없습니다');
        }

        
        const returnFormatData = returnFormat(2000,'TODO: 해당 로직 수정 바람.',result)
        res.json(returnFormatData);
        
    } catch (error) {
        console.error(error);
        const returnFormatData = returnFormat(4000,'TODO: 해당 로직 수정 바람.',null)
        res.json(returnFormatData);
    }
});


router.post('/', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const reqCarData = {
        ...req.body.data,
        powerTrain: JSON.stringify(req.body.data.powerTrain),
        drivingMethodPCCD: JSON.stringify(req.body.data.drivingMethodPCCD),
        PCCD: JSON.stringify(req.body.data.PCCD)
    };

    try {
        if (reqCarData.CarId === null) {
            const createData = await Car.create(reqCarData);
            logger.info('차량 추가 성공' + createData);
            // TODO: 공통 로직으로 변경 요청
            
            const returnFormatData = returnFormat(2000,'데이터 추가에 성공했습니다.',null)
            res.json(returnFormatData);
        } else {
            const existingData = await Car.findByPk(reqCarData.CarId);
            if (existingData) {
                const result = await Car.update(reqCarData, { where: { CarId: reqCarData.CarId } });
                logger.info('차량 브랜드 데이터 업데이트 성공' + result);
            } else {
                const result = await Car.create(reqCarData);
                logger.info('차량 추가 성공' + result);
            }
            // TODO: 공통 로직으로 변경 요청
            
            const returnFormatData = returnFormat(2000,'데이터 업데이트에 성공했습니다.',null)
            res.json(returnFormatData);
        }
    } catch (error) {
        logger.error('차량 추가에 실패했습니다.' + error);
        // TODO: 공통 로직으로 변경 요청
        const returnFormatData = returnFormat(4000,'데이터 추가에 실패했습니다.',null)
        res.json(returnFormatData);
    }
});

router.post('/init', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const initCarData: any[] = req.body.data;

    initCarData.forEach((car) => {
        car.PCCD = JSON.stringify(car.PCCD);
        car.drivingMethodPCCD = JSON.stringify(car.drivingMethodPCCD);
        car.powerTrain = JSON.stringify(car.powerTrain);
    });

    try {
        await Car.bulkCreate(initCarData);
        logger.info(await Car.findAll());

        // TODO: 공통 로직으로 변경 요청
       
        const returnFormatData = returnFormat(2000,'차량 초기화 데이터 생성 성공',null)
        res.json(returnFormatData);

    } catch (error) {
        // TODO: 공통 로직으로 변경 요청
        logger.error('차량 데이터 생성 실패' + error);
        const returnFormatData = returnFormat(4000,'차량 데이터 생성 실패',null)
        res.json(returnFormatData);
    }
});
router.get('/trim/:id', isAuthenticatedAdmin, async (req: Request, res: Response) => {
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

router.post('/trim', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const carTrimData = req.body.data;

    try {
        if (carTrimData.CarTrimId === null) {
            CarTrim.create(carTrimData)
                .then(createData => {
                    logger.info('트림 데이터 생성 성공' + createData);
                })
                .catch(error => {
                    logger.error('트림 데이터 생성 실패' + error);
                });
        } else {
            CarTrim.findByPk(carTrimData.CarTrimId)
    .then(existingData => {
        if (existingData !== null && existingData !== undefined) {
            return CarTrim.update(carTrimData, { where: { CarTrimId: carTrimData.CarTrimId } })
                .then(result => {
                    logger.info('트림 데이터 업데이트 성공' + result);
                    // TODO: 공통 로직으로 변경 요청
                    
                    const returnFormatData = returnFormat(2000,"데이터 업데이트에 성공했습니다.",[])
                    res.json(returnFormatData);
                })
                .catch(error => {
                    logger.error('트림 데이터 업데이트 실패' + error);
                    // TODO: 공통 로직으로 변경 요청
                    
                    const returnFormatData = returnFormat(4000,"데이터 업데이트에 실패했습니다.",[])
                    res.json(returnFormatData);
                });
        } else {
            return CarTrim.create(carTrimData)
                .then(result => {
                    logger.info('트림 데이터 추가 성공' + result);
                    // TODO: 공통 로직으로 변경 요청
                    
                    const returnFormatData = returnFormat(2000,"데이터 추가에 성공했습니다.",[])
                    res.json(returnFormatData);
                })
                .catch(error => {
                    logger.error('트림 데이터 추가 실패' + error);
                    // TODO: 공통 로직으로 변경 요청
                    
                    const returnFormatData = returnFormat(4000,"데이터 추가에 실패했습니다.",[])
                    res.json(returnFormatData);
                });
        }
    })
    .catch(error => {
        logger.error('트림 데이터 검색 실패' + error);
        // TODO: 공통 로직으로 변경 요청
        
        const returnFormatData = returnFormat(4000,"데이터 검색에 실패했습니다.",[])
        res.json(returnFormatData);
    });

        }
    } catch (error) {
        // Handle error
        logger.error(error)
        const returnFormatData = returnFormat(4000,"데이터 검색에 실패했습니다..",[])
        res.json(returnFormatData);
    }
});

router.post('/trim/init', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const carTrimDatas = req.body.data;
    try {
        await CarTrim.bulkCreate(carTrimDatas);
        logger.info(await CarTrim.findAll());
        // TODO: 공통 로직으로 변경 요청
        
        const returnFormatData = returnFormat(2000,'성공',[])
        res.json(returnFormatData);
    } catch (error) {
        logger.error('데이터 생성에 실패했습니다.' + error);
        // TODO: 공통 로직으로 변경 요청
        
        const returnFormatData = returnFormat(4000,'실패',[])
        res.json(returnFormatData);
    }
});

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
                    price: carTrim.price.toLocaleString(),
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

export default router;
