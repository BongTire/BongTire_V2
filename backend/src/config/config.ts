import dotenv from 'dotenv';
import path from 'path';

// .env 파일에서 환경 변수를 로드
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: string;
  dialect: 'mysql';
}

interface IConfig {
  [key: string]: IDatabaseConfig;  // 인덱스 시그니처 추가
}

const config: IConfig = {
  development: {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '',
    port: '3306',
    dialect: 'mysql',
  },
};

export default config;
