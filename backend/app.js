require("dotenv").config();
const session = require('express-session');
var express = require('express');
var app = express();
var path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// const redis = require('redis');
var sequelize = require('./models').sequelize;
const logger = require('./config/logger');
const morganMiddleware = require('./middleware/customMorgan');

app.use(express.static(path.join(__dirname, './dist')));

app.use(
  session({
      secret: 'bongtire00!', // 세션에 사용할 비밀 키
      resave: false, // 세션을 변경하지 않은 경우에도 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      cookie: {
          maxAge: 3600000, // 세션 유효기간 (밀리초)
          secure: false, // HTTPS 환경에서만 사용하려면 true
          httpOnly: true, // JavaScript에서 접근할 수 없는 쿠키
      },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));


let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

sequelize.sync();


const indexRouter = require('./routes/index');
//const kakaoRouter = require('./routes/auth/kakao');


app.use(morganMiddleware)
// JSON 형식의 데이터 파싱
app.use(express.json());

// URL-encoded 데이터 파싱
app.use(express.urlencoded({ extended: false }));

app.use('/',indexRouter);

app.use('/input',require('./routes/input'));

app.use('/auth/naver',require('./routes/auth/naver'));
//app.use('/auth/kakao',kakaoRouter);

// Client API URL
app.use('/api/product',require('./routes/public/product'));
app.use('/api/menu',require('./routes/public/menu'));
app.use('/api/reservation',require('./routes/public/reservation'));
app.use('/api/calendar',require('./routes/public/calendar'));
app.use('/api/auth/local',require('./routes/auth/local'));
app.use('/api/file-upload',require('./routes/public/fileUpload'))
app.use('/api/card',require('./routes/public/card'));
app.use('/api/list',require('./routes/public/list'));
app.use('/api/common', require('./routes/public/common'))
app.use('/api/post', require('./routes/public/post'))
app.use('/api/search', require('./routes/public/search'))

// Admin API URL
app.use('/api/admin/main',require('./routes/admin/main'));
app.use('/api/admin/producttype',require('./routes/admin/producttype'));
app.use('/api/admin/menu',require('./routes/admin/menu'));
app.use('/api/admin/product',require('./routes/admin/product'));
app.use('/api/admin/car',require('./routes/admin/car'));
app.use('/api/admin/file-upload',require('./routes/admin/fileUpload'));
app.use('/api/admin/common', require('./routes/admin/common'));
app.use('/api/admin/brand' ,require('./routes/admin/brand'))
app.use('/api/admin/calendar',require('./routes/admin/calendar'))
app.use('/api/admin/reservation',require('./routes/admin/reservation'))
app.use('/api/admin/user', require('./routes/admin/user'))

// 모든 요청에 대해 React 애플리케이션의 인덱스 파일 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});




// 로그 기록
if (process.env.NODE_ENV === 'production') { 
  app.use(morgan('combined')); // 배포환경이면
} else {
  app.use(morgan('dev')); // 개발환경이면
}

//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//   legacyMode: true, // 반드시 설정 !!
// });
// redisClient.on('connect', () => {
//   console.info('Redis connected!');
// });
// redisClient.on('error', (err) => {
//   console.error('Redis Client Error', err);
// });
// redisClient.connect().then(); // redis v4 연결 (비동기)
// const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용


 app.listen(4000, function () {
   console.log('http://127.0.0.1:4000/naverlogin app listening on port 4000!');
 });

