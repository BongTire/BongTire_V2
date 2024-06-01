import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../config/logger';
import { isAuthenticatedAdmin } from '../../middleware/auth';
import {returnFormat} from '../../utils/return'

const Tire = db.Tire
const Wheel = db.Wheel
const Brand = db.Brand
const sequelize = db.sequelize
const router = express.Router();

router.get('/tire', isAuthenticatedAdmin,async function (req: Request, res: Response) {
    try {
        const response = await sequelize.query(`
            select T.TireId as TireId, T.BrandId as BrandId, name as brandName, T.PCCD as PCCD, 
            T.drivingMethodPCCD, T.productName, T.content, T.patternCode, T.mCode, T.tireSize, 
            T.maxWeight, T.maxSpeed, T.xl, T.ply, T.origin, T.price, T.feature, T.amount, T.discountPrice, 
            T.discountRate, T.numberOfDataUpdate, T.sales, T.viewers, T.isSecond, T.isActive, T.isVisible, T.isRecommanded 
            from Tires T 
            join Brands B on B.BrandId = T.BrandId 
            where T.deletedAt IS NULL`);
        const data = [...response];
        
        const returnFormatData = returnFormat(2000,'타이어 데이터 찾기의 성공했습니다.',data[0])
        res.json(returnFormatData);
    } catch (error) {
        logger.error(error);
        
        const returnFormatData = returnFormat(4000,'타이어 데이터 찾기의 실패 했습니다..',[])
        res.json(returnFormatData);
    }
});

router.post('/tire', isAuthenticatedAdmin, async function (req: Request, res: Response) {
    const tireData = req.body;

    const tireFormatData = {
        TireId: tireData.TireId,
        BrandId: tireData.BrandId,
        PCCD: tireData.PCCD,
        drivingMethodPCCD: JSON.stringify(tireData.drivingMethodPCCD) ?? null,
        mCode: tireData.mCode ?? null,
        productName: tireData.productName,
        tireSize: tireData.tireSize,
        price: tireData.price,
        amount: tireData.amount,
        discountRate: tireData.discountRate ?? null,
        discountPrice: tireData.discountPrice ?? null,
        image: tireData.image ?? null,
        patternCode: tireData.patternCode ?? null,
        maxSpeed: tireData.maxSpeed ?? null,
        maxWeight: tireData.maxWeight ?? null,
        origin: tireData.origin ?? null,
        xl: tireData.xl ?? null,
        ply: tireData.ply ?? null,
        numberOfDataUpdate: tireData.numberOfDataUpdate ?? 0,
        sales: tireData.sales ?? null,
        viewers: tireData.viewers ?? null,
        isSecond: tireData.isSecond ?? null,
        content: tireData.content ?? null,
        feature: tireData.feature ?? null,
        isActive: tireData.isActive ?? null,
        isVisible: tireData.isVisible ?? null,
        isContinue: tireData.isContinue ?? null
    };

    if (tireFormatData.TireId === null) {
        try {
            const createData = await Tire.create(tireFormatData);
            logger.info('타이어 데이터 추가 성공' + createData);
            
            const returnFormatData = returnFormat(2000,'타이어 데이터 추가 성공',[])
            res.json(returnFormatData);
        } catch (error) {
            logger.error('타이어 데이터 추가 실패' + error);
            
            const returnFormatData = returnFormat(4000,'타이어 데이터 추가 실패',{error})
            res.json(returnFormatData);
        }
    } else {
        try {
            const existingData = await Tire.findByPk(tireFormatData.TireId);
            let result;
            if (existingData) {
                result = await Tire.update(tireFormatData, { where: { TireId: tireFormatData.TireId } });
            } else {
                result = await Tire.create(tireFormatData);
            }
            logger.info('타이어 데이터 업데이트 성공' + result);
            
            const returnFormatData = returnFormat(2000,'타이어 데이터 업데이트 성공',[])
            res.json(returnFormatData);
        } catch (error) {
            logger.error('타이어 데이터 업데이트 실패' + error);
            
            const returnFormatData = returnFormat(4000,'데이터 추가에 실패했습니다.',[])
        res.json(returnFormatData);
        }
    }
});

