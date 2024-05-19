var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../models');
const logger = require('../config/logger');


router.get('/ptcd',async function(req,res){
    await PTCD.create({
        
        menuTypeName:'menu',
        menuTypeCode:'menu',
        pageTypeName:'menu',
        PTCD:'M0101'
    })

    await PTCD.create({
       
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'html',
        PTCD:'P0201'
    })
    await PTCD.create({
        
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'card',
        PTCD:'P0202'
    })
    await PTCD.create({
        
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'list',
        PTCD:'P0203'
    })
    await PTCD.create({
       
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'page',
        PTCD:'P0204'
    })

    await PTCD.create({
        
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'lcard',
        PTCD:'P0301'
    })

    await PTCD.create({
       
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'reservation',
        PTCD:'P0401'
    })

    await PTCD.create({
       
        menuTypeName:'page',
        menuTypeCode:'menu',
        pageTypeName:'main',
        PTCD:'M0401'
    })

    
})
router.get('/pccd',async function(req,res){
    await PCCD.create({
      
        firstName: 'menu',
        firstCodeName: 'menu',
        secondName: 'menu',
        secondCodeName: 'menu',
        PCCD: 'M0101',
        icon: 'icon address',
    })
    await PCCD.create({
      
        firstName: 'main',
        firstCodeName: 'main',
        secondName: 'fav',
        secondCodeName: 'fav',
        PCCD: 'M0201',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'main',
        firstCodeName: 'main',
        secondName: 'salesproduct',
        secondCodeName: 'salesproduct',
        PCCD: 'M0202',
        icon: 'icon address',
    })
    await PCCD.create({
    
        firstName: 'intro',
        firstCodeName: 'intro',
        secondName: 'store',
        secondCodeName: 'store',
        PCCD: 'I0301',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'intro',
        firstCodeName: 'intro',
        secondName: 'employee',
        secondCodeName: 'employee',
        PCCD: 'I0302',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'notification',
        firstCodeName: 'notification',
        secondName: 'notification',
        secondCodeName: 'notification',
        PCCD: 'N0401',
        icon: 'icon address',
    })
    await PCCD.create({
     
        firstName: 'notification',
        firstCodeName: 'notification',
        secondName: 'event',
        secondCodeName: 'event',
        PCCD: 'N0402',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'customerservice',
        firstCodeName: 'customerservice',
        secondName: 'qna',
        secondCodeName: 'qna',
        PCCD: 'C0501',
        icon: 'icon address',
    })
    await PCCD.create({
      
        firstName: 'customerservice',
        firstCodeName: 'customerservice',
        secondName: 'fnq',
        secondCodeName: 'fnq',
        PCCD: 'C0502',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'product',
        firstCodeName: 'product',
        secondName: 'tire',
        secondCodeName: 'tire',
        PCCD: 'P0601',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'product',
        firstCodeName: 'product',
        secondName: 'wheel',
        secondCodeName: 'wheel',
        PCCD: 'P0602',
        icon: 'icon address',
    })
    await PCCD.create({
    
        firstName: 'car',
        firstCodeName: 'car',
        secondName: 'ice',
        secondCodeName: 'ice',
        PCCD: 'C0701',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'car',
        firstCodeName: 'car',
        secondName: 'hev',
        secondCodeName: 'hev',
        PCCD: 'C0702',
        icon: 'icon address',
    })
    
    await PCCD.create({
     
        firstName: 'car',
        firstCodeName: 'car',
        secondName: 'phev',
        secondCodeName: 'phev',
        PCCD: 'C0703',
        icon: 'icon address',
    })
    await PCCD.create({
    
        firstName: 'car',
        firstCodeName: 'car',
        secondName: 'ev',
        secondCodeName: 'ev',
        PCCD: 'C0704',
        icon: 'icon address',
    })
    await PCCD.create({
       
        firstName: 'car',
        firstCodeName: 'car',
        secondName: 'hydrogen',
        secondCodeName: 'hydrogen',
        PCCD: 'C0705',
        icon: 'icon address',
    })
    await PCCD.create({
      
        firstName: 'reservation',
        firstCodeName: 'reservation',
        secondName: 'reservation-1지점',
        secondCodeName: 'reservation',
        PCCD: 'R0801',
        icon: 'icon address',
    })
    await PCCD.create({
      
        firstName: 'filter',
        firstCodeName: 'filter',
        secondName: 'wheel',
        secondCodeName: 'wheel',
        PCCD: 'F0901',
        icon: 'icon address',
    })
    await PCCD.create({
     
        firstName: 'filter',
        firstCodeName: 'filter',
        secondName: 'tire',
        secondCodeName: 'tire',
        PCCD: 'F0902',
        icon: 'icon address',
    })

})

