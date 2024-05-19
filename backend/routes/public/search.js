var express = require('express');
var router = express.Router();
const {Post,Product,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const { Sequelize, DataTypes, QueryTypes, Op } = require('sequelize');
const logger = require('../../config/logger');


router.post('/', async (req,res) => {
  const searchText = req.body.data
  logger.info(searchText)
  try{
    await Tire.findAll({
        where: {
            [Op.or] : [
                { tireSize: { [Op.like] : `%${searchText}%`}},
                { productName: { [Op.like] : `%${searchText}%`}}
            ]
        }
    })
    .then((result)=>{
        logger.info(result);
        res.json({
            status: {
                code: 2000,
                message: '성공적으로 검색했습니다.'
            },
            data: result??''
        })
    })
    .catch((error)=>{
        logger.error(error)
        res.json({
            status: {
                code: 4000,
                message: '검색에 실패 했습니다.' +error
            },
            data: ''
        })
    })
  }catch(error){
    res.json({
        status: {
            code: 4000,
            message: '검색에 실패 했습니다.' + error
        },
        data: ''
    })
  }

})

module.exports = router;  