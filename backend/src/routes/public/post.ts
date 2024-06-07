import express, { Request, Response } from 'express';
import db from '../../models';
import logger from '../../config/logger';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import {IPost,IPostCategory} from '../../types/service/post'
import session, { SessionData } from 'express-session';
import {returnFormat} from '../../utils/return'
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';
import bcrypt from 'bcryptjs';

const Post = db.Post
const sequelize = db.sequelize


const router = express.Router();

interface PostResponse {
  status: {
    message: string;
    code: string;
  };
  data: any[];
  total?: number;
}

const setListResponse = (posts: any[]): PostResponse => {
  const postData: any[] = [];
  if (posts.length === 0) {
    // Empty response handling (if needed)
  }

  posts.map((data, i) => {
    postData[i] = {
      PostId: data.PostId,
      PTCD: data.PTCD ?? "",
      PCCD: data.PCCD ?? "",
      title: data.title ?? "",
      content: data.content ?? "",
      createdAt: data.createdAt ?? "",
      updatedAt: data.updatedAt ?? "",
      writerId: data.writerId ?? 0,
      writerName: data.writerName ?? "",
      writerEmail: data.writerEmail ?? "",
      isPin: data.isPin ?? false,
      isActive: data.isActive ?? false,
      isSecret: data.isSecret,
      isThumbnail: data.isThumbnail ?? false,
      isAnswer: data.isAnswer ?? false,
      thumbnail: data.thumbnail ?? "",
      viewers: data.viewers ?? 0,
      answer: data.answer ?? "",
    };
  });

  const result: PostResponse = {
    status: {
      message: "성공적으로 데이터를 가져왔습니다.",
      code: "2000",
    },
    data: [...postData],
  };

  return result;
};