router.get('/PCCDBrandConnectionTable',async function(req,res){
    await PCCDBrandConnectionTable.create({
        PageCategoryId:10,
        BrandId:0,

    })
    await PCCDBrandConnectionTable.create({
        PageCategoryId:10,
        BrandId:1,

    })
    await PCCDBrandConnectionTable.create({
        PageCategoryId:10,
        BrandId:2,

    })
})
router.get('/user',async function(req,res){
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

})
router.get('/brand',async function(req,res){
    const P0601 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"P0601"
        }
    })
    const P0602 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"P0602"
        }
    })
    const C0701 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"C0701"
        }
    })
    const C0702 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"C0702"
        }
    })
    const C0703 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"C0703"
        }
    })
    const C0704 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"C0704"
        }
    })
    const C0705 =  await PCCD.findOne({
        attributes:["PCCDId"],
        where:{
            PCCD:"C0705"
        }
    })
    //console.log(C0701,C0702,C0703,C0704,C0705)

    const brand1 = await Brand.create({ 
        name: '타이어 가게 1',
        brandLogo: '브랜드 로고 저장 주소',
        origin: true,
        nation:'KR'
    })
    
    const brand2 = await Brand.create({
        name: '타이어 가게 2',
        brandLogo: '브랜드 로고 저장 주소',
        origin: false,
        nation:'JPN'
    })
    
    const brand3 = await Brand.create({
        name: '자동차 가게 1',
        brandLogo: '브랜드 로고 저장 주소',
        origin: false,
        nation:'독일'
    })
    
    const brand4 = await Brand.create({
        name: '자동차 가게 2',
        brandLogo: '브랜드 로고 저장 주소',
        origin: true,
        nation:'KR'
    })
    
    const brand5 = await Brand.create({
        name: '자동차 가게 3',
        brandLogo: '브랜드 로고 저장 주소',
        origin: true,
        nation:'KR'
    })
    const carPCCD = C0701.PCCDId+","+C0702.PCCDId+","+C0703.PCCDId+","+C0704.PCCDId+","+C0705.PCCDId
    console.log(typeof(carPCCD))
    

    await PCCDBrandConnectionTable.create({
        PCCDId:P0601.PCCDId,
        BrandId:parseInt(brand1.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:P0601.PCCDId,
        BrandId:parseInt(brand2.BrandId)
    })

    
    await PCCDBrandConnectionTable.create({
        PCCDId:C0701.PCCDId,
        BrandId:parseInt(brand3.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0702.PCCDId,
        BrandId:parseInt(brand3.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0703.PCCDId,
        BrandId:parseInt(brand3.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0704.PCCDId,
        BrandId:parseInt(brand3.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0705.PCCDId,
        BrandId:parseInt(brand3.BrandId)
    })

    await PCCDBrandConnectionTable.create({
        PCCDId:C0701.PCCDId,
        BrandId:parseInt(brand4.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0702.PCCDId,
        BrandId:parseInt(brand4.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0703.PCCDId,
        BrandId:parseInt(brand4.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0704.PCCDId,
        BrandId:parseInt(brand4.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0705.PCCDId,
        BrandId:parseInt(brand4.BrandId)
    })


    await PCCDBrandConnectionTable.create({
        PCCDId:C0701.PCCDId,
        BrandId:parseInt(brand5.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0702.PCCDId,
        BrandId:parseInt(brand5.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0703.PCCDId,
        BrandId:parseInt(brand5.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0704.PCCDId,
        BrandId:parseInt(brand5.BrandId)
    })
    await PCCDBrandConnectionTable.create({
        PCCDId:C0705.PCCDId,
        BrandId:parseInt(brand5.BrandId)
    })




})
router.get('/tire',async function(req,res){

    await Tire.create({
        TireId: 1,
        BrandId: 1,
        PCCD: 'P0601',
        DrivingMethodPCCD: '?',
        m_code: '1033209',
        product_name: '아이온 스포츠 올시즌',
        tire_size: '265/35R21',
        price: 516000,
        amount:10,
        discountRate: 0,
        discountPrice:0,
        image: '이미지 저장 주소',
        patternCode: 'ION EVO AS',
        maxSpeed: 101,
        maxWeight: 100,
        origin:'KR',
        xl: 'XL',
        ply:'4',
        numberOfDataUpdate: 2,
        sales: 2,
        viewers:10,
        isSecond: false,
        content:'설명',
        feature: '특징',
        isActive: true,
        isVisible:true,
        isContinue:true,
    })

})

router.get('/post',async function(req,res){

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
        postDuration:1,
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
        postDuration:2,
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
        postDuration:1,
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
        postDuration:1,
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
        postDuration:2,
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
        postDuration:1,
        isPin: false,
        isActive: false,
        isAnswer:false,
        answer: 'answer',
        viewers: '2',
        date: Date.now(),
        isSecret: false,
    })
})

router.get('/all',async function(req,res){
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