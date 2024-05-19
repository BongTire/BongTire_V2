var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');

// 카드형 페이지. (ptcd=p0203&pccd=n0401 : 공지사항 / ptcd=p0203&pccd=n0402 : 이벤트 )



router.get('/', async function(req, res) {

    try{
      const ptcd = req.query.ptcd;
      const pccd = req.query.pccd;
      logger.info(ptcd+", "+pccd);

      const page = parseInt(req.query.page, 10) || 1; // 페이지 번호
      const pageSize = parseInt(req.query.pageSize, 10) || 20; // 한 페이지에 보여줄 항목 수
      const offset = (page - 1) * pageSize; // offset 계산

      const query = `
      SELECT 
        *, 
        u.UserId AS writerId, 
        u.name AS writerName, 
        u.email AS writerEmail 
      FROM 
        Posts 
      JOIN 
        Users u 
      ON 
        Posts.UserId = u.UserId 
      WHERE 
        PCCD = :pccd 
      AND 
        Posts.deletedAt IS NULL 
      LIMIT
        :pageSize
      OFFSET
        :offset`;

      const posts = await sequelize.query(query, {
        replacements: {
          pccd: pccd,
          pageSize: pageSize,
          offset: offset,
        },
        type: sequelize.QueryTypes.SELECT,
      });
      const result = setCardResponse(posts)
      //총 게시물 개수 가져오기
      const countQuery = `
        SELECT 
            COUNT(*) AS totalPosts
        FROM 
            Posts
        WHERE 
            PCCD = :pccd 
        AND 
            deletedAt IS NULL`;

        const countResult = await sequelize.query(countQuery, {
            replacements: {
                pccd: pccd,
            },
            type: sequelize.QueryTypes.SELECT,
        });

        const totalPosts = countResult[0].totalPosts;
        result.total = totalPosts;
        

      console.log(JSON.stringify(result))
      logger.info(result)
      res.json(result)
    }catch(e){
      logger.error(e)
      res.json({
        status:{
          code: 4000,
          message: '데이터를 불러오지 못했습니다.' + e
        }
      })
    }

});

router.get('/:id', async function(req, res) {

  try{
    const pccd = req.query.pccd;
    const postId = req.params.id;

    logger.info(pccd);
    
    await sequelize.query(`select * , u.USERID as writerId, u.NAME as writerName, u.EMAIL as writerEmail from Posts join Users u on Posts.UserId = u.UserId where PCCD = '${pccd}' && Posts.deletedAt IS NULL && Posts.PostId = '${postId}'`, { type: sequelize.QueryTypes.SELECT })
    .then(findData=>{
      const result = setCardResponse(findData)
      logger.info(result)
      res.json(result)
    })
    .catch(e=>{
      logger.error(e)
    const result = setCardResponse([])
    res.json(result)  
    })
  }catch(e){
    logger.error(e)
    const result = setCardResponse([])
    res.json(result)
  }

});


const setCardResponse = (post) =>{
  const postData = []
  if(post.lenght === 0){
    
  }

  post.map((data, i)=>{
    postData[i] = {
      id: data.PostId,
      content:{
        PTCD : data.PTCD??"",
        PCCD : data.PCCD??"",
        title: data.title??"",
        content: data.content??"",
        startDate: data.postStartDate??"",
        duration: data.postDuration??0,
        endDate: data.postEndDate??"",
        createDate: data.createdAt??"",
        updateDate: data.updatedAt??"",
        writer: {
            id: data.writerId??0,
            name: data.writerName??"",
            email: data.writerEmail??"",
            provider: data.provider??""
        }
      },
      viewers : data.viewers??0,
      isPin : data.isPin??false,
      isActive : data.isActive??false,
      isThumbnail : data.isThumbnail??true,
      thumbnail: data.thumbnail??"",
      isAnswer : data.isAnswer??false,
      answer: data.answer??""
    }
  })
  const result = {
    status:{
      message: "상태 메시지 작성",
      code : "상태 코드"
    },
    data:[...postData]
  }

  return result

}

const setRequestToDBFormat = (postData) =>{
  console.log(postData.data)

  const result = {
    // PostId: postData.id,
    UserId: postData.data.content.writer.id,
    PTCD: postData.data.content.PTCD,
    PCCD: postData.data.content.PCCD,
    title: postData.data.content.title,
    content: postData.data.content.content,
    isThumbnail: postData.data.isThumbnail,
    thumbnail: postData.data.thumbnail,
    postStartDate: postData.data.content.startDate,
    postEndDate: postData.data.content.endDate,
    postDuration: postData.data.content.duration,
    isPin: postData.data.isPin,
    isActive: postData.data.isActive,
    isAnswer: postData.data.isAnswer,
    answer: postData.data.answer,
    viewers: postData.data.viewers,
    isSecret: postData.data.isSecret
  }

  return result
}

module.exports = router;