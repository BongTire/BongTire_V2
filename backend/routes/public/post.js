var express = require("express");
var router = express.Router();
const { Post } = require("../../models");
const logger = require("../../config/logger");
const { Sequelize, DataTypes } = require("sequelize");


router.post("/", async (req, res) => {
  try {
    const postData = await req.body;
    logger.info(postData);

    if (postData.data.PostId === null) {
      // id값이 null 일때는 create
      Post.create(postData.data)
        .then((createData) => {
          console.log("데이터 주입 성공", createData);
        })
        .catch((error) => {
          logger.error("데이터 주입 실패" + error);
          res.json({
            status: {
              code: 4000,
              message: "create했지만, 저장 못함.",
            },
            data: error,
          });
        });
    } else {
      // id값이 null이 아닌 숫자값이 온다면, update 만약 숫자가 왔어도, 해당 id 값이 존재하지 않다면 insert
      Post.findByPk(postData.data.PostId)
        .then((existingData) => {
          if (existingData) {
            return Post.update(postData.data, {
              where: { PostId: postData.data.PostId },
            });
          } else {
            return Post.create(postData.data);
          }
        })
        .then((result) => {
          logger.info(
            "데이터 삽입 또는 업데이트가 성공적으로 수행됐습니다." + result
          );
        })
        .catch((error) => {
          logger.error("데이터 삽입 또는 업데이트에 실패했습니다." + error);
          res.json({
            status: {
              code: 4000,
              message: "왜 post가 인식됨?",
            },
            data: error,
          });
        });
    }
    res.json({
      status: {
        code: 2000,
        message: "정상적으로 포스터가 들어갔습니다.",
      },
      data: "",
    });
  } catch (error) {
    logger.error(error);
    res.json({
      status: {
        code: 4000,
        message: "저장되지 않았습니다.",
      },
      data: error,
    });
  }
});

router.get('/', async(req, res)=>{

  try{
    const pccd = req.query.pccd;
    const postId = req.query.PostId;

    Post.findOne({
      where:{
        PostId: postId
      }
    })
    .then(result=>{
      logger.info(result)
      res.json({
        status:{
          code: 2000,
          message: "성공적으로 데이터를 불러왔습니다.."
        },
        data: result
      })
    })
    .catch(error=>{
      logger.error(error)
      res.json({
        status:{
          code: 4000,
          message: "데이터를 불러오는데 실패했습니다.."
        },
        data: ''+error
      })
    })
  }catch(error){
    logger.error(error)
    res.json({
      status:{
        code: 4000,
        message: "데이터를 불러오는데 실패했습니다.."
      },
      data: ''+error
    })
  }

})

router.post('/delete', async function (req, res) {
  // 입력 데이터 유효성 검사
  const { PostId } = req.body.data || {};
  logger.info(PostId)
  
  if (!PostId) {
      res.status(400).json({
          success: false,
          message: '삭제하려면 PostId가 필요합니다.',
      });
      return;
  }

  try {
      const deletedPost = await Post.destroy({
          where: {
              PostId: PostId,
          },
      });

      // 삭제 확인
      if (deletedPost > 0) {
          res.status(200).json({
              success: true,
              message: 'Post 삭제 성공.',
          });
      } else {
          res.status(404).json({
              success: false,
              message: '해당 PostId에 대한 Post를 찾을 수 없습니다.',
          });
      }

  } catch (error) {
      logger.error(`/api/post/delete: ${error}`);
      res.status(500).json({
          success: false,
          message: 'Post 삭제 중 서버 오류 발생.',
      });
  }
});

router.post('/comment/:id', async(req, res)=>{

  const comment = req.body;
  const postId = req.params.id

  console.log(comment)
  console.log(postId)
  try{
    
    await Post.update(comment, { where: { PostId: postId }})
    .then(result=>{
      logger.info('데이터 업데이트에 성공했습니다.')
      res.json({
        status:{
          code: 2000,
          message: "댓글 데이터 넣기 성공햇습니다."
        },
        data: result
      })
    })
    .catch(error=>{
      logger.error(error)
      res.json({
        status:{
          code: 400,
          message: "댓글 데이터 넣기 실패했습니다."
        },
        data: error
      })
    })

  }catch(error){
    logger.error(error)
      res.json({
        status:{
          code: 400,
          message: "댓글 데이터 넣기 실패했습니다."
        },
        data: error
    })
  }
})

router.get('/event', async(req, res)=>{
  try{
    const pccd = 'N0402'
    await Post.findAll({
      where:{
        PCCD: pccd,
        isMainPost: 1
      }
    })
    .then(result=>{
      logger.info(result[0].PCCD)
      let sendEvent = []
      result.map((data,index)=>{
        sendEvent[index] ={
          id: data.PostId,
          PCCD: data.PCCD,
          thumbnail: data.thumbnail,
          isMainPost: data.isMainPost,
          viewers: data.viewers,
          url: '/post/detail/'+data.PostId+'?pccd='+data.PCCD
        }
      })
      res.json({
        status:{
          code: 2000,
          message:'데이터를 성공적으로 불러왔습니다.'
        },
        data: sendEvent
      })
    })
    .catch(error=>{
      logger.error('이벤트 데이터 찾기 실패')
      logger.error(error)
      res.json({
        status:{
          code: 4000,
          message: '데이터를 불러오지 못했습니다.' + e
        },
        data: []
      })
    })

  }catch(error){
    logger.error(error)
    res.json({
      status:{
        code: 4000,
        message: '데이터를 불러오지 못했습니다.' + error
      },
      data: []
    })
  }
})




module.exports = router;
