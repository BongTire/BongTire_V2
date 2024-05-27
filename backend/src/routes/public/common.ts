import express, { Request, Response, Router } from 'express';
import { Sequelize, DataTypes,QueryTypes } from 'sequelize';
import logger from '../../config/logger';
import db from '../../models';
import {returnFormat} from '../../utils/return'

const PCCD = db.PCCD
const PTCD = db.PTCD
const sequelize = db.sequelize

const router: Router = express.Router();

// PTCD 데이터를 가져오는 엔드포인트
router.get('/ptcd', async (req: Request, res: Response) => {
    try {
        const findData = await PTCD.findAll();
        
        const returnFormatData = returnFormat(2000,"PTCD를 성공적으로 가져왔습니다.",findData)
        res.json(returnFormatData);
    } catch (error) {
        const returnFormatData = returnFormat(4000,'불러오는 것을 실패했습니다.',error)
        res.json(returnFormatData);
    }
});

// PCCD 데이터를 가져오는 엔드포인트
router.get('/pccd', async (req: Request, res: Response) => {
    try {
        const findData = await PCCD.findAll();
        const returnFormatData = returnFormat(2000,"PCCD를 성공적으로 가져왔습니다.",findData)
        res.json(returnFormatData);
    } catch (error) {
        logger.error('데이터 업데이트 및 생성 실패의 전체 로직이 실패했습니다. ' + error);
        const returnFormatData = returnFormat(4000,'불러오는 것을 실패했습니다.',error)
        res.json(returnFormatData);
        
    }
});

// 즐겨찾기 데이터를 가져오는 엔드포인트
router.get('/fav', (req: Request, res: Response) => {
    
    const returnFormatData = returnFormat(2000,'성공적으로 조회 했습니다.',favData)
    res.json(returnFormatData);
});

// 즐겨찾기 데이터
const favData = [
    {
        id: 1,
        isUrl: true,
        url: "/product/tire?pccd=P0601",
        status: true,
        title: "타이어",
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/tire-icon.png`
    },
    {
        id: 2,
        isUrl: true,
        url: "/product/tire?pccd=P0601&isSecond=1",
        status: true,
        title: "중고 타이어",
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/tire-test-icon.png`
    },
    {
        id: 2,
        isUrl: true,
        url: "/product/wheel?pccd=P0602",
        title: "휠",
        status: true,
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/wheel-icon.png`
    },
    {
        id: 3,
        isUrl: false,
        url: "/product/wheel?pccd=P0602&isSecond=1",
        title: "중고 휠",
        status: true,
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/wheel-icon 1.png`
    },
    {
        id: 4,
        isUrl: true,
        url: "/reservation?pccd=R0801",
        title: "예약",
        status: true,
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/car-repair-icon.png`
    },
];

// 추천 타이어 데이터를 가져오는 엔드포인트
router.get('/product/rank', async (req: Request, res: Response) => {
    try {
        const recommendTireDatas = await sequelize.query(
            `SELECT * FROM Tires 
             JOIN Brands ON Tires.BrandId = Brands.BrandId 
             WHERE Tires.isRecommanded = true 
             AND Tires.deletedAt IS NULL 
             AND Brands.deletedAt IS NULL`, 
             { type: QueryTypes.SELECT }
        );

        if (recommendTireDatas.length === 0) {
            const returnFormatData = returnFormat(4000,'추천타이어를 불러오지 못했습니다.',{})
            res.json(returnFormatData);
        } else {
            const returnFormatData = returnFormat(2000,'추천타이어를 불러왔습니다.',recommendTireDatas)
            res.json(returnFormatData);
        }
    } catch (error) {
        logger.error('/recommendTire 에러발생: ' + error);
        const returnFormatData = returnFormat(4000,'추천타이어를 불러오는데 실패했습니다.',error)
        res.json(returnFormatData);
    }
});

export default router; 