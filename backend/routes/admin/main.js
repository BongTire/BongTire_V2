var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')


// TODO 전체 싹다 바뀌어야할 예정
router.get('/todayresuervation',isAuthenticatedAdmin,async function(req,res){

    const productType ={ //앞에 기본 productType
        productType:[
            {
                id: 1,
                PCCD : "P0601",
                title: "타이어",
                icon: `http://${process.env.ip}/images/systemIcon/Car/tire-icon.png`,
                imageSize: {
                        width: "100px",
                        height : "100px",
                    }
            },
            {
                id: 2,
                PCCD : "P0602",
                title: "휠",
                icon: `http://${process.env.ip}/images/systemIcon/Car/wheel-icon.png`,
                imageSize:
                {
                    width: "100px",
                    height : "100px",
                }
            }
        ]
    }

    

    const resercationContent = [{}] //반복으로 돌려서 배열로 저장
/*
    const reservation = [{ //
        time: 1,//이번 타임
        reservationTime: 1,
        resercationContent:[
            {
                name:,
                calendarId:,
                OperationTime:,
                ReservationeTimeId:,
                ownCar:{
                    id:
                },
            }
        ]

    }]
*/
})

router.get('/bestproduct',isAuthenticatedAdmin,async function(req,res){

    //productType 은 미드뤵어로 묶을 예정.
    const type = await PCCD.findAll({
        where:{
            PCCD:{
                [Sequelize.Op.like]:'P06%'
            }
        }
    })
    //logger.info(JSON.stringify(type))
    const productType = type.map(item => {
        return {
            id: item.id,
            PCCD: item.PCCD,
            title: item.secondName,
            icon: item.icon,
            imageSize: {
                width: "100px",
                height: "100px"
            }
        };
    });

    
    try { // api대로 타이어 한개 보내기는하는데 2개 보내는게 어떤가,,,아니라면 tire인지 wheel인지 구분해서 보내줘야할듯 ,타이어 한개, 휠한개 이렇게 보내는게,,,
          
        const tire = await Tire.findOne({
            order: [['sales', 'DESC']], // sales가 큰 순서대로 정렬
            limit: 1 // 결과를 하나만 가져옴
          });
          console.log(tire)
          //logger.info(Json.toString(tire));
          const brand = await Brand.findOne({
              where:{
                  BrandId:tire.BrandId
              }
          })
          
          
          //logger.info(Json(brand))
          const result = {
              productId: "P06011",
              isRank : false,
              rank : 0,
              brand : {
                  name : brand.name,
                  brandLogo : brand.brandLogo,
                  origin : true,
                  nation : brand.nation
              },
              //ptcd : ptcd, ptcd 가져올 방법 없음
              componentName : "proudct",
              pccd : tire.pccd,
              name: tire.product_name,
              image: tire.image,
              imageSize: {
                  width: 170,
                  height : 160
              },
              isSecond: tire.isSecond,
              tireSize: tire.tire_size,
              price: tire.price,
              discountRate: tire.discountRate,
              discountPrice: tire.discountPrice,
              amount: tire.amount,
              maxWeight:tire.maxWeight,
              maxSpeed: tire.maxSpeed,
              sales: 1,
              numberOfDataUpdate:tire.numberOfDataUpdate,
              createDate: tire.createAt,
              updateDate: tire.updateAt,
              isContinue: tire.isContinue,
              isVisible: tire.isVisible,
              isActive: tire.isActive,
              content : tire.content,
              
          
          }

            
  
          res.json({productType,data:result})
      } catch (error) {
        console.error('에러 발생: ', error);
      }
    
})



module.exports = router;  