import express, { Request, Response, Router } from 'express';
import db from '../../models';
import logger from '../../config/logger';
import { Sequelize, DataTypes, Op } from 'sequelize';
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';
import { returnFormat } from '../../utils/return';

const router: Router = express.Router();
const Brand = db.Brand;
const PCCD = db.PCCD;
const PCCDBrandConnectionTable = db.PCCDBrandConnectionTable;
const sequelize = db.sequelize;

// 차량 브랜드
router.get('/car', isAuthenticatedAdmin, async (req: Request, res: Response) => {
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
    const result = returnFormat(5000,'서버오류',null)
    res.json(result);
    
  }
});

// 브랜드 추가
router.post('/', isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const reqBrandData: any = { ...req.body.data, PCCD: req.body.data.PCCD };
  const brandPCCD: any[] = [...req.body.data.PCCD];

  await insertAndUpdateBrand(reqBrandData, brandPCCD, res);
});

const insertAndUpdateBrand = async (reqBrandData: any, brandPCCD: any[], res: Response) => {
  try {
    if (reqBrandData.BrandId === null) {
      await Brand.create(reqBrandData)
        .then(async (createData) => {
          logger.info('차량 브랜드 데이터 추가 성공' + createData.BrandId);
          await insertBrandPCCDConnectTable(brandPCCD, createData.BrandId);
        })
        .catch((error) => {
          logger.error('차량 브랜드 데이터 추가 실패 ' + error);
        });
    } else {
      const existingData = await Brand.findByPk(reqBrandData.BrandId);
      if (existingData) {
        await Brand.update(reqBrandData, { where: { BrandId: reqBrandData.BrandId } });
        logger.info('차량 브랜드 데이터 업데이트 성공');
      } else {
        await Brand.create(reqBrandData);
        logger.info('차량 브랜드 데이터 추가 성공');
      }
    }
    
    const result = returnFormat(2000,'POST 성공',null)
    res.json(result);
  } catch (error) {
    logger.error('데이터 삽입 실패' + error);
    const result = returnFormat(50000,'데이터 삽입 실패',null)
    res.json(result);
    
  }
};

// 여러 브랜드를 동시에 데이터 주입시 사용 -> 극 초반에 사용하다가, 이후에 폐기 하던지 혹은 개선해서 나올 예정
router.post('/init', isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const initBrand: any[] = req.body.data;

  initBrand.map((brand) => {
    brand.PCCD = JSON.stringify(brand.PCCD);
  });

  try {
    Brand.bulkCreate(initBrand)
      .then(() => {
        logger.info(Brand.findAll());
        
        const result = returnFormat(2000,'성공',[])
        res.json(result);
      })
      .catch((error) => {
        logger.error('브랜드 벌크 업데이트 실패' + error);
        
        const result = returnFormat(4000,'초기 데이터 생성 실패',null)
        res.json(result);
      });
  } catch (error) {
    logger.error(error);
    const result = returnFormat(4000,'실패',null)
    res.json(result);
  }
});

const insertBrandPCCDConnectTable = async (brandPCCD: string[], brandId: number | null) => {
  if (brandId === null) return;

  try {
    for (const data of brandPCCD) {
      const result = await PCCD.findOne({
        attributes: ['PCCDId'],
        where: {
          PCCD: data,
        },
      });
      if (result) {
        await PCCDBrandConnectionTable.create({
          PCCDId: result.PCCDId,
          BrandId: brandId,
        })
          .then((result) => {
            logger.info('PCCDBrandConnection 테이블 생성 성공' + result);
          })
          .catch((error) => {
            logger.error(error);
          });
      }
    }
  } catch (error) {
    logger.error(error);
    
  }
};

export default router;
