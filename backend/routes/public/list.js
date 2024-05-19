var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');

// 리스트형 페이지. (ptcd=P0203&pccd=C0501 : Q&A / ptcd=P0203&pccd=C0502 : F&Q )
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
        Posts.UserId AS writerId, 
        Posts.name AS writerName, 
        Posts.number AS writerEmail
      FROM 
        Posts 
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

      //총 게시물 개수
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

router.post('/:id', async function(req, res) {
  logger.info(req.session.name)


  const { name,number } = req.body.data || {};
  
  if (!name || !number) { //이름, 전화번호 null
    if(req.session.grade !== 0){ //관리자 아님
      res.json({
        status:{
            code:4000,
            message: '비밀글 조회시 이름과 전화번호가 필요합니다.',
        }
    })
      return;
    }
      
  }

  try{
      const pccd = req.query.pccd;
      const postId = req.params.id;

      const listData = await sequelize.query(`
        SELECT 
          *, 
          Posts.USERID AS writerId, 
          Posts.name AS writerName, 
          Posts.number AS writerEmail 
        FROM Posts 
        WHERE PCCD = '${pccd}' AND Posts.deletedAt IS NULL AND Posts.PostId = ${postId}`, { type: sequelize.QueryTypes.SELECT }); //'${postId}' -> ${postId}

      // listData가 빈 배열인 경우 처리
      if (listData.length === 0) {
        return res.status(4004).json({
          success: false,
          message: '해당 게시물을 찾을 수 없습니다.',
        });
      }

      let result = setCardResponse(listData);

      // 세션 검사
      if(req.session.grade == 0) { // 관리자일 경우 Pass
        return res.json(result);
      } else if(number == listData[0].number && name == listData[0].name) { // 이름이랑 전화번호 같은지 확인
        return res.json(result);
      } else {
        return res.json({
          status:{
            message: "이름 또는 전화번호가 일치하지 않습니다.",
            code : "상태 코드"
          }
        });
      }
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
      isPin : data.isPin??false,
      isActive : data.isActive??false,
      isSecret: data.isSecret,
      isThumnail : data.isThumnail??false,
      isAnswer : data.isAnswer??false,
      thumnail: data.thumnail??"",
      viewers : data.viewers??0,
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

module.exports = router;

