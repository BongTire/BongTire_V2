import express, { Request, Response, Router } from 'express';
import db from '../../models';
import { Sequelize, DataTypes, QueryTypes, Op } from 'sequelize';
import logger from '../../config/logger';

const router: Router = express.Router();

const Brand = db.Brand;
const PCCD = db.PCCD;
const Tire = db.Tire;
const Wheel = db.Wheel;
const sequelize = db.sequelize;

interface GroupedDataItem {
  id: string;
  name: string;
  isDrivingMethod: boolean;
  filterPCCD: string | null;
  isImage: boolean;
  isBrand: boolean;
  value: any[];
}

function groupDataByFilterId(originalData: any[]): GroupedDataItem[] {
  const groupedData: GroupedDataItem[] = [];
  const groups: { [key: string]: GroupedDataItem } = {};

  originalData.forEach(item => {
    const { FilterId, name, PCCD, isBrand } = item;

    if (!groups[FilterId]) {
      groups[FilterId] = {
        id: FilterId,
        name: isBrand === 1 ? "브랜드" : name,
        isDrivingMethod: false,
        filterPCCD: PCCD,
        isImage: isBrand === 1,
        isBrand: isBrand === 1,
        value: []
      };
      groupedData.push(groups[FilterId]);
    }

    const valueData = {
      id: item.HashTagId,
      name: item.name,
      value: item.name,
      PCCD: item.PCCD,
      image: null,
    };
    groups[FilterId].value.push(valueData);
  });

  return groupedData;
}

const sendBrandFilter = (brand: any[]): { type: string; filter: any[] }[] => {
  return [
    {
      "type": "select",
      "filter": [...brand]
    }
  ];
}

