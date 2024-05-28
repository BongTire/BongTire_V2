import express, { Request, Response } from 'express';
import db from '../../models';
import logger from '../../config/logger';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import {IPost,IPostCategory} from '../../types/service/post'
import session, { SessionData } from 'express-session';
import {returnFormat} from '../../utils/return'
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
      isThumnail: data.isThumnail ?? false,
      isAnswer: data.isAnswer ?? false,
      thumnail: data.thumnail ?? "",
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
    const postData: { data: IPost } = req.body;
    logger.info(JSON.stringify(postData));

    if (postData.data.PostId === null) {
      // id값이 null 일때는 create
      try {
        const createData = await Post.create(postData.data as any); // 여기서 타입 캐스팅
        logger.info("데이터 주입 성공", createData);
        res.json({
          status: {
            code: 2000,
            message: "정상적으로 포스터가 들어갔습니다.",
          },
          data: createData,
        });
      } catch (error) {
        logger.error("데이터 주입 실패" + error);
        res.json({
          status: {
            code: 4000,
            message: "create했지만, 저장 못함.",
          },
          data: error,
        });
      }
    } else {
      // id값이 null이 아닌 숫자값이 온다면, update 만약 숫자가 왔어도, 해당 id 값이 존재하지 않다면 insert
      try {
        const existingData = await Post.findByPk(postData.data.PostId);
        let result;
        if (existingData) {
          result = await Post.update(postData.data as any, {
            where: { PostId: postData.data.PostId },
          });
        } else {
          result = await Post.create(postData.data as any);
        }
        logger.info("데이터 삽입 또는 업데이트가 성공적으로 수행됐습니다." + JSON.stringify(result));
        res.json({
          status: {
            code: 2000,
            message: "정상적으로 포스터가 들어갔습니다.",
          },
          data: result,
        });
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
          id: data.PostId,
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

router.post('/comment/:id', async (req: Request, res: Response) => {
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
router.get('/:postId',async (req: Request, res: Response) =>{//상세조회(1개)
  const ptcd = req.query.ptcd  ?? "" as string;
  const pccd = req.query.pccd ?? "" as string;
  const postId = Number(req.params.postId) ?? -1 as number

  if((ptcd == 'P0203'&&pccd == 'C0501') || (ptcd == 'P0203'&&pccd == 'C0502') || (ptcd == 'P0202'&&pccd == 'C0401')){  //list, card (ptcd=P0203&pccd=C0501 : Q&A / ptcd=P0203&pccd=C0502 : F&Q / ptcd = 'P0202'&&pccd = 'C0401' : notice(card))
    //해당글이 비밀글인지 아닌지 알아야함
    const { name, number } = req.body.data || {};
  try {
    const listDataRaw = await sequelize.query(`
      SELECT 
          *, 
          Posts.USERID AS writerId, 
          Posts.name AS writerName, 
          Posts.number AS writerEmail 
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
            writerEmail: data.writerEmail,
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
    }else if(listData[0].isSecret == 1){// 비밀글인 경우
      let result = setListResponse(listData as any[]);

      // 세션 검사
      if (req.session?.grade == 0) { // 관리자일 경우 Pass
        return res.json(result);
      } else if (number === (listData as any[])[0].number && name === (listData as any[])[0].name) { // 이름이랑 전화번호 같은지 확인
        return res.json(result);
      } else {
        return res.json({
          status: {
            message: "이름 또는 전화번호가 일치하지 않습니다.",
            code: "상태 코드",
          },
        });
      }
    }else if(listData[0].isSecret == 0){ // 공개글
      let result = setListResponse(listData as any[]);
      return res.json(result);
    }
  } catch (e) {
    logger.error(e);
    const result = setListResponse([]);
    res.json(result);//여기서 에러가 났는데 result를 줄때 혹시 listData를 뽑고나서 담아서 주게되는일은 발생하지 않는가?
  }    
  }else if(ptcd == 'P0202'&&pccd == 'N0402'){ //event 용
    //일단 비워둠. 생각해보니까 세부조회는 그냥 비밀글이랑 아닌거 이것만 나누고 나머지는 다 똑같은거아닌가?
  }else if(ptcd == "" || pccd == "" || postId == -1){ //ptcd 또는 pccd 또는 postId 가 안넘어왔을때
    res.json({
      status: {
        code: 4000,
        message: 'ptcd ,pccd 또는 postId가 없습니다.',
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
        id: data.PostId,
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
});

export default router;
