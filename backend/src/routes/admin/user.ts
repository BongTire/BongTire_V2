import express, { Request, Response, Router } from 'express';
import db from '../../models';
import logger from '../../config/logger';
import { isAuthenticatedAdmin } from '../../middleware/auth';
import {returnFormat} from '../../utils/return'
const User = db.User

const router: Router = express.Router();

router.get('/', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        
        const returnFormatData = returnFormat(2000,'유저 데이터 추출에 성공했습니다.',users)
        res.json(returnFormatData);
    } catch (error) {
        logger.error(error);
        
        const returnFormatData = returnFormat(4000,'유저 데이터 찾기를 실패했습니다.',"")
        res.json(returnFormatData);
    }
});

router.post('/', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        if (!userData.UserId) {
            await User.create(userData);
            logger.info('유저 데이터 추가 성공');
            const returnFormatData = returnFormat(2000,'유저 데이터 추가 성공',"")
            res.json(returnFormatData);
        } else {
            const existingData = await User.findByPk(userData.UserId);
            if (existingData) {
                await User.update(userData, { where: { UserId: userData.UserId } });
            } else {
                await User.create(userData);
            }
            logger.info('유저 데이터 업데이트 성공');
            res.json({
                status: {
                    code: 2000,
                    message: 
                },
                data: {}
            });
            const returnFormatData = returnFormat(2000,'유저 데이터 업데이트 성공',[])
            res.json(returnFormatData);
        }
    } catch (error) {
        logger.error('유저 데이터 처리 실패' + error);
        
        const returnFormatData = returnFormat(4000,'유저 데이터 처리 실패',error)
        res.json(returnFormatData);
    }
});

export default router;
