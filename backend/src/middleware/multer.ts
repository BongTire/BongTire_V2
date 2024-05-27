import { Request } from 'express';
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';

// Express 요청(Request) 타입 확장
declare global {
  namespace Express {
    interface Request {
      directory1: string; // 예상되는 디렉토리1 경로에 대한 타입
      directory2: string; // 예상되는 디렉토리2 경로에 대한 타입
    }
  }
}

// 이미지를 저장할 디렉토리
const uploadDirectory: string = path.join(__dirname, '../images');

// 이미지 업로드 설정
const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, uploadDirectory);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    // 업로드된 이미지의 저장 경로 설정
    const filename: string = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename); // 파일명 전달
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20 // 20MB 제한
  },
  fileFilter: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    // 콜백 함수 내용
  }
}).single('image');

export default upload;