router.get('/', async function (req: Request, res: Response) {
  const ptcd = req.query.ptcd as string;
  const pccd = req.query.pccd as string;
  const second = req.query?.isSecond === '1' ? 1 : 0;

  console.log(second);

  const page = parseInt(req.query.page as string, 10) || 1; // 페이지 번호
  const pageSize = parseInt(req.query.pageSize as string, 10) || 20; // 한 페이지에 보여줄 항목 수
  const offset = (page - 1) * pageSize; // offset 계산

  logger.info('start');

  if (ptcd === 'P0301' && pccd === 'F0901') { // 타이어 필터
    let filterResponse = [
      {
        type: 'select',
        filter: []
      },
      {
        type: "slide",
        filter: {
          title: "가격",
          minValue: 0,
          maxValue: 1000000
        }
      }
    ];

    // 브랜드 출력하기
    try {
      const result = await Brand.findAll({
        where: {
          PCCD: {
            [Op.like]: '%P0601%'
          }
        }
      });

      const brandFilter = [
        {
          type: "select",
          filter: [
            {
              id: 1,
              name: "브랜드",
              isDrivingMethod: false,
              filterPCCD: null,
              isImage: true,
              isBrand: true,
              value: result
            }
          ]
        },
        {
          type: "slide",
          filter: {
            title: "가격",
            minValue: 0,
            maxValue: 1000000
          }
        }
      ];

      logger.info('타이어 브랜드 데이터 성공');

      res.json({
        status: {
          code: 2000,
          message: '성공적으로 조회 했습니다.'
        },
        data: brandFilter
      });
    } catch (error) {
      logger.error(error);
      res.json({
        status: {
          code: 4000,
          message: "데이터를 찾지 못했습니다."
        },
        data: ''
      });
    }

  } else if (ptcd === 'P0301' && pccd === 'P0601') { // 타이어 상품
    try {
      // 총 게시물 개수 가져오기
    const countQuery = `
    SELECT 
        COUNT(*) AS totalProducts
    FROM 
        Tires
    WHERE 
        PCCD = :pccd 
    AND
      isSecond = :isSecond
    AND 
        deletedAt IS NULL`;

  const countResult = await sequelize.query(countQuery, {
    replacements: {
      pccd: pccd,
      isSecond: second
    },
    type: QueryTypes.SELECT,
  });
  const totalProduct = (countResult[0] as any).totalProducts;

  logger.info('gigi');
      const findData = await sequelize.query(`
        SELECT TireId AS id, T.BrandId AS BrandId, T.PCCD AS PCCD,
          drivingMethodPCCD, mCode, productName, tireSize, price,
          amount, discountRate, discountPrice, image, patternCode, maxSpeed,
          T.origin AS origin, xl, ply, numberOfDataUpdate, sales, viewers, isSecond, content, feature,
          isActive, isRecommanded, T.createdAt AS createdAt, T.updatedAt AS updatedAt, name AS brandName, B.origin AS brandOrigin, nation AS brandNation, brandLogo
        FROM Tires T
        JOIN Brands B ON T.BrandId = B.BrandId
        WHERE isSecond = :isSecond AND T.deletedAt IS NULL AND B.deletedAt IS NULL
        LIMIT :pageSize OFFSET :offset
      `, {
        type: QueryTypes.SELECT,
        replacements: { isSecond: second, pageSize, offset }
      });

      logger.info(findData);

      res.json({
        status: {
          code: 2000,
          message: '타이어 데이터 찾기에 성공했습니다.'
        },
        data: findData,
        total: totalProduct
      });
    } catch (error) {
      logger.error(error);
      res.json({
        status: {
          code: 4000,
          message: '타이어 데이터 찾기에 실패했습니다.' + error
        },
        data: ''
      });
    }

  } else if (ptcd === 'P0301' && pccd === 'F0902') { // 휠 필터
    // 브랜드 출력하기
    try {
      const result = await Brand.findAll({
        where: {
          PCCD: {
            [Op.like]: '%P0602%'
          }
        }
      });

      const brandFilter = [
        {
          type: "select",
          filter: [
            {
              id: 1,
              name: "브랜드",
              isDrivingMethod: false,
              filterPCCD: null,
              isImage: true,
              isBrand: true,
              value: result
            }
          ]
        },
        {
          type: "slide",
          filter: {
            title: "가격",
            minValue: 0,
            maxValue: 1000000
          }
        }
      ];

      logger.info('휠 브랜드 데이터 성공');

      res.json({
        status: {
          code: 2000,
          message: '성공적으로 조회 했습니다.'
        },
        data: brandFilter
      });
    } catch (error) {
      logger.error(error);
      res.json({
        status: {
          code: 4000,
          message: "데이터를 찾지 못했습니다."
        },
        data: ''
      });
    }

  } else if (ptcd === 'P0301' && pccd === 'P0602') { // 휠 상품
    // 총 게시물 개수 가져오기
    const countQuery = `
      SELECT 
          COUNT(*) AS totalProducts
      FROM 
          Wheels
      WHERE 
          PCCD = :pccd 
          AND isSecond = :isSecond
          AND deletedAt IS NULL;
          `;

    const countResult = await sequelize.query(countQuery, {
      replacements: {
        pccd: pccd,
        isSecond: second
      },
      type: QueryTypes.SELECT,
    });
    const totalProduct = (countResult[0] as any).totalProducts;

    try {
      const findData = await sequelize.query(`
        SELECT *, WheelId AS id, W.BrandId AS BrandId, W.PCCD AS PCCD,
          drivingMethodPCCD, productName, wheelSize, frontOffset, rearOffset, price,
          amount, discountRate, discountPrice, image,
          sales, viewers, isSecond, content, feature,
          isActivate, isContinue, W.createdAt AS createdAt, W.updatedAt AS updatedAt, name AS brandName, B.origin AS brandOrigin, nation AS brandNation, brandLogo, PCD, hole
        FROM Wheels W
        JOIN Brands B ON W.BrandId = B.BrandId
        WHERE W.isSecond = :isSecond AND W.deletedAt IS NULL AND B.deletedAt IS NULL
        LIMIT :pageSize OFFSET :offset
      `, {
        type: QueryTypes.SELECT,
        replacements: { isSecond: second, pageSize, offset }
      });

      logger.info(findData);

      res.json({
        status: {
          code: 2000,
          message: '휠 데이터 찾기에 성공했습니다.'
        },
        data: findData,
        total: totalProduct
      });
    } catch (error) {
      logger.error(error);
      res.json({
        status: {
          code: 4000,
          message: '휠 데이터 찾기에 실패했습니다.' + error
        },
        data: ''
      });
    }
  }
});

export default router;
