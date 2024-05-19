var express = require('express');
var router = express.Router();
const logger = require('../../config/logger');
const {Brand,HashTag,Menu,OwnCar,Page,PCCD,PCCDBrandConnectionTable,PTCD}=  require('../../models');
const { Sequelize, DataTypes } = require('sequelize');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')


router.post('/ptcd',isAuthenticatedAdmin, async (req, res) => {
    try{
        const insertData = await req.body.data

        if(insertData.PTCDId === null){
            PTCD.create(insertData)
            .then(createData=>{
                logger.info('데이터 생성 성공' + createData)
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 2000,
                        message: '성공'
                    },
                    data:[]
                })
            })
            .catch(error=>{
                logger.error('데이터 생성 실패' + error)
            })
        }else{
            PTCD.findByPk(insertData.PTCDId)
            .then(existingData=>{
                if(existingData){
                    return PTCD.update(insertData, { where: { PTCDId: insertData.PTCDId} })
                        .then(updateData=>{
                            logger.info('데이터 업데이트 성공' + updateData)
                            // TODO 공통 로직으로 변경 요청
                            res.json({
                                status: {
                                    code: 2000,
                                    message: '성공'
                                },
                                data:[]
                            })
                        })
                        .catch(error=>{
                            logger.error('데이터 업데이트 실패' + error)
                            // TODO 공통 로직으로 변경 요청
                            res.json({
                                status: {
                                    code: 4000,
                                    message: '실패'
                                },
                                data:[]
                            })
                        })
                }else{
                    return PTCD.create(insertData)
                        .then(createData=>{
                            logger.info('데이터 업데이트가 아닌 생성 성공' + createData)
                            // TODO 공통 로직으로 변경 요청
                            res.json({
                                status: {
                                    code: 2000,
                                    message: '성공'
                                },
                                data:[]
                            })
                        })
                        .catch(error=>{
                            logger.error('데이터 생성 실패' + error)
                            // TODO 공통 로직으로 변경 요청
                            res.json({
                                status: {
                                    code: 4000,
                                    message: '실패'
                                },
                                data:[]
                            })
                        })
                }
            })
            .catch(error=>{
                logger.error('데이터 업데이트 및 생성을 실패했습니다.' + error)
            })
        }
    }catch(error){
        logger.error('데이터 업데이트 및 생성 실패의 전체 로직이 실패했습니다. ' + error)
    }
})

router.post('/pccd',isAuthenticatedAdmin, async (req, res) => {
    let status = 0

    try{
        const insertData = await req.body.data
        console.log(insertData)

        if(insertData.PCCDId === null){
            PCCD.create(insertData)
            .then(createData=>{
                logger.info('데이터 생성 성공' + createData)
                status = 2000

                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 2000,
                        message: 'PCCD 저장에 성공했습니다.'
                    },
                    data:[]
                })
            })
            .catch(error=>{
                logger.error('데이터 생성 실패' + error)
                status = 4000
            })
        }else{
            PCCD.findByPk(insertData.PCCDId)
            .then(existingData=>{
                if(existingData){
                    return PCCD.update(insertData, { where: { PCCDId: insertData.PCCDId} })
                }else{
                    return PCCD.create(insertData)
                }
            })
            .then(result=>{
                logger.info('데이터 삽입 또는 업데이트를 완료 했습니다.' + result)

                status = 2000
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 2000,
                        message: '성공'
                    },
                    data:[]
                })
            })
            .catch(error=>{
                logger.error('데이터 업데이트 및 생성을 실패했습니다.' + error)
                status = 4000
            })
        }
    }catch(error){
        logger.error('데이터 업데이트 및 생성 실패의 전체 로직이 실패했습니다. ' + error)
        // TODO 공통 로직으로 변경 요청
        res.json({
            status: {
                code: 4000,
                message: '실패'
            },
            data:[]
        })
    }

})

router.post('/ptcd/init' ,isAuthenticatedAdmin, async (req, res)=>{
    const insertData = await req.body.data

    try{
        PTCD.bulkCreate(insertData)
        .then(()=>{
            logger.info(PCCD.findAll())
            // TODO 공통 로직으로 변경 요청
            res.json({
                status: {
                    code: 2000,
                    message: "성공"
                },
                data:[]
            })
        })
        .catch(error=>{
            logger.error('벌크 업데이트 실패' + error)
            // TODO 공통 로직으로 변경 요청
            res.json({
                status: {
                    code: 4000,
                    message: "성공"
                },
                data:[]
            })
        })
    }catch(error){
        logger.error(error)
    }
})

router.post('/pccd/init' , async (req, res)=>{
    const insertData = await req.body.data

    try{
        PCCD.bulkCreate(insertData)
        .then(()=>{
            logger.info(PCCD.findAll())
            // TODO 공통 로직으로 변경 요청
            res.json({
                status: {
                    code: 2000,
                    message: "성공"
                },
                data:[]
            })
        })
        .catch(error=>{
            logger.error('벌크 업데이트 실패' + error)
            // TODO 공통 로직으로 변경 요청
            res.json(
                {
                    status: {
                        code: 4000,
                        message: "실패"
                    },
                    data:[]
                }
            )
        })
    }catch(error){
        logger.error(error)
    }
})

module.exports = router;  