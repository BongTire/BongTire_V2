var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');


router.get('/', async function(req, res) {
    try {
        //수정 예정
        const introduce = {
            id: 1,
            name: "소개",
            sequence: 1,
            upperMenu: 0,
            isActive: true,
            url: null,
            pageType: {
                name: "메뉴",
                componentName: "menu",
                componentPath: null,
                PTCD: "M0101",
                PCCD: "M0101"
            },
            children: [
                {
                    id: 2,
                    name: "가게 소개",
                    sequence: 1,
                    upperMenu: 1,
                    isActive: true,
                    url: "/intro/store",
                    pageType: {
                        name: "가게 소개",
                        componentName: "Store",
                        componentPath: "./pages/IntroPage/Store/Store",
                        PTCD: "P0201",
                        PCCD: "I0101",
                    },
                    children: []
                },
                {
                    id: 3,
                    name: "직원 소개",
                    sequence: 2,
                    upperMenu: 1,
                    isActive: true,
                    url: "/intro/employee",
                    pageType: {
                        name: "직원 소개",
                        componentName: "Employee",
                        componentPath: "./pages/IntroPage/Employee/Employee",
                        PTCD: "P0201",
                        PCCD: "I0101",
                    },
                    children: []
                }
            ]
        };
        
        const others = [
            {
                id: 3,
                name: "타이어",
                sequence: 2,
                upperMenu: 0,
                isActive: true,
                url: "/product/tire",
                pageType: {
                    name: "타이어",
                    componentName: "ProductCardPage",
                    componentPath: "./pages/ProductCardPage/ProductCardPage",
                    PTCD: "P0301",
                    PCCD: "P0401",
                },
                children: []
            },
            {
                id: 4,
                name: "휠",
                sequence: 3,
                upperMenu: 0,
                isActive: true,
                url: "/product/wheel",
                pageType: {
                    name: "휠",
                    componentName: "ProductCardPage",
                    componentPath: "./pages/ProductCardPage/ProductCardPage",
                    PTCD: "P0301",
                    PCCD: "P0402",
                },
                children: []
            },
            {
                id: 5,
                name: "이벤트",
                sequence: 4,
                upperMenu: 0,
                isActive: true,
                url: "/notice/event",
                pageType: {
                    name: "이벤트",
                    componentName: "CardPage",
                    componentPath: "./pages/CardPage/CardPage",
                    PTCD: "P0202",
                    PCCD: "N0202",
                },
                children: []
            },
            {
                id: 6,
                name: "예약",
                sequence: 5,
                upperMenu: 0,
                isActive: true,
                url: "/reservation",
                pageType: {
                    name: "예약",
                    componentName: "ReservationPage",
                    componentPath: "./pages/ReservationPage/ReservationPage",
                    PTCD: "R0401",
                    PCCD: "R0601",
                },
                children: []
            },
            {
                id: 7,
                name: "고객센터",
                sequence: 6,
                upperMenu: 0,
                isActive: true,
                url: null,
                pageType: {
                    name: "고객센터",
                    componentName: "menu",
                    componentPath: null,
                    PTCD: "M0101",
                    PCCD: "M0101",
                },
                children: [
                    {
                        id: 8,
                        name: "문의 사항",
                        sequence: 1,
                        upperMenu: 7,
                        isActive: true,
                        url: "/customerservice/qna",
                        pageType: {
                            name: "문의 사항",
                            componentName: "ListPage",
                            componentPath: "./pages/ListPage/ListPage",
                            PTCD: "P0203",
                            PCCD: "C0301",
                        },
                        children: []
                    },
                    {
                        id: 9,
                        name: "F & Q",
                        sequence: 2,
                        upperMenu: 7,
                        isActive: true,
                        url: "/customerservice/fnq",
                        pageType: {
                            name: "F & Q",
                            componentName: "ListPage",
                            componentPath: "./pages/ListPage/ListPage",
                            PTCD: "P0203",
                            PCCD: "C0302",
                        },
                        children: []
                    }
                ]
            }
        ];
        const combinedArray = [introduce, ...others]; 
        logger.info(combinedArray)
        res.json({
            status:{
                code: 2000,
                message: "메뉴 데이터를 성공적으로 가져왔습니다."
            },
            data: combinedArray
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;  