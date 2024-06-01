import express, { Request, Response } from 'express';
import path from 'path';
import multer, { MulterError } from 'multer';
import logger from '../../config/logger';
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';
import {returnFormat} from '../../utils/return'
const router = express.Router();

// 이미지를 저장할 기본 디렉토리

// 이미지 업로드 설정 함수
function configureMulter(uploadDirectory: string) {
    // 이미지 저장 경로 설정
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

    return multer({
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
            cb(new Error('Images Only!'));
        }
    }).single('image');
}

router.post('/', isAuthenticatedAdmin, function (req: Request, res: Response) {
    console.log(req.query.image);
    const imagePath = '../../../image/' + req.query.image;
    let imageURL = `http://${process.env.DNS_SERVER_NAME}/images/`
    //저장 경로 설정, 일단 같은 back 폴더 안으로 테스트
    const uploadDirectory = path.join(__dirname, imagePath); //|| defaultUploadDirectory; //디폴트 경로를 설정 하고싶다면,,
    // 이미지 업로드 설정(저장경로 넘겨줌)
    const upload = configureMulter(uploadDirectory);

    // 이미지 업로드 처리
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // multer 에러 처리
            
            const returnFormatData = returnFormat(4000,err.message,[])
            return res.json(returnFormatData);
        } else if (err) {
            // 기타 에러 처리
           
            const returnFormatData = returnFormat(5000,err.message,[])
            return res.json(returnFormatData);
        }

        imageURL = imageURL + req.file?.filename
        const returnFormatData = returnFormat(2000,'이미지를 성공적으로 저장하였습니다.',{file: req.file, imageUrl: imageURL})
        res.json(returnFormatData);
    });
});

router.post('/product', isAuthenticatedAdmin, function (req: Request, res: Response) {
    console.log(req.query.brand);

    const brandCodeName = req.query.brand;
    let imageURL = `http://${process.env.DNS_SERVER_NAME}/images/Product/Brand/` + brandCodeName;

    const imagePath = '../../../image/Product/Brand/' + brandCodeName;
    //저장 경로 설정, 일단 같은 back 폴더 안으로 테스트

    console.log(req.body.image);
    const uploadDirectory = path.join(__dirname, imagePath); //|| defaultUploadDirectory; //디폴트 경로를 설정 하고싶다면,,
    // 이미지 업로드 설정(저장경로 넘겨줌)
    const upload = configureMulter(uploadDirectory);

    // 이미지 업로드 처리
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // multer 에러 처리
            
            const returnFormatData = returnFormat(4000,err.message,[])
            return res.json(returnFormatData);
        } else if (err) {
            // 기타 에러 처리
            const returnFormatData = returnFormat(5000,err.message,[])
            return res.json(returnFormatData);
        }
        imageURL = imageURL + req.file?.filename
        const returnFormatData = returnFormat(2000,'이미지를 성공적으로 저장하였습니다.',{file: req.file, imageUrl: imageURL})
        res.json(returnFormatData);
    });
});

router.post('/car', isAuthenticatedAdmin, function (req: Request, res: Response) {
    console.log(req.params.brand);

    const brandCodeName = req.query.brand;
    let imageURL = `http://${process.env.DNS_SERVER_NAME}/images/PCCD/Car/` + brandCodeName;
    console.log(brandCodeName);

    const imagePath = '../../../image/PCCD/Car/' + brandCodeName;
    //저장 경로 설정, 일단 같은 back 폴더 안으로 테스트
    const uploadDirectory = path.join(__dirname, imagePath); //|| defaultUploadDirectory; //디폴트 경로를 설정 하고싶다면,,
    // 이미지 업로드 설정(저장경로 넘겨줌)
    const upload = configureMulter(uploadDirectory);

    // 이미지 업로드 처리
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // multer 에러 처리
            const returnFormatData = returnFormat(4000,err.message,[])
            return res.json(returnFormatData);
        } else if (err) {
            // 기타 에러 처리
            const returnFormatData = returnFormat(5000,err.message,[])
            return res.json(returnFormatData);
        }
        imageURL = imageURL + req.file?.filename
        const returnFormatData = returnFormat(2000,'이미지를 성공적으로 저장하였습니다.',{file: req.file, imageUrl: imageURL})
        res.json(returnFormatData);
    });
});

router.post('/pccd', isAuthenticatedAdmin, function (req: Request, res: Response) {

    let imageURL = `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car`;

    const imagePath = '../../../image/systemIcon/Car';
    //저장 경로 설정, 일단 같은 back 폴더 안으로 테스트

    console.log(req.body.image);
    const uploadDirectory = path.join(__dirname, imagePath); //|| defaultUploadDirectory; //디폴트 경로를 설정 하고싶다면,,
    // 이미지 업로드 설정(저장경로 넘겨줌)
    const upload = configureMulter(uploadDirectory);

    // 이미지 업로드 처리
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // multer 에러 처리
            const returnFormatData = returnFormat(4000,err.message,[])
            return res.json(returnFormatData);
        } else if (err) {
            // 기타 에러 처리
            const returnFormatData = returnFormat(5000,err.message,[])
            return res.json(returnFormatData);
        }
        imageURL = imageURL + req.file?.filename
        const returnFormatData = returnFormat(2000,'이미지를 성공적으로 저장하였습니다.',{file: req.file, imageUrl: imageURL})
        res.json(returnFormatData);
    });
});

export default router;
