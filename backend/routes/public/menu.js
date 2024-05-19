var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');

router.get('/', async function(req, res) {
    try {
        const menu = [
            {
                id: 1,
                name: "타이어",
                isActive: true,
                url: "/product/tire",
                name: "타이어",
                PTCD: "P0301",
                PCCD: "P0601",
                children: []
            },
            {
                id: 2,
                name: "휠",
                isActive: true,
                url: "/product/wheel",
                name: "휠",
                PTCD: "P0301",
                PCCD: "P0602",
                children: []
            },
            {
                id: 3,
                name: "이벤트",
                isActive: true,
                url: "/notice",
                name: "공지",
                PTCD: "P0202",
                PCCD: "N0402",
                children: []
            },
            {
                id: 4,
                name: "예약",
                isActive: true,
                url: "/reservation",
                name: "예약",
                PTCD: "R0401",
                PCCD: "R0801",
                children: []
            },
            {
                id: 5,
                name: "문의 사항",
                isActive: true,
                url: "/qna",
                name: "문의 사항",
                PTCD: "P0203",
                PCCD: "C0501",
                children: []
            },
        ];

        res.json({
            status: {
                code: 2000,
                message: "메뉴 데이터를 성공적으로 가져왔습니다."
            },
            data: menu
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router; 