var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');
const multer = require('multer');
const path = require('path');

/* 
주소: /api/fileUpload

데이터 보낼때:  Key - image, value - 이미지 파일

리턴값:
{
    "message": "이미지를 성공적으로 저장하였습니다.",
    "file": {
        "fieldname": "image",
        "originalname": "스크린샷 2024-03-24 오후 7.37.48.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "destination": "/Users/young/young/BongTire_App/BongTire_back/file",
        "filename": "image-1712848307144.png",
        "path": "/Users/young/young/BongTire_App/BongTire_back/file/image-1712848307144.png",
        "size": 923154
    }
}
*/
const iamgeURL = `http://${process.env.DNS_SERVER_NAME}/images/`;
const imagePath = `../../image/Posts` //file 폴더를 직접 생성해야함

// 이미지를 저장할 디렉토리
const uploadDirectory = path.join(__dirname, imagePath); //주소 바꿔서 테스트해야함

// 이미지 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    // 업로드된 이미지의 저장 경로 설정
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20 // 20MB 제한
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Images Only!');
  }
}).single('image');

router.post('/', function (req, res) {
  const imageUrl = `http://${process.env.DNS_SERVER_NAME}/images/Posts/`;

  // URL로 공통 path를 반영하고, 세부 PATH는 query로, 변경할 imageName도 query로 담당하기

  console.log(req.query.path)
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // multer 에러 처리
        return res.status(400).json({ error: 'Multer Error: ' + err.message });
      } else if (err) {
        // 기타 에러 처리
        return res.status(500).json({ error: 'Error: ' + err.message });
      }

      // 파일 업로드 성공
      // 여기서 파일 정보는 req.file에서 접근 가능
      // 예를 들어, 파일 경로는 req.file.path에서 접근 가능

      // 업로드 성공 시 원하는 로직을 수행
      res.status(200).json({ message: '이미지를 성공적으로 저장하였습니다.', file: req.file, imageUrl: imageUrl });
    });
  });

  router.post('/post', function (req, res) {
    const imageUrl = `http://${process.env.DNS_SERVER_NAME}/images/Posts/`;
  
    // URL로 공통 path를 반영하고, 세부 PATH는 query로, 변경할 imageName도 query로 담당하기
  
    console.log(req.query.path)
    try{
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // multer 에러 처리
          return res.json({ error: 'Multer Error: ' + err.message });
        } else if (err) {
          // 기타 에러 처리
          return res.json({ error: 'Error: ' + err.message });
        }
  
        // 파일 업로드 성공
        // 여기서 파일 정보는 req.file에서 접근 가능
        // 예를 들어, 파일 경로는 req.file.path에서 접근 가능
  
        // 업로드 성공 시 원하는 로직을 수행
        res.status(200).json({ message: '이미지를 성공적으로 저장하였습니다.', file: req.file, imageURL: imageUrl });
      });
    }catch(e){
      console.error(e)
    }
      
  });


  module.exports = router;