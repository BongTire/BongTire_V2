var express = require('express');
var router = express.Router();
const logger = require('../../config/logger');
const {Brand,HashTag,Menu,OwnCar,Page,PCCD,PCCDBrandConnectionTable,PTCD, Tire}=  require('../../models');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../models'); // 모델들이 정의된 파일을 불러옵니다.

router.get('/ptcd', async (req, res) => {
    try{
        PTCD.findAll()
        .then(findData=>{
            res.json({
                status:{
                    code: 2000,
                    message: "PTCD를 성공적으로 가져왔습니다."
                },
                data: findData
            })
        })
        .catch(e=>{
            res.json({
                status:{
                    code: 4000,
                    message: e
                },
                data: []
            })
        })
    }catch(error){
        logger.error('데이터 업데이트 및 생성 실패의 전체 로직이 실패했습니다. ' + error)
        res.json({
            status: {
                code: 4000,
                message: '불러오는 것을 실패했습니다.'
            },
            data:[]
        })
    }
})

router.get('/pccd', async (req, res) => {
    let status = 0

    try{
       PCCD.findAll()
       .then(findData=>{
        res.json({
            status:{
                code: 2000,
                message: "PCCD를 성공적으로 가져왔습니다."
            },
            data: findData
        })
       })
       .catch(e=>{
        res.json({
            status:{
                code: 4000,
                message: e
            },
            data: []
        })
       })
    }catch(error){
        logger.error('데이터 업데이트 및 생성 실패의 전체 로직이 실패했습니다. ' + error)
        // TODO 공통 로직으로 변경 요청
        res.json({
            status: {
                code: 4000,
                message: '불러오는 것을 실패했습니다.'
            },
            data:[]
        })
    }

})


router.get('/fav', async (req, res)=>{
    res.json({
        status:{
            code: 2000,
            message:'성공적으로 조회 했습니다.'
        },
        data: favData
    })
})

const favData = [
    {
        id: 1,
        isUrl : true,
        url: "/product/tire?pccd=P0601",
        status: true,
        title: "타이어",
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/tire-icon.png`
    },
    {
        id: 2,
        isUrl : true,
        url: "/product/tire?pccd=P0601&isSecond=1",
        status: true,
        title: "중고 타이어",
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/tire-test-icon.png`
    },
    {
        id: 2,
        isUrl : true,
        url: "/product/wheel?pccd=P0602",
        title: "휠",
        status: true,
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/wheel-icon.png`
    },
    {
        id: 3,
        isUrl : false,
        url: "/product/wheel?pccd=P0602&isSecond=1",
        title: "중고 휠",
        status: true,
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/wheel-icon 1.png`
    },
    {
        id: 4,
        isUrl : true,
        url: "/reservation?pccd=R0801",
        title: "예약",
        status: true,
        detail: "원하는 문구",
        icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/car-repair-icon.png`
    },
    
]

router.get('/product/rank',async function(req,res){
    try {
        let recommendTireDatas =await sequelize.query(`SELECT * FROM Tires join Brands on Tires.BrandId = Brands.BrandId where Tires.isRecommanded = true AND Tires.deletedAt IS NULL AND Brands.deletedAt IS NULL`, {type: sequelize.QueryTypes.SELECT,});

        if(recommendTireDatas == []){
            res.json({
                status:{
                    code:4000,
                    message:'추천타이어를 불러오지 못했습니다.'
                }
            })

        }else{
            const result = {
            status: {
                code: 2000,
                message: '추천티이어를 불러왔습니다.'
            },
            data:recommendTireDatas
        }

        res.json(result)
        }
        
        
    } catch (error) {
        logger.error('/recommendTire 에러발생: '+error)
        res.json({
            status:{
                code:4000,
                message:'추천타이어를 불러오는데 실패했습니다.'
            }
        })
    }
})

module.exports = router;  