var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes, Op } = require('sequelize');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')

/**
 * 
 * TODO 상품 데이터 input 및 update, delete 로직
 * 
 */

router.get('/tire', isAuthenticatedAdmin, async function(req,res){
    let response = []

    Tire.sequelize.query(`
        select T.TireId as id, T.BrandId as BrandId, name as brandName, T.PCCD as PCCD, 
        T.drivingMethodPCCD, T.productName, T.content, T.patternCode, T.mCode, T.tireSize, 
        T.maxWeight, T.maxSpeed,T.xl, T.ply, T.origin,T.price, T.feature, T.amount, T.discountPrice, 
        T.discountRate, T.numberOfDataUpdate, T.sales, T.viewers, T.isSecond, T.isActive, T.isVisible, T.isRecommanded 
        from Tires T 
        join Brands B on B.BrandId = T.BrandId 
        where T.deletedAt IS NULL`)
    .then(findData=>{
        response = [...findData]

        res.json({
            status:{
                code: 2000,
                message: '타이어 데이터 찾기의 성공했습니다.'
            },
            data:response
        })
    })
    .catch(error=>{
        logger.error(error)
        res.json({
            status:{
                code: 4000,
                message: '타이어 데이터 찾기의 실패 했습니다..'
            },
            data:{}
        })
    })
})

router.post('/tire', isAuthenticatedAdmin, async function(req,res){
    const tireData = req.body

    const tireFormatData = {
        TireId: tireData.id,
        BrandId: tireData.BrandId,
        PCCD: tireData.PCCD,
        drivingMethodPCCD: tireData.drivingMethodPCCD,
        mCode: tireData.mCode,
        productName: tireData.productName,
        tireSize: tireData.tireSize,
        price: tireData.price,
        amount: tireData.amount,
        discountRate: tireData.discountRate,
        discountPrice : tireData.discountPrice,
        image: tireData.image,
        patternCode: tireData.patternCode,
        maxSpeed: tireData.maxSpeed,
        maxWeight: tireData.maxWeight,
        origin: tireData.origin,
        xl: tireData.xl,
        ply: tireData.ply,
        numberOfDataUpdate: tireData.numberOfDataUpdate,
        sales: tireData.sales,
        viewers: tireData.viewers,
        isSecond: tireData.isSecond,
        content: tireData.content,
        feature: tireData.feature,
        isActive: tireData.isActive,
        isVisible: tireData.isVisible,
        isContinue: tireData.isContinue
    }
    if(tireFormatData.TireId === null){
        Tire.create(tireFormatData)
            .then(async(createData)=>{
                logger.info('타이어 데이터 추가 성공' + createData)
                res.json({
                    status:{
                        code: 2000,
                        message: '타이어 데이터 추가 성공'
                    },
                    data:{}
                })
            })
            .catch(error=>{
                logger.error('타이어 데이터 추가 실패' + error)
                res.json({
                    status:{
                        code: 4000,
                        message: '타이어 데이터 추가 실패'+error
                    },
                    data:{
                        error: error
                    }
            })
        })
    }else{
        await Tire.findByPk(tireFormatData.TireId)
        .then(existingData=>{
            if(existingData){
                return Tire.update(tireFormatData, { where: { TireId : tireFormatData.TireId }})
            }else{
                return Tire.create(tireFormatData)
            }
        })
        .then((result=>{
            logger.info('타이어 데이터 업데이트 성공' + result)
            res.json({
                status:{
                    code: 2000,
                    message: '타이어 데이터 업데이트 성공'
                },
                data: {}
            })
        }))
        .catch(error=>{
            logger.error('타이어 데이터 업데이트 실패' + error)
            res.json({
                status: {
                    code: 4000,
                    message: "데이터 추가에 실패했습니다."
                },
                data: []
            })
        })
    }
})

