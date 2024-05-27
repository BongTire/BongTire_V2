import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import  sequelize  from './models';
import logger from './config/logger';
import morganMiddleware from './middleware/customMorgan';
import dotenv from 'dotenv';
import db from './models/index';
// 환경 변수 설정
dotenv.config();

// Express 애플리케이션 설정
const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../dist')));

// 세션 설정
app.use(session({
  secret: 'bongtire00!', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    maxAge: 3600000, 
    secure: false, 
    httpOnly: true, 
  },
}));

// body-parser 설정
app.use(bodyParser.urlencoded({ extended: true }));

// CORS 설정
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

// View 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sequelize 연결


(async () => {
  try {
    await db.sequelize.sync({ force: false }); // force: true 일 경우 기존 테이블 삭제 후 재생성
    logger.info('데이터베이스 연결완료');
  } catch (error) {
    logger.error('Error synchronizing database:', error);
  }
})();


// 라우터 설정


// import naverRouter from './routes/auth/naver';
import productRouter from './routes/public/product';
import reservationRouter from './routes/public/reservation';
import localAuthRouter from './routes/auth/local';
import fileUploadRouter from './routes/public/fileUpload';
import commonRouter from './routes/public/common';
import postRouter from './routes/public/post';
import searchRouter from './routes/public/search';

import adminProductTypeRouter from './routes/admin/producttype';
import adminProductRouter from './routes/admin/product';
import adminCarRouter from './routes/admin/car';
import adminFileUploadRouter from './routes/admin/fileUpload';
import adminCommonRouter from './routes/admin/common';
import adminBrandRouter from './routes/admin/brand';
import adminCalendarRouter from './routes/admin/calendar';
import adminReservationRouter from './routes/admin/reservation';
import adminUserRouter from './routes/admin/user';

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/auth/naver', naverRouter);
app.use('/api/product', productRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/auth/local', localAuthRouter);
app.use('/api/file-upload', fileUploadRouter);
app.use('/api/common', commonRouter);
app.use('/api/post', postRouter);
app.use('/api/search', searchRouter);
app.use('/api/admin/producttype', adminProductTypeRouter);
app.use('/api/admin/product', adminProductRouter);
app.use('/api/admin/car', adminCarRouter);
app.use('/api/admin/file-upload', adminFileUploadRouter);
app.use('/api/admin/common', adminCommonRouter);
app.use('/api/admin/brand', adminBrandRouter);
app.use('/api/admin/calendar', adminCalendarRouter);
app.use('/api/admin/reservation', adminReservationRouter);
app.use('/api/admin/user', adminUserRouter);

// 모든 요청에 대해 React 애플리케이션의 인덱스 파일 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// 로그 기록
if (process.env.NODE_ENV === 'production') { 
  app.use(morgan('combined')); // 배포환경이면
} else {
  app.use(morgan('dev')); // 개발환경이면
}

// 서버 실행
app.listen(4000, () => {
  console.log('http://127.0.0.1:4000 app listening on port 4000!');
});
