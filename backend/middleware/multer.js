const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// 이미지를 저장할 디렉토리 생성
const uploadDirectory = path.join(__dirname, '../images'); //주소 바꿔서 테스트해야함

// 이미지 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    // 업로드된 이미지의 저장 경로 설정
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    const imagePath = `http://61.80.5.166/images/${req.directory1}/${req.directory2}/${filename}`;
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

module.exports = {
  upload: upload
};