router.get('/tire/brand',isAuthenticatedAdmin, async (req, res) => {
    try{
        const TireBrand = await Brand.findAll({
            where:{
                PCCD: {
                    [Op.like] : '%P0601%'
                }
            }
        })
        const brand = JSON.parse(JSON.stringify(TireBrand))

        const result = {
            status:{
                code: 2000,
                message: "성공"
            },
            data: brand
        }
        res.json(result)
    }catch(error){
        logger.error(error)
        res.json({
            status:{
                code: 4000,
                message : '데이터를 꺼내 오지 못햇습니다.'
            },
            data: error
        })
    }
})

router.get('/wheel',isAuthenticatedAdmin,async function(req,res){
    let response = []

    Wheel.sequelize.query(`select W.WheelId as id, W.BrandId as BrandId, name as brandName, W.PCCD as PCCD, W.drivingMethodPCCD, W.productName, W.content,  W.wheelSize,W.frontOffset, W.rearOffset, W.price, W.feature, W.amount, W.discountPrice, W.discountRate,  W.sales, W.viewers, W.isSecond, W.isActivate, W.isVisible, W.isContinue ,W.PCD, W.hole
    from Wheels W join Brands B on  B.BrandId = W.BrandId where W.deletedAt IS NULL`)
    .then(findData=>{
        response = [...findData]

        res.json({
            status:{
                code: 2000,
                message: '타이어 데이터 찾기의 성공했습니다.'
            },
            data:response
        })
    })
    .catch(error=>{
        logger.error(error)
        res.json({
            status:{
                code: 4000,
                message: '타이어 데이터 찾기의 실패 했습니다..'
            },
            data:{}
        })
    })
})

router.get('/wheel/brand', isAuthenticatedAdmin, async (req, res) => {
    try{
        const WheelBrand = await Brand.findAll({
            where:{
                PCCD: {
                    [Op.like] : '%P0602%'
                }
            }
        })
        const brand = JSON.parse(JSON.stringify(WheelBrand))

        const result = {
            status:{
                code: 2000,
                message: "성공"
            },
            data: brand
        }
        res.json(result)
    }catch(error){
        logger.error(error)
        res.json({
            status:{
                code: 4000,
                message : '데이터를 꺼내 오지 못햇습니다.'
            },
            data: error
        })
    }
})


router.post('/wheel',isAuthenticatedAdmin,  async function(req,res){
    const wheelData = req.body

    const wheelFormatData = {
        WheelId: wheelData.id,
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
        discountPrice : wheelData.discountPrice,
        image: wheelData.image,
        sales: wheelData.sales,
        viewers: wheelData.viewers,
        isSecond: wheelData.isSecond,
        content: wheelData.content,
        isActive: wheelData.isActive,
        isVisible: wheelData.isVisible,
        isContinue: wheelData.isContinue,
        PCD:wheelData.PCD,
        hole:wheelData.hole
    }
    console.log(wheelData)

    if(wheelData.id === null){
        Wheel.create(wheelFormatData)
            .then(async(createData)=>{
                logger.info('휠 데이터 추가 성공' + createData)
                res.json({
                    status:{
                        code: 2000,
                        message: '휠 데이터 추가 성공'
                    },
                    data:{}
                })
            })
            .catch(error=>{
                logger.error('휠 데이터 추가 실패' + error)
                res.json({
                    status:{
                        code: 4000,
                        message: '휠 데이터 추가 실패'+error
                    },
                    data:{
                        error: error
                    }
            })
        })
    }else{
        await Wheel.findByPk(wheelFormatData.WheelId)
        .then(existingData=>{
            if(existingData){
                return Wheel.update(wheelFormatData, { where: { WheelId : wheelFormatData.WheelId }})
            }else{
                return Wheel.create(wheelFormatData)
            }
        })
        .then((result=>{
            logger.info('휠 데이터 업데이트 성공' + result)
            res.json({
                status:{
                    code: 2000,
                    message: '휠 데이터 업데이트 성공'
                },
                data: {}
            })
        }))
        .catch(error=>{
            logger.error('휠 데이터 업데이트 실패' + error)
            res.json({
                status: {
                    code: 4000,
                    message: "휠 추가에 실패했습니다."
                },
                data: []
            })
        })
    }
})


module.exports = router;