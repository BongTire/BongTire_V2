import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';
//import { BestSellProduct, Brand, Calendar, Car, CarHashTagConnection, CarTrim, Filter, HashTag, Menu, OperationTime, OtherproductHashTagConnection, OwnCar, Page, PCCD, PCCDBrandConnectionTable, Post, Product, PTCD, ReservationMaster, ReservationProduct, ReservationTime, Revenue, Tire, TireHashTagConnection, User, Wheel, WheelHashTagConnection } from '../../models';
import logger from '../../config/logger';
import db from '../../models'
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';
import { IUser } from '../../types/service/user';

const router = express.Router();

// 이메일 유효성 확인 함수
async function validateEmail(email: string): Promise<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 세션 인터페이스 확장
declare module 'express-session' {
    interface SessionData {
        userId: number;
        email: string;
        grade: number;
        name: string;
    }
}

// 회원가입
router.post('/signup', async (req: Request, res: Response) => {
    const { number, address, email, name, password } = req.body.data;

    try {
        // 입력 데이터 검증
        if (!number || !address || !name || !password || !email) {
            return res.status(400).json({ msg: '필수 정보가 누락되었습니다.' });
        }

        // 이메일 유효성 확인
        const isValidEmail = await validateEmail(email);
        if (!isValidEmail) {
            return res.status(400).json({ msg: '유효하지 않은 이메일 형식입니다.' });
        }

        // 이메일 중복 확인
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: '이미 존재하는 이메일입니다.' });
        }

        // 비밀번호 보안 강화: 강력한 비밀번호 조건 적용 (문자와 숫자 포함)
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ msg: '비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.' });
        }

        // 비밀번호 암호화
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 사용자 생성 및 저장
        const newUser = await db.User.create({
            number: number,
            address: address,
            email: email,
            name: name,
            password: hashedPassword,
            grade: 0,
            platform: 'local',
            isBlack: false,
            snsId: ''
        });

        res.json(newUser);
        res.json({
            status:{
                code:2000,
                messeage:'회원가입에 성공하였습니다.'
            },
            data:{}
        })
    } catch (err ) {
        const error = err as Error
        logger.error(error);
        res.json({
            status:{
                code:5000,
                messeage:'회원가입에 실패하였습니다.'
            },
            data:{}
        })
    }
});

// 로그인
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body.data;
    console.log(email, password);

    try {
        if (!email || !password) {
            return res.json({
                status:{
                    code:4000,
                    messeage:'이메일과 비밀번호를 모두 입력해주세요.'
                },
                data:{}
            })
            
        }

        const user = await db.User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.json({
                status:{
                    code:4000,
                    messeage:'존재하지 않는 사용자입니다.'
                },
                data:{}
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                status:{
                    code:4000,
                    messeage:'잘못된 비밀번호입니다.'
                },
                data:{}
            })
        }

        // 세션에 사용자 정보 저장
        req.session.userId = user.UserId;
        req.session.email = user.email;
        req.session.grade = user.grade;
        res.json({
            status:{
                code:2000,
                messeage:'로그인에 성공하였습니다.'
            },
            data:{
                email:user.email,
                UserId: user.UserId,
                name:user.name,
                grade:user.grade
            }
        })

    } catch (err) {
        const error = err as Error
        logger.error(error);

        res.json({
            status:{
                code:5000,
                messeage:'로그인에 실패하였습니다.'
            },
            data:{}
        })
    }
});

// 로그아웃
router.post('/logout', isAuthenticatedUser, (req: Request, res: Response) => {
    try {
        // 세션에서 특정 속성만 삭제
        delete req.session.userId;
        delete req.session.email;
        delete req.session.grade;

        res.json({
            status:{
                code:2000,
                messeage:'로그아웃을 성공했습니다.'
            },
            data:{}
        })
    } catch (err) {
        const error = err as Error
        logger.error('로그아웃 중 오류가 발생했습니다:', error);
        res.json({
            status:{
                code:5000,
                messeage:'로그아웃에 실패하였습니다.'
            },
            data:{}
        })
    }
});

// 로그인 테스트
router.get('/logintest', isAuthenticatedUser, (req: Request, res: Response) => {
    console.log(req.session);
    res.json({
        status:{
            code:2000,
            messeage:'이곳은 보호된 영역입니다.'
        },
        data:{email: req.session.email, grade: req.session.grade}
    })
});

export default router;
