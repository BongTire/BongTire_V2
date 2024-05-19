var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const { Sequelize, DataTypes, QueryTypes, Op } = require('sequelize');
const logger = require('../../config/logger');
const { log } = require('console');

function groupDataByFilterId(originalData) {
  const groupedData = [];
  
  // FilterId를 기반으로 그룹핑하기 위한 객체 생성
  const groups = {};
  
  // 주어진 데이터를 순회하면서 FilterId를 기준으로 그룹화
  originalData.forEach(item => {
    const { FilterId, name, PCCD, isBrand } = item;
    
    if (!groups[FilterId]) {
      // 새로운 그룹 생성
      groups[FilterId] = {
        id: FilterId,
        name: isBrand === 1 ? "브랜드" : name,
        isDrivingMethod: false, // 이 값은 주어진 데이터에서 나오지 않는데, 필요하다면 값을 설정할 수 있습니다.
        filterPCCD: PCCD,
        isImage: isBrand === 1 ? true : false, // 이 값은 주어진 데이터에서 나오지 않는데, 필요하다면 값을 설정할 수 있습니다.
        isBrand: isBrand === 1 ? true : false,
        value: []
      };
      groupedData.push(groups[FilterId]);
    }
    
    // value 배열에 데이터 추가
    const valueData = {
      id: item.HashTagId,
      name: item.name,
      value: item.name,
      PCCD: item.PCCD,
      image: null, // 주어진 데이터에서 이미지 정보가 없는 경우, null로 설정하거나 이미지 정보를 추가할 수 있습니다.
    };
    groups[FilterId].value.push(valueData);
  });
  
  return groupedData;
}

const sendBrandFilter = (brand) =>{
  const result = [
    {
      "type": "select",
      "filter": [...brand]
    }
  ]
  return result
}


