var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes, Op } = require('sequelize');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')


router.get('/',isAuthenticatedAdmin, async function(req,res){

    try{
        let productType = []
        const type = await PCCD.findAll({
            where:{
                PCCD:{
                    [Op.like]:'P06%'
                }
            }
        })
        .then(findData=>{
            productType = findData.map(item => {
                return {
                    id: item.PCCDId,
                    PCCD: item.PCCD,
                    title: item.secondName,
                    icon: item.icon,
                    brand: []
                };
            });
        })
        //logger.info(JSON.stringify(type))
        
        const tireBrand = await Brand.findAll({
            where:{
                PCCD:{
                    [Op.like]: '%P0601%'
                }
            }
        })
        .then(findData=>{
            logger.info(findData)
            const brand = findData.map(data=>{
                return {
                    BrandId : data.BrandId,
                    PCCD: JSON.parse(data.PCCD),
                    brandLogo: data.brandLogo,
                    name: data.name,
                    origin: data.origin,
                    nation: data.nation,
                    deletedAt: data.deletedAt
                }
            })
            productType[0].brand = [...brand]
        })
        .catch(error=>{
            logger.error(error + '여기야?')
        })

        const wheelBrand = await Brand.findAll({
            where:{
                PCCD:{
                    [Op.like] : '%P0602%'
                }
            }
        })
        .then(findData=>{
            logger.info(findData+'여기는?')
            const brand = findData.map(data=>{
                return {
                    BrandId : data.BrandId,
                    PCCD: JSON.parse(data.PCCD),
                    name: data.name,
                    brandLogo: data.brandLogo,
                    origin: data.origin,
                    nation: data.nation,
                    deletedAt: data.deletedAt
                }
            })
            productType[1].brand = [...brand]
        })
        .catch(error=>{
            logger.error(error+'여기야?')
        })

        console.log(tireBrand)
        console.log(wheelBrand)

        // TODO 공통 로직으로 변경 요청
        res.json({
            status: {
                code: 2000,
                message: "ProductType 데이터 전송 성공"
            },
            data: productType
        })
    }catch(error){
        console.error(error+'여기야?')
        // TODO 공통 로직으로 변경 요청
        res.json({
            status:{
                code: 4000,
                message: error
            }
        })
    }
})

module.exports = router;