router.get('/tire/brand', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    try {
        const TireBrand = await Brand.findAll({
            where: {
                PCCD: {
                    [Op.like]: '%P0601%'
                }
            }
        });
        const brand = JSON.parse(JSON.stringify(TireBrand));
        
        const returnFormatData = returnFormat(2000,"성공",brand)
        res.json(returnFormatData);
    } catch (error) {
        logger.error(error);
       
        const returnFormatData = returnFormat(4000,'데이터를 꺼내 오지 못햇습니다.',{error})
        res.json(returnFormatData);
    }
});

router.get('/wheel', isAuthenticatedAdmin,async function (req: Request, res: Response) {
    try {
        const response = await sequelize.query(`select W.WheelId as WheelId, W.BrandId as BrandId, name as brandName, W.PCCD as PCCD, W.drivingMethodPCCD, W.productName, W.content,  W.wheelSize,W.frontOffset, W.rearOffset, W.price, W.feature, W.amount, W.discountPrice, W.discountRate,  W.sales, W.viewers, W.isSecond, W.isActivate, W.isVisible, W.isContinue ,W.PCD, W.hole
        from Wheels W join Brands B on  B.BrandId = W.BrandId where W.deletedAt IS NULL`);
        const data = [...response];
        
        const returnFormatData = returnFormat(2000,'타이어 데이터 찾기의 성공했습니다.',data[0])
        res.json(returnFormatData);
    } catch (error) {
        logger.error(error);
        
        const returnFormatData = returnFormat(4000,'타이어 데이터 찾기의 실패 했습니다..',[])
        res.json(returnFormatData);
    }
});

router.get('/wheel/brand', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    try {
        const WheelBrand = await Brand.findAll({
            where: {
                PCCD: {
                    [Op.like]: '%P0602%'
                }
            }
        });
        const brand = JSON.parse(JSON.stringify(WheelBrand));
        
        const returnFormatData = returnFormat(2000,"성공",brand)
        res.json(returnFormatData);
        
    } catch (error) {
        logger.error(error);
        
        const returnFormatData = returnFormat(4000,'데이터를 가져오지 못했습니다.',error)
        res.json(returnFormatData);
    }
});

router.post('/wheel', isAuthenticatedAdmin, async (req: Request, res: Response) => {
    const wheelData = req.body;

    const wheelFormatData = {
        WheelId: wheelData.WheelId,
        BrandId: wheelData.BrandId,
        PCCD: wheelData.PCCD,
        drivingMethodPCCD: wheelData.drivingMethodPCCD,
        productName: wheelData.productName,
        productCode: wheelData.productCode,
        wheelSize: wheelData.wheelSize,
        frontOffset: wheelData.frontOffset,
        rearOffset: wheelData.rearOffset,
        price: wheelData.price,
        feature: wheelData.feature,
        amount: wheelData.amount,
        discountRate: wheelData.discountRate,
        discountPrice: wheelData.discountPrice,
        image: wheelData.image,
        sales: wheelData.sales,
        viewers: wheelData.viewers,
        isSecond: wheelData.isSecond,
        content: wheelData.content,
        isActive: wheelData.isActive,
        isVisible: wheelData.isVisible,
        isContinue: wheelData.isContinue,
        PCD: wheelData.PCD,
        hole: wheelData.hole
    };

    if (wheelData.id === null) {
        try {
            const createData = await Wheel.create(wheelFormatData);
            logger.info('휠 데이터 추가 성공' + createData);
            
            const returnFormatData = returnFormat(2000,'휠 데이터 추가 성공',[])
        res.json(returnFormatData);
        } catch (error) {
            logger.error('휠 데이터 추가 실패' + error);
            
            const returnFormatData = returnFormat(4000,'휠 데이터 추가 실패',{error})
        res.json(returnFormatData);
        }
    } else {
        try {
            const existingData = await Wheel.findByPk(wheelFormatData.WheelId);
            let result;
            if (existingData) {
                result = await Wheel.update(wheelFormatData, { where: { WheelId: wheelFormatData.WheelId } });
            } else {
                result = await Wheel.create(wheelFormatData);
            }
            logger.info('휠 데이터 업데이트 성공' + result);
            
            const returnFormatData = returnFormat(2000,'휠 데이터 업데이트 성공',[])
        res.json(returnFormatData);
        } catch (error) {
            logger.error('휠 데이터 업데이트 실패' + error);
            
            const returnFormatData = returnFormat(4000,"휠 추가에 실패했습니다.",[])
        res.json(returnFormatData);
        }
    }
});

export default router;