var express = require('express');
var router = express.Router();
const {Brand,PCCD,PCCDBrandConnectionTable, sequelize}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes, Op } = require('sequelize');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')

// TODD
// Init Data              -> 완료
// 브랜드 Insert, Update    -> 완료
// 차량 브랜드 Get           -> 완료
// 타이어, 휠 브랜드 Get      -> 미완

// 차량 브랜드
router.get('/car',isAuthenticatedAdmin, async (req, res)=>{
    try{
        const carBrand = await Brand.findAll({
            where:{
                PCCD:{
                    [Op.like]: '%C07%'
                }
            }
        })
        const brand = JSON.parse(JSON.stringify(carBrand))

        const result = {
            status:{
                code: 2000,
                message: "성공"
            },
            data: brand
        }
        // TODO 공통 로직으로 변경 요청
        res.json(result)
    }catch(error){
        console.error(error)
        // TODO 공통 로직으로 변경 요청
    }
})

//브랜드 추가
router.post('/',isAuthenticatedAdmin, async (req,res) => {

    const reqBrandData = await {...req.body.data, PCCD: req.body.data.PCCD}
    const brandPCCD = await [...req.body.data.PCCD]

    await insertAndUpdateBrand(reqBrandData, brandPCCD, res)
})

const insertAndUpdateBrand = async (reqBrandData, brandPCCD ,res) =>{
    try {
        if(reqBrandData.BrandId === null){
            await Brand.create(reqBrandData)
            .then( async (createData)=>{
                logger.info('차량 브랜드 데이터 추가 성공' + createData.BrandId)
                await insertBrandPCCDConnectTable(brandPCCD,createData.BrandId)
            })
            .catch(error=>{
                logger.error('차량 브랜드 데이터 추가 실패 ' + error)
            })
        }else{
            await Brand.findByPk(reqBrandData.brandId)
            .then(existingData=>{
                if(existingData){
                    return Brand.update(reqBrandData, {where: reqBrandData.BrandId})
                }else{
                    return Brand.create(reqBrandData)
                }
            })
            .then(result=>{
                logger.info('차량 브랜드 데이터 업데이트 성공' + result)
            })
            .catch(error=>{
                logger.error('차량 브랜드 데이터 업데이트 실패' + error)
            })
        }
        // TODO 공통 로직으로 변경 요청
        res.send("POST 성공!")
    } catch (error) {
        logger.error('데이터 삽입 실패' + error)
        
        // TODO 공통 로직으로 변경 요청
        res.send(error)
    }

}

// 여러 브랜드를 동시에 데이터 주입시 사용 -> 극 초반에 사용하다가, 이후에 폐기 하던지 혹은 개선해서 나올 예정
router.post('/init',isAuthenticatedAdmin, async(req, res)=>{
    const initBrand = await req.body.data

    initBrand.map((brand)=>{
        brand.PCCD = JSON.stringify(brand.PCCD)
    })

    try{
        Brand.bulkCreate(initBrand)
        .then(()=>{
            logger.info(Brand.findAll())
            // TODO 공통 로직으로 변경 요청
            const result = {
                status:{
                    code: 2000,
                    message: "성공"
                },
                data: []
            }
            res.json(result)
        })
        .catch(error=>{
            logger.error('브랜드 벌크 업데이트 실패'+ error)
            // TODO 공통 로직으로 변경 요청
            const result = {
                status: {
                    code: 4000,
                    message: '초기 데이터 생성 실패'
                }
            }
            res.json(result)
        })
    }catch(error){
        logger.error(error)
    }
})

const insertBrandPCCDConnectTable = async (brandPCCD, brandId) => {
    console.log(brandPCCD)
    console.log(brandId)
    if(brandId === null) return
    

    try{
        brandPCCD.map(async (data)=>{
            await PCCD.findOne({
                attributes: ['PCCDId'],
                where:{
                    PCCD: data
                }
            }).then((result)=>{
                // console.log(result.PCCDId)
                PCCDBrandConnectionTable.create({
                    PCCDId: result.PCCDId,
                    BrandId: brandId
                })
                .then(result=>{
                    logger.info('PCCDBrandConnection 테이블 생성 성공' + result)
                })
                .catch(error=>{
                    logger.error(error)
                })
            })
            .catch(error=>{
                console.log(error)
            })
        })
    }catch(error){
        logger.error(error)
    }
}


module.exports = router;  