router.get('/',async function(req,res){
    const ptcd = req.query.ptcd;
    const pccd = req.query.pccd;
    const second = req.query?.isSecond==='1' ? 1 : 0

    console.log(second)

    const page = parseInt(req.query.page, 10) || 1; // 페이지 번호
    const pageSize = parseInt(req.query.pageSize, 10) || 20; // 한 페이지에 보여줄 항목 수
    const offset = (page - 1) * pageSize; // offset 계산
    
    logger.info('start')

    if(ptcd == 'P0301'&& pccd == 'F0901'){//타이어 필터
        let filterResponse = [
        {
          type: 'select',
          filter: []
        },
        {
          type : "slide",
          filter: {
              title : "가격",
              minValue : 0,
              maxValue : 1000000
          }
        }
      ]

        // 브랜드 출력하기
        try{
          await Brand.findAll({
            where:{
              PCCD:{
                [Op.like]: '%P0601%'
              }
            }
          })
          .then((result)=>{
            
            const brandFilter = [
              {
                type: "select",
                filter: [
                  {
                    id: 1,
                    name: "브랜드",
                    isDrivingMethod: false,
                    filterPCCD: null,
                    isImage: true,
                    isBrand: true,
                    value: result
                  }
                ]
              },
              {
                type: "slide",
                filter: {
                    title: "가격",
                    minValue: 0,
                    maxValue: 1000000
                }
              }
            ]

            logger.info('타이어 브랜드 데이터 성공')

            res.json({
              status:{
                code: 2000,
                message: '성공적으로 조회 했습니다.'
              },
              data: brandFilter
            });
          })
          .catch((error)=>{
            logger.error('에러가 났습니다.')
          })
        }catch(e){
          logger.error(error)
            res.json({
              status:{
                code: 4000,
                message: ""
              },
              data: ''
            })
        }
        
        // try {
        //     logger.info('try catch')
        //     sequelize.query(
        //       `SELECT *
        //        FROM Filters
        //        LEFT JOIN HashTags HT ON Filters.FilterId = HT.FilterID
        //        WHERE Filters.PCCD = :pccd AND Filters.deletedAt IS NULL`,
        //       {
        //         replacements: { pccd }, // pccd 변수를 대체합니다.
        //         type: QueryTypes.SELECT // SELECT 쿼리임을 지정합니다.
        //       }
        //     ).then((filter) => {
        //       const groupedData = groupDataByFilterId(filter)
                
                
        //         groupedData.map((data)=>{
        //           if(data.isImage){
        //             data.value = [...brandArray]
        //           }
        //         })
        //         filterResponse[0].filter = JSON.parse(JSON.stringify(groupedData))
        //         return res.json({
        //           status:{
        //             code: 2000,
        //             message: '성공적으로 조회 했습니다.'
        //           },
        //           data: filterResponse
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('에러 발생: ', error);
        //     });
          
        // } catch (error) {
        //     logger.error(error)
        //     res.json({
        //       status:{
        //         code: 4000,
        //         message: ""
        //       },
        //       data: ''
        //     })
        // }
        
    }else if(ptcd == 'P0301'&& pccd == 'P0601'){  //타이어 상품
    //총 게시물 개수 가져오기
    const countQuery = `
    SELECT 
        COUNT(*) AS totalProducts
    FROM 
        Tires
    WHERE 
        PCCD = :pccd 
    AND
      isSecond = :isSecond
    AND 
        deletedAt IS NULL`;

    const countResult = await sequelize.query(countQuery, {
        replacements: {
            pccd: pccd,
            isSecond: second
        },
        type: sequelize.QueryTypes.SELECT,
    });
    const totalProduct = countResult[0].totalProducts;

      logger.info('gigi')

      await Tire.sequelize.query(`select TireId as id, T.BrandId as BrandId, T.PCCD as PCCD,
      drivingMethodPCCD, mCode, productName, tireSize, price,
      amount, discountRate, discountPrice, image, patternCode, maxSpeed,
      T.origin as origin, xl, ply, numberOfDataUpdate, sales, viewers, isSecond, content, feature,
      isActive, isRecommanded, T.createdAt as createdAt, T.updatedAt as updatedAt, name as brandName, B.origin as brandOrigin, nation as brandNation, brandLogo
      from Tires T
      join Brands B on T.BrandId = B.BrandId
      where isSecond=${second} AND T.deletedAt is null AND B.deletedAt is null LIMIT ${pageSize} OFFSET ${offset}`, { type: sequelize.QueryTypes.SELECT }
    )
    
      .then(findData=>{
        logger.info(findData)
          response = [...findData]
  
          res.json({
              status:{
                  code: 2000,
                  message: '타이어 데이터 찾기의 성공했습니다.'
              },
              data:response,
              total: totalProduct
          })
      })
      .catch(error=>{
          logger.error(error)
          res.json({
              status:{
                  code: 4000,
                  message: '타이어 데이터 찾기의 실패 했습니다..'+error
              },
              data:'',
          })
      })
    }else if(ptcd == 'P0301'&& pccd == 'F0902'){ //휠 필터
      // 브랜드 출력하기
      try{
        await Brand.findAll({
          where:{
            PCCD:{
              [Op.like]: '%P0602%'
            }
          }
        })
        .then(result=>{
          const brandFilter = [
            {
              type: "select",
              filter: [
                {
                  id: 1,
                  name: "브랜드",
                  isDrivingMethod: false,
                  filterPCCD: null,
                  isImage: true,
                  isBrand: true,
                  value: result
                }
              ]
            },
            {
              type: "slide",
              filter: {
                  title: "가격",
                  minValue: 0,
                  maxValue: 1000000
              }
            }
          ]

          logger.info('타이어 브랜드 데이터 성공')

          res.json({
            status:{
              code: 2000,
              message: '성공적으로 조회 했습니다.'
            },
            data: brandFilter
          });
        })
        .catch((error)=>{
          logger.error('에러가 났습니다.')
        })
      }catch(error){
        logger.error(error)
        res.json({
          status:{
            code: 4000,
            message: ""
          },
          data: ''
        })
      }

    }else if(ptcd == 'P0301'&& pccd == 'P0602'){ //휠 상품

          //총 게시물 개수 가져오기
      const countQuery = `
      SELECT 
          COUNT(*) AS totalProducts
      FROM 
          Wheels
      WHERE 
          PCCD = :pccd 
          AND isSecond = :isSecond
          AND deletedAt IS NULL;
          `;

      const countResult = await sequelize.query(countQuery, {
          replacements: {
              pccd: pccd,
              isSecond: second
          },
          type: sequelize.QueryTypes.SELECT,
      });
      const totalProduct = countResult[0].totalProducts;
          await Wheel.sequelize.query(`select *,WheelId as id, W.BrandId as BrandId, W.PCCD as PCCD,
      drivingMethodPCCD, productName, wheelSize,frontOffset, rearOffset, price,
      amount, discountRate, discountPrice, image,
      sales, viewers, isSecond, content, feature,
      isActivate, isContinue, W.createdAt as createdAt, W.updatedAt as updatedAt, name as brandName, B.origin as brandOrigin, nation as brandNation, brandLogo ,PCD ,hole
      from Wheels W
      join Brands B on W.BrandId = B.BrandId
      where W.isSecond=${second} AND W.deletedAt is null AND B.deletedAt is null LIMIT ${pageSize} OFFSET ${offset}`, {type: sequelize.QueryTypes.SELECT} )
      .then(findData=>{
        response = [...findData]

          res.json({
              status:{
                  code: 2000,
                  message: '타이어 데이터 찾기의 성공했습니다.'
              },
              data:response,
              total: totalProduct
          })
      })
      .catch(error=>{
          logger.error(error)
          res.json({
              status:{
                  code: 4000,
                  message: '타이어 데이터 찾기의 실패 했습니다..'
              },
              data:''
          })
      })    
    }

})

