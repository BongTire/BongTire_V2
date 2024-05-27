import express, { Request, Response } from 'express';
import path from 'path';
import multer, { MulterError } from 'multer';
import logger from '../../config/logger';
import {returnFormat} from '../../utils/return'

const router = express.Router();

const imageURL = `http://${process.env.DNS_SERVER_NAME}/images/`;
const imagePath = '../../../image/Posts'; // Ensure this directory exists

// Directory where images will be saved
const uploadDirectory = path.join(__dirname, imagePath);

// Image upload settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20 // 20MB limit
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

router.post('/', (req: Request, res: Response) => {
  const imageUrl = `http://${process.env.DNS_SERVER_NAME}/images/Posts/`;
  try {
    upload(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.json({ status:4000,error: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.json({ status:5000,error: `Error: ${err.message}` });
    }

    res.status(200).json({ message: '이미지를 성공적으로 저장하였습니다.', file: req.file, imageUrl });
  });
  } catch (e) {
    logger.error(e);
    res.json({ status:5000,error: 'Internal Server Error' });
  }

  
});

router.post('/post', (req: Request, res: Response) => {
  const imageUrl = `http://${process.env.DNS_SERVER_NAME}/images/Posts/`;

  try {
    upload(req, res, (err) => {
      if (err instanceof MulterError) {
        return res.json({ error: `Multer Error: ${err.message}` });
      } else if (err) {
        return res.json({ error: `Error: ${err.message}` });
      }

      res.status(200).json({ message: '이미지를 성공적으로 저장하였습니다.', file: req.file, imageURL: imageUrl });
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
