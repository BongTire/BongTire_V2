require('dotenv').config(); // .env 파일에서 환경 변수를 로드하기 위해 dotenv 패키지 사용

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: '3306',
    dialect: 'mysql'
  }
};