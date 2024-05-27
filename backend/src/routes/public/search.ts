import express, { Request, Response } from 'express';
import  db  from '../../models';
import { Sequelize, DataTypes, QueryTypes, Op } from 'sequelize';
import logger from '../../config/logger';
import {returnFormat} from '../../utils/return'

const router = express.Router();

const Post = db.Post
const Tire = db.Tire

router.post('/', async (req: Request, res: Response) => {
  const searchText: string = req.body.data;
  logger.info(searchText);
  try {
    const results = await Tire.findAll({
      where: {
        [Op.or]: [
          { tireSize: { [Op.like]: `%${searchText}%` } },
          { productName: { [Op.like]: `%${searchText}%` } }
        ]
      }
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

export default router;