router.get('/pccd', async (req, res)=>{
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
                data: []
            };
        });

        res.json({
          status:{
            code: 2000,
            message:"성공적으로 전송했습니다."
          },
          data: productType
        })
    })
    .catch(error=>{
      logger.error(error)
      res.json({
        status:{
          code: 4000,
          message:"데이터를 찾지 못했습니다."
        },
        data:""
      })
    })
  }catch(error){
    logger.error(error)
  }
})

router.get('/tire/detail/:id', async (req, res) =>{
  const productId = req.params.id
  console.log(productId)

  try{
    await Tire.sequelize.query(`select TireId as id, T.BrandId as BrandId, T.PCCD as PCCD,
      drivingMethodPCCD, mCode, productName, tireSize, price,
      amount, discountRate, discountPrice, image, patternCode, maxSpeed,
      T.origin as origin, xl, ply, numberOfDataUpdate, sales, viewers, isSecond, content, feature,
      isActive, isRecommanded, T.createdAt as createdAt, T.updatedAt as updatedAt, name as brandName, B.origin as brandOrigin, nation as brandNation, brandLogo
      from Tires T
      join Brands B on T.BrandId = B.BrandId
      where T.deletedAt is null && T.TireId=${productId} AND B.deletedAt is null`, { type: sequelize.QueryTypes.SELECT }
    )
    .then(findData=>{
      console.log(findData)
      logger.info('타이어 디테일 데이터 찾기를 성공했습니다.')
      res.json({
        status: {
          code: 2000,
          message: "타이어 데이터를 성공적으로 가져왔습니다."
        },
        data: findData[0]
      })
    })
    .catch(error=>{
      logger.error(error)
      res.json({
        status: {
          code: 4000,
          message: "타이어 데이터를 가져오는 것을 실패했습니다.."
        },
        data: ""
      })
    })

  }catch(error){
    logger.error(error)
    res.json({
      status: {
        code: 4000,
        message: "타이어 데이터를 가져오는 것을 실패했습니다.."
      },
      data: ""
    })
  }
})

router.get('/wheel/detail/:id', async (req, res) =>{
  const productId = req.params.id

  try{
    await Wheel.sequelize.query(`
      select WheelId as id, W.BrandId as BrandId, W.PCCD as PCCD,
        drivingMethodPCCD, productName, wheelSize,frontOffset, rearOffset, price,
        amount, discountRate, discountPrice, image,
        sales, viewers, isSecond, content, feature,
        isActivate, isContinue, W.createdAt as createdAt, W.updatedAt as updatedAt, name as brandName, B.origin as brandOrigin, nation as brandNation, brandLogo,PCD,hole
      from Wheels W
      join Brands B on W.BrandId = B.BrandId
      where W.deletedAt is null && W.WheelId=${productId} AND B.deletedAt is null`, { type: sequelize.QueryTypes.SELECT }
    )
    .then(findData=>{
      logger.info('휠 디테일 데이터 찾기를 성공했습니다.')
      res.json({
        status: {
          code: 2000,
          message: "휠 데이터를 성공적으로 가져왔습니다."
        },
        data: findData[0]
      })
    })
    .catch(error=>{
      logger.error(error)
      res.json({
        status: {
          code: 4000,
          message: "휠 데이터를 가져오는 것을 실패했습니다.."
        },
        data: ""
      })
    })

  }catch(error){
    logger.error(error)
    res.json({
      status: {
        code: 4000,
        message: "휠 데이터를 가져오는 것을 실패했습니다.."
      },
      data: ""
    })
  }
})


