var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('./../models');
const logger = require('./../config/logger');
/* 
 {
            "id": 1,
            "content":{
                "ptcd" : "P0202",
                "pccd" : "N0401",
                "title": "제목1",
                "content": "간단한 요약본",
                "isPin" : false,
                "isActive" : true,
                "IsActiveAnswer" : false,
                "isAnswer" : false,
                "viewers" : 4, 
                "startDate": "20230202",
                "duration": 10, // startdate - enddate , 남은 게시 기간
                "endDate": "20230212",
                "createDate": "20230202",
                "updateDate": "20230202",
                "writer": {
                    "id": 1,
                    "name": "관리자",
                    "email": "example@naver.com",
                    "provider": "local"
                }
            },
            "isThumnail" : true,
            "thumnail": "src/assets/example-image.jpeg",
            "thumnailSize": {
                "width": 300,
                "height": 130
            }
        },
        */
// 카드형 페이지. (ptcd=p0203&pccd=n0401 : 공지사항 / ptcd=p0203&pccd=n0402 : 이벤트 )
router.get('/', async function(req, res) {
    //Post 테이블에서 ptcd, pccd 맞는거 꺼내오기
    console.log('여기')
    
    const ptcd = req.query.ptcd;
    const pccd = req.query.pccd;
    logger.info(ptcd+", "+pccd);
    
    logger.info(typeof(ptcd),", ",typeof(pccd));
    const posts = await Post.findAll({
        where:{
            pccd:pccd
        }
          
    })
    logger.info("posts: "+ posts);

    const userId = posts.UserId;
    const users = await User.findAll({})
    logger.info("users",users);
    

    const result = {
        data: posts.map(post => {
          console.log('map 진행중')
          const correspondingUser = users.find(user => user.UserId === post.UserId);
      
          return {
            id: post.id,
            content: {
              ptcd: post.ptcd,
              pccd: post.pccd,
              title: post.title,
              content: post.content,
              isPin: post.isPin,
              isActive: post.isActive,
              IsActiveAnswer: post.IsActiveAnswer,
              isAnswer: post.isAnswer,
              viewers: post.viewers,
              startDate: post.startDate,
            },
            isThumnail: true,
            thumnail: post.thumnail,
            thumnailSize: {
              width: 300,
              height: 130
            },
            writer: {
              id: correspondingUser ? correspondingUser.id : null,
              name: correspondingUser ? correspondingUser.name : null,
              email: correspondingUser ? correspondingUser.email : null,
              provider: correspondingUser ? correspondingUser.provider : null
            }
          };
        })
      };
      logger.info(JSON.stringify(result));
  
      //console.log(JSON.stringify(result, null, 2));

});