router.post("/", async (req: Request, res: Response) => {
  try {
    const postData: { data: any } = req.body;
    logger.info(JSON.stringify(postData));
    //비회원이라면 이름과 전화번호 필수
    let name = req.session.name ?? postData.data.name ?? null;
        let number = req.session.number ?? postData.data.number ?? '';
        let UserId = req.session.userId ?? postData.data.UserId ?? null;  
        let hashednumber;
        // 전화번호가 null 또는 undefined인지 확인하고 기본값 설정
        number = number ? number.replace(/[-\s]/g, '') : null;
        name = name ? name.replace(/[\s]/g, '') : null;

    if (postData.data.PostId === null) {
      // id값이 null 일때는 create
      try {
        if(postData.data.PTCD ==='' && postData.data.PCCD ===''){
          logger.info('PTCD, PCCD가 존재하지 않습니다.')
          const returnFormatData = returnFormat(4000,'PTCD, PCCD가 존재하지 않습니다.',{})
          res.json(returnFormatData);
        }else if(UserId && number && name && number !==''&& !/\D/.test(number)){//number값이 존재하는가?//전화번호에 숫자 이외에 다른게 있는가?
            //logger.info(number)
            const salt = await bcrypt.genSalt(10);
            hashednumber = await bcrypt.hash(number, salt);
            //hashednumber = number
            const createData = await Post.create({
              UserId: UserId,
                PTCD: postData.data.PTCD,
                PCCD: postData.data.PCCD,
                title: postData.data.title,
                content: postData.data.content,
                name: name,
                number: hashednumber,
                isThumbnail: postData.data.isThumbnail,
                thumbnail: postData.data.thumbnail,
                isMainPost: postData.data.isMainPost,
                isPin: postData.data.isPin,
                isActive: postData.data.isActive,
                isAnswer: postData.data.isAnswer,
                answer: postData.data.answer,
                viewers: postData.data.viewers,
                isSecret: postData.data.isSecret,
            }); // 여기서 타입 캐스팅
            logger.info("데이터 주입 성공", createData);
            const returnFormatData = returnFormat(2000,"정상적으로 포스터가 들어갔습니다.",createData)
            res.json(returnFormatData);
            
        }else{
          logger.info('저장 실패, UserId, number, name이 적합하지 않습니다.')
          const returnFormatData = returnFormat(4000,'저장 실패, UserId, number, name 중 null이 존재합니다.',{})
          res.json(returnFormatData);
        }
      } catch (error) {
        logger.error("데이터 주입 실패" + error);
        res.json({
          status: {
            code: 5000,
            message: "데이터 주입 실패, 저장과정중 오류가 발생했습니다.",
          },
          data: error,
        });
      }
    } else {
      // id값이 null이 아닌 숫자값이 온다면, update 만약 숫자가 왔어도, 해당 id 값이 존재하지 않다면 insert
      try {
        const existingData = await Post.findOne({
          where:{
            PostId:postData.data.PostId
          },
          raw:true
        });
        let result;
        if (existingData) {
          const isMatch = await bcrypt.compare(number, existingData.number ??'');
          if(postData.data.PTCD !=='' && postData.data.PCCD !==''){
            logger.info('PTCD, PCCD가 존재하지 않습니다.')
            const returnFormatData = returnFormat(4000,'PTCD, PCCD가 존재하지 않습니다.',{})
            res.json(returnFormatData);
          }else if(UserId && number && name && number !==''&& !/\D/.test(number) && existingData.name ===name && isMatch){
            result = await Post.update({
              UserId: UserId,
                PTCD: postData.data.PTCD,
                PCCD: postData.data.PCCD,
                title: postData.data.title,
                content: postData.data.content,
                name: name,
                number: hashednumber,
                isThumbnail: postData.data.isThumbnail,
                thumbnail: postData.data.thumbnail,
                isMainPost: postData.data.isMainPost,
                isPin: postData.data.isPin,
                isActive: postData.data.isActive,
                isAnswer: postData.data.isAnswer,
                answer: postData.data.answer,
                viewers: postData.data.viewers,
                isSecret: postData.data.isSecret,
            }, {
              where: { PostId: postData.data.PostId },
            });
            logger.info('post 업데이트 완료')
            const returnFormatData = returnFormat(2000,'post 업데이트 완료',result)
            res.json(returnFormatData);
          }else if(req.session.grade === 0){//관리자라면
            result = await Post.update({
              UserId: UserId,
                PTCD: postData.data.PTCD,
                PCCD: postData.data.PCCD,
                title: postData.data.title,
                content: postData.data.content,
                isThumbnail: postData.data.isThumbnail,
                thumbnail: postData.data.thumbnail,
                isMainPost: postData.data.isMainPost,
                isPin: postData.data.isPin,
                isActive: postData.data.isActive,
                isAnswer: postData.data.isAnswer,
                answer: postData.data.answer,
                viewers: postData.data.viewers,
                isSecret: postData.data.isSecret,
            }, {
              where: { PostId: postData.data.PostId },
            });
            logger.info('관리자가 post 업데이트 완료')
            const returnFormatData = returnFormat(2000,'관리자가 post 업데이트 완료',result)
            res.json(returnFormatData);
          }
        } else { //기존에 postId가 존재하지 않는다면
          try {
            if(postData.data.PTCD !=='' && postData.data.PCCD !==''){
              logger.info('PTCD, PCCD가 존재하지 않습니다.')
              const returnFormatData = returnFormat(4000,'PTCD, PCCD가 존재하지 않습니다.',{})
              res.json(returnFormatData);
            }else if(UserId && number && name && number !==''&& !/\D/.test(number)){//number값이 존재하는가?//전화번호에 숫자 이외에 다른게 있는가?
                //logger.info(number)
                const salt = await bcrypt.genSalt(10);
                hashednumber = await bcrypt.hash(number, salt);
                //hashednumber = number
                const createData = await Post.create({
                  UserId: UserId,
                    PTCD: postData.data.PTCD,
                    PCCD: postData.data.PCCD,
                    title: postData.data.title,
                    content: postData.data.content,
                    name: name,
                    number: hashednumber,
                    isThumbnail: postData.data.isThumbnail,
                    thumbnail: postData.data.thumbnail,
                    isMainPost: postData.data.isMainPost,
                    isPin: postData.data.isPin,
                    isActive: postData.data.isActive,
                    isAnswer: postData.data.isAnswer,
                    answer: postData.data.answer,
                    viewers: postData.data.viewers,
                    isSecret: postData.data.isSecret,
                }); // 여기서 타입 캐스팅
                logger.info("데이터 주입 성공", createData);
                const returnFormatData = returnFormat(2000,"정상적으로 포스터가 들어갔습니다.",createData)
                res.json(returnFormatData);
                
            }else{
              logger.info('저장 실패, UserId, number, name이 적합하지 않습니다.')
              const returnFormatData = returnFormat(4000,'저장 실패, UserId, number, name 중 null이 존재합니다.',{})
              res.json(returnFormatData);
            }
          } catch (error) {
            logger.error("데이터 주입 실패" + error);
            res.json({
              status: {
                code: 5000,
                message: "데이터 주입 실패, 저장과정중 오류가 발생했습니다.",
              },
              data: error,
            });
          }
        }
      } catch (error) {
        logger.error("데이터 삽입 또는 업데이트에 실패했습니다." + error);
        res.json({
          status: {
            code: 4000,
            message: "왜 post가 인식됨?",
          },
          data: error,
        });
      }
    }
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


router.get('/', async (req: Request, res: Response) => { //card, list 추가
  const ptcd = req.query.ptcd  ?? "" as string;
  const pccd = req.query.pccd ?? "" as string;
  if((ptcd === 'P0203'&&pccd === 'C0501') || (ptcd === 'P0203'&&pccd === 'C0502') || (ptcd === 'P0202'&&pccd === 'N0401')){ //list, card (ptcd=P0203&pccd=C0501 : Q&A / ptcd=P0203&pccd=C0502 : F&Q / ptcd = 'P0202'&&pccd = 'C0401' : notice(card))
    try {
      const ptcd = req.query.ptcd as string;
      const pccd = req.query.pccd as string;
      logger.info(`${ptcd}, ${pccd}`);
  
      const page = parseInt(req.query.page as string, 10) || 1; // 페이지 번호
      const pageSize = parseInt(req.query.pageSize as string, 10) || 20; // 한 페이지에 보여줄 항목 수
      const offset = (page - 1) * pageSize; // offset 계산
  
      const query = `
      SELECT 
      *, 
      Posts.UserId AS writerId, 
      Posts.name AS writerName, 
      Posts.number AS writerNumber
    FROM 
      Posts 
    WHERE 
      PCCD = :pccd 
    AND 
      Posts.deletedAt IS NULL 
    ORDER BY
      Posts.createdAt DESC
    LIMIT
      :pageSize
    OFFSET
      :offset;`;
  
      const posts = await sequelize.query(query, {
        replacements: {
          pccd: pccd,
          pageSize: pageSize,
          offset: offset,
        },
        type: QueryTypes.SELECT,
      });
  
      const result: PostResponse = setListResponse(posts as any[]);
  
      // 총 게시물 개수
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
        type: QueryTypes.SELECT,
      });
  
      const totalPosts = (countResult as any[])[0].totalPosts;
      result.total = totalPosts;
  
      logger.info(result);
      res.json(result);
    } catch (e) {
      logger.error(e);
      res.json({
        status: {
          code: 4000,
          message: '데이터를 불러오지 못했습니다. ' + e,
        },
      });
    }
  }else if(ptcd == 'P0202'&&pccd == 'N0402'){ //기존 Post
    try {
      const pccd = 'N0402';
      const result = await Post.findAll({
        where: {
          PCCD: pccd,
          isMainPost: 1
        }
      });
  
      if (result.length > 0) {
        logger.info(result[0].PCCD);
        const sendEvent = result.map((data :any , index :any) => ({
          PostId: data.PostId,
          PCCD: data.PCCD,
          thumbnail: data.thumbnail,
          isMainPost: data.isMainPost,
          viewers: data.viewers,
          url: '/post/detail/' + data.PostId + '?pccd=' + data.PCCD
        }));
        
        res.json({
          status: {
            code: 2000,
            message: '데이터를 성공적으로 불러왔습니다.',
          },
          data: sendEvent
        });
      } else {
        throw new Error('데이터를 찾을 수 없습니다.');
      }
    } catch (error) {
      logger.error('이벤트 데이터 찾기 실패');
      logger.error(error);
      res.json({
        status: {
          code: 4000,
          message: '데이터를 불러오지 못했습니다.' + error,
          data: []
        }
      });
    }

  }else if(ptcd == 'P0202'&&pccd == 'N0402'){ //기존 낱개 Post
    try {
      const postId = Number(req.query.PostId) as number;
  
      const result = await Post.findOne({
        where: {
          PostId: postId
        }
      });
      
      if (result) {
        logger.info(JSON.stringify(result));
        res.json({
          status: {
            code: 2000,
            message: "성공적으로 데이터를 불러왔습니다.",
          },
          data: result
        });
      } else {
        throw new Error('데이터를 찾을 수 없습니다.');
      }
    } catch (error) {
      logger.error(error);
      res.json({
        status: {
          code: 4000,
          message: "데이터를 불러오는데 실패했습니다.",
        },
        data: '' + error
      });
    }
  }else if(ptcd === "" || pccd === "" ){ //ptcd 또는 pccd 가 안넘어왔을때
    res.json({
      status: {
        code: 4000,
        message: 'ptcd 또는 pccd가 없습니다.',
      },
    });

  }else{
    res.json({
      status: {
        code: 4000,
        message: '올바른 접근이 아닙니다.',
      },
    });
  }
  
  
});

router.post('/delete', async (req: Request, res: Response) => {
  const { PostId } = req.body.data || {};
  logger.info(PostId);
  
  if (!PostId) {
    res.json({
      status:{
        code: 4002,
        message: '삭제하려면 PostId가 필요합니다.',
      },
      data: ''
    });
    return;
  }

  try {
    const deletedPost = await Post.destroy({
      where: {
        PostId: PostId,
      },
    });

    if (deletedPost > 0) {
      res.json({
        status:{
          code: 2000,
          message: 'Post 삭제 성공.',
        },
        data: ''
      });
    } else {
      res.json({
        status:{
          code: 4004,
          message: '해당 PostId에 대한 Post를 찾을 수 없습니다.',
        },
        data: ''
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

router.post('/comment/:id', isAuthenticatedAdmin,async (req: Request, res: Response) => {
  const comment = req.body;
  const postId = req.params.id;

  try {
    const result = await Post.update(comment, { where: { PostId: postId } });
    logger.info('데이터 업데이트에 성공했습니다.');
    res.json({
      status: {
        code: 2000,
        message: "댓글 데이터 넣기 성공했습니다.",
      },
      data: result
    });
  } catch (error) {
    logger.error(error);
    res.json({
      status: {
        code: 400,
        message: "댓글 데이터 넣기 실패했습니다.",
        data: error
      }
    });
  }
});
router.post('/:postId',async (req: Request, res: Response) =>{//상세조회(1개)
  const ptcd = req.query.ptcd  ?? "" as string;
  const pccd = req.query.pccd ?? "" as string;
  const postId = Number(req.params.postId) ?? -1 as number
  logger.info('입성1')
  
  
  if((ptcd == 'P0203'&&pccd == 'C0501') || (ptcd == 'P0203'&&pccd == 'C0502') || (ptcd == 'P0202'&&pccd == 'C0401') || (ptcd == 'P0202'&&pccd == 'N0402')){  //list, card (ptcd=P0203&pccd=C0501 : Q&A / ptcd=P0203&pccd=C0502 : F&Q / ptcd = 'P0202'&&pccd = 'C0401' : notice(card))
    logger.info('입성')
    //해당글이 비밀글인지 아닌지 알아야함
    const { name, number } = req.body.data || {};
  try {
    const listDataRaw = await sequelize.query(`
      SELECT 
          *, 
          Posts.UserId AS writerId, 
          Posts.name AS writerName, 
          Posts.number AS writerNumber
      FROM Posts 
      WHERE PCCD = '${pccd}' AND Posts.deletedAt IS NULL AND Posts.PostId = ${postId}`, { type: QueryTypes.SELECT });

    // listDataRaw의 각 요소를 IPost 타입으로 변환하여 listData에 저장
    const listData: IPost[] = listDataRaw.map((data: any) => {
        return {
            PostId: data.PostId,
            PTCD: data.PTCD,
            PCCD: data.PCCD,
            title: data.title,
            content: data.content,
            writerId: data.writerId,
            writerName: data.writerName,
            writerNumber: data.writerNumber,
            //writerEmail: data.writerEmail,
            isPin: data.isPin,
            isActive: data.isActive,
            isAnswer: data.isAnswer,
            isThumbnail: data.isThumbnail,
            thumbnail: data.thumbnail,
            answer: data.answer,
            viewers: data.viewers,
            isSecret: data.isSecret,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    });
    
    if ((listData as any[]).length === 0) {// listData가 빈 배열인 경우 처리
      return res.status(4004).json({
        success: false,
        message: '해당 게시물을 찾을 수 없습니다.',
      });
    }else if(listData[0].isSecret === 1 && listData[0].writerId === -1){// 비회원 비밀글인 경우 (회원 비밀글은 elseif로 따로 처리)
      let result = setListResponse(listData as any[]);
      
      
      // 세션 검사
      if (req.session?.grade == 0) { // 관리자일 경우 Pass
        return res.json(result);
      } else if (name === (listData as any[])[0].writerName) { // 이름이랑 전화번호 같은지 확인
        let number =req.body.data.number ?? '';
        const isMatch = await bcrypt.compare(number, (listData as any[])[0].writerNumber);
        if(isMatch){
          return res.json(result);
        }
      } else {
        logger.info(number)
        logger.info(listData[0].writerNumber)
        logger.info(name)
        logger.info(listData [0].writerName)
        return res.json({
          status: {
            message: "이름 또는 전화번호가 일치하지 않습니다.",
            code: 4005,
          },
        });
      }
    }else if(listData[0].isSecret == 0){ // 공개글
      let result = setListResponse(listData as any[]);
      return res.json(result);
    }
  } catch (e) {
    logger.error(e);
    const returnFormatData = returnFormat(4000,'post 세부조회 실패',e)
    res.json(returnFormatData);
    // const result = setListResponse([]);
    // res.json(result);//여기서 에러가 났는데 result를 줄때 혹시 listData를 뽑고나서 담아서 주게되는일은 발생하지 않는가?
  }    
  }else if(ptcd == "" || pccd == ""){ //ptcd 또는 pccd가 안넘어왔을때
    res.json({
      status: {
        code: 4000,
        message: 'ptcd ,pccd가 없습니다.',
      },
    });

  }else{
    res.json({
      status: {
        code: 4000,
        message: '올바른 접근이 아닙니다.',
      },
    });
  }
})

router.get('/event', async (req: Request, res: Response) => {
  try {
    const pccd = 'N0402';
    const result = await Post.findAll({
      where: {
        PCCD: pccd,
        isMainPost: 1
      }
    });

    if (result.length > 0) {
      logger.info(result[0].PCCD);
      const sendEvent = result.map((data :any , index :any) => ({
        PostId: data.PostId,
        PCCD: data.PCCD,
        thumbnail: data.thumbnail,
        isMainPost: data.isMainPost,
        viewers: data.viewers,
        url: `board/${data.PostId}?ptcd=P0202&pccd=${data.PCCD}`
      }));
      
      res.json({
        status: {
          code: 2000,
          message: '데이터를 성공적으로 불러왔습니다.',
        },
        data: sendEvent
      });
    } else {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    logger.error('이벤트 데이터 찾기 실패');
    logger.error(error);
    res.json({
      status: {
        code: 4000,
        message: '데이터를 불러오지 못했습니다.' + error,
        data: []
      }
    });
  }
});

export default router;
