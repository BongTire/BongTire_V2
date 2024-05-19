var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const logger = require('../../config/logger');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')

router.get('/', isAuthenticatedAdmin, async (req, res)=>{
    await User.findAll()
    .then(result=>{
        res.json({
            status:{
                code: 2000,
                message: '유저 데이터 추출에 성공했습니다.'
            },
            data: result
        })
    })
    .catch(error=>{
        logger.error(error)
        res.json({
            status:{
                code: 4000,
                message: '유저 데이터 찾기를 실패했습니다.'
            },
            data:""
        })
    })
})


router.post('/', isAuthenticatedAdmin, async function(req, res){

    const userData = req.body
    
    if(userData.UserId === null){
        await User.create(userData)
        .then(createData=>{
            logger.info('유저 데이터 추가 성공')
            res.json({
                status:{
                    code: 2000,
                    message: '유저 데이터 추가 성공'
                },
                data:""
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
        await User.findByPk(userData.UserID)
        .then(existingData=>{
            if(existingData){
                return User.update(userData, { where: { UserId : userData.UserId}})
            }else{
                return User.create(userData)
            }
        })
        .then((result=>{
            logger.info('유저 데이터 업데이트 성공' + result)
            res.json({
                status:{
                    code: 2000,
                    message: '유저 데이터 업데이트 성공'
                },
                data: {}
            })
        }))
        .catch(error=>{
            logger.error('유저 데이터 업데이트 실패' + error)
            res.json({
                status: {
                    code: 4000,
                    message: "유저 추가에 실패했습니다."
                },
                data: []
            })
        })
    }

})
module.exports = router;  