router.get('/input/ptcd',async function(req,res){
    await PTCD.create({
        PTCDId:1,
        menuTypeName:'menu',
        menuTypeCode:'menu',
        pageTypeName:'menu',
        PTCD:'M0101'
    })

    await PTCD.create({
        PTCDId:2,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'html',
        PTCD:'P0201'
    })
    await PTCD.create({
        PTCDId:3,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'card',
        PTCD:'P0202'
    })
    await PTCD.create({
        PTCDId:4,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'list',
        PTCD:'P0203'
    })
    await PTCD.create({
        PTCDId:5,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'page',
        PTCD:'P0204'
    })

    await PTCD.create({
        PTCDId:6,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'lcard',
        PTCD:'P0301'
    })

    await PTCD.create({
        PTCDId:7,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'reservation',
        PTCD:'P0401'
    })

    await PTCD.create({
        PTCDId:8,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'main',
        PTCD:'M0401'
    })

    
})
router.get('/input/pccd',async function(req,res){
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'M0101',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 2,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'M0201',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 3,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'M0202',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 4,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'I0301',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 5,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'I0302',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 6,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'N0401',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 7,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'N0402',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 8,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0501',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 9,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0502',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 10,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'P0601',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 11,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'P0602',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 12,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0701',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 13,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0702',
        icon: 'icon address',
    })
    
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0703',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'R0801',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'F0901',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'F0902',
        icon: 'icon address',
    })

})
router.get('/input/user',async function(req,res){
    await User.create({
        UserId: 1,
        auth: 1,
        name: '유저 이름',
        number: 1,
        email: 'email@email',
        platform: 'kakao',
        isBlack: false,
        grade: 1,
        address: 'address',
        snsId:'snsId',
        
    })
    await User.create({
        UserId: 2,
        auth: 1,
        name: '유저 이름222',
        number: 2,
        email: 'email22@email',
        platform: 'kakao',
        isBlack: false,
        grade: 1,
        address: 'address22',
        snsId:'snsId222',
        
    })
    

    //
})
router.get('/input/post',async function(req,res){
    await Post.create({
        PostID: 1,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0401',
        title: '카드형 - 공지사항',
        content: 'content',
        isThumbnail:false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 2,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0401',
        title: '카드형 - 공지사항',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 3,
        UserId: 2,
        PTCD: ' P0203',
        PCCD: 'N0401',
        title: '카드형 - 공지사항',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })

    await Post.create({
        PostID: 4,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0402',
        title: '카드형 - 이벤트',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 5,
        UserId: 2,
        PTCD: ' P0203',
        PCCD: 'N0402',
        title: '카드형 - 이벤트',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 6,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0402',
        title: '카드형 - 이벤트',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
})

router.get('/input/all',async function(req,res){
    await PTCD.create({
        PTCDId:1,
        menuTypeName:'menu',
        menuTypeCode:'menu',
        pageTypeName:'menu',
        PTCD:'M0101'
    })

    await PTCD.create({
        PTCDId:2,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'html',
        PTCD:'P0201'
    })
    await PTCD.create({
        PTCDId:3,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'card',
        PTCD:'P0202'
    })
    await PTCD.create({
        PTCDId:4,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'list',
        PTCD:'P0203'
    })
    await PTCD.create({
        PTCDId:5,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'page',
        PTCD:'P0204'
    })

    await PTCD.create({
        PTCDId:6,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'lcard',
        PTCD:'P0301'
    })

    await PTCD.create({
        PTCDId:7,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'reservation',
        PTCD:'P0401'
    })

    await PTCD.create({
        PTCDId:8,
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'main',
        PTCD:'M0401'
    })

    //pccd
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'M0101',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 2,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'M0201',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 3,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'M0202',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 4,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'I0301',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 5,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'I0302',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 6,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'N0401',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 7,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'N0402',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 8,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0501',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 9,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0502',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 10,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'P0601',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 11,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'P0602',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 12,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0701',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 13,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0702',
        icon: 'icon address',
    })
    
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'C0703',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'R0801',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'F0901',
        icon: 'icon address',
    })
    await PCCD.create({
        PageCategoryId: 1,
        firstName: 'firstName',
        firstCodeName: 'firstCodeName',
        secondName: 'secondName',
        PCCD: 'F0902',
        icon: 'icon address',
    })

    //user
    await User.create({
        UserId: 1,
        auth: 1,
        name: '유저 이름',
        number: 1,
        email: 'email@email',
        platform: 'kakao',
        isBlack: false,
        grade: 1,
        address: 'address',
        snsId:'snsId',
        
    })
    await User.create({
        UserId: 2,
        auth: 1,
        name: '유저 이름222',
        number: 2,
        email: 'email22@email',
        platform: 'kakao',
        isBlack: false,
        grade: 1,
        address: 'address22',
        snsId:'snsId222',
        
    })

    //post
    await Post.create({
        PostID: 1,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0401',
        title: '카드형 - 공지사항',
        content: 'content',
        isThumbnail:false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 2,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0401',
        title: '카드형 - 공지사항',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 3,
        UserId: 2,
        PTCD: ' P0203',
        PCCD: 'N0401',
        title: '카드형 - 공지사항',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })

    await Post.create({
        PostID: 4,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0402',
        title: '카드형 - 이벤트',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 5,
        UserId: 2,
        PTCD: ' P0203',
        PCCD: 'N0402',
        title: '카드형 - 이벤트',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
    await Post.create({
        PostID: 6,
        UserId: 1,
        PTCD: ' P0203',
        PCCD: 'N0402',
        title: '카드형 - 이벤트',
        content: 'content',
        isThumbnail: false,
        postStartDate: 'postStartDate',
        postEndDate:'postEndDate',
        postDuration:'postDuration',
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
})

module.exports = router;  