router.post('/filter', async(req, res)=>{
  const ptcd = req.query.ptcd;
  const pccd = req.query.pccd;
  const second = req.query?.isSecond ?? 0

  console.log(second+'여기?')
  const filterArray = req.body.data
  
  const page = parseInt(req.query.page, 10) || 1; // 페이지 번호
  const pageSize = parseInt(req.query.pageSize, 10) || 20; // 한 페이지에 보여줄 항목 수
  const offset = (page - 1) * pageSize; // offset 계산


    

  if(pccd === 'P0601'){
    const countQuery = `
    SELECT 
        COUNT(*) AS totalProducts
    FROM 
        Tires
    WHERE 
        PCCD = :pccd
    AND
      isSecond=${second} 
    AND
        Tires.BrandId IN(:filterArray)
    AND 
        deletedAt IS NULL`;

    const countResult = await sequelize.query(countQuery, {
        replacements: {
            pccd: pccd,
            filterArray: filterArray,
        },
        type: sequelize.QueryTypes.SELECT,
    });
    const totalProduct = countResult[0].totalProducts;

    await Tire.sequelize.query(`select TireId as id, T.BrandId as BrandId, T.PCCD as PCCD,
      drivingMethodPCCD, mCode, productName, tireSize, price,
      amount, discountRate, discountPrice, image, patternCode, maxSpeed,
      T.origin as origin, xl, ply, numberOfDataUpdate, sales, viewers, isSecond, content, feature,
      isActive, isRecommanded, T.createdAt as createdAt, T.updatedAt as updatedAt, name as brandName, B.origin as brandOrigin, nation as brandNation, brandLogo
      from Tires T
      join Brands B on T.BrandId = B.BrandId
      where T.BrandId IN (:filterArray) and T.deletedAt is null and T.isSecond=${second} AND B.deletedAt is null LIMIT ${pageSize} OFFSET ${offset}`, { type: sequelize.QueryTypes.SELECT, replacements:{filterArray: filterArray} }
  )
    .then(result=>{
      res.json({
        status: {
          code: 2000,
          message: "데이터를 성공적으로 불러왔습니다."
        },
        data: result,
        total: totalProduct
      })
    })
    .catch(error=>{
      res.json({
        status: {
          code: 4000,
          message: error
        },
        data: ""
        
      })

    })
  }

  if(pccd === 'P0602'){ //휠(새상품만)
    const countQuery = `
    SELECT 
        COUNT(*) AS totalProducts
    FROM 
        Wheels
    WHERE 
        PCCD = :pccd 
    AND 
        isSecond=${second} 
    AND
        Wheels.BrandId IN(:filterArray)
    AND 
        deletedAt IS NULL`;

    const countResult = await sequelize.query(countQuery, {
        replacements: {
            pccd: pccd,
            filterArray: filterArray
        },
        type: sequelize.QueryTypes.SELECT,
    });
    const totalProduct = countResult[0].totalProducts;


    await Wheel.sequelize.query(`select WheelId as id, W.BrandId as BrandId, W.PCCD as PCCD,
      drivingMethodPCCD, productName, wheelSize,frontOffset, rearOffset, price,
      amount, discountRate, discountPrice, image,
      sales, viewers, isSecond, content, feature,
      isActivate, isContinue, W.createdAt as createdAt, W.updatedAt as updatedAt, name as brandName, B.origin as brandOrigin, nation as brandNation, brandLogo,PCD,hole
      from Wheels W
      join Brands B on W.BrandId = B.BrandId
      where W.BrandId IN (:filterArray) AND W.isSecond=${second} and W.deletedAt is null LIMIT ${pageSize} OFFSET ${offset}`, {type: sequelize.QueryTypes.SELECT, replacements:{filterArray: filterArray, isSecond:second}} )
      .then(result=>{
        res.json({
          status: {
            code: 2000,
            message: "데이터를 성공적으로 불러왔습니다."
          },
          data: result,
          total: totalProduct
        })
      })
      .catch(error=>{
        res.json({
          status: {
            code: 4000,
            message: error
          },
          data: ""
          
        })
  
      })
  }

})



module.exports = router;  