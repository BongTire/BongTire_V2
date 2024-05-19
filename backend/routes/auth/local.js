const session = require('express-session');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')

// 이메일 유효성 확인 함수
async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// JWT 생성 함수
function generateToken(user) {
    const payload = {
        user: {
            id: user.UserId,
            email: user.email,
            number: user.number
        }
    };
    return jwt.sign(payload, 'secret', { expiresIn: '1h' });
}
// - 제거 함수
function removeHyphen(number) {
    return number.replace(/-/g, ''); // 정규식을 사용하여 모든 - 제거
}
// 회원가입
router.post('/signup', async (req, res) => {
    const { number, address, email, name, password } = req.body.data;

    try {
        // 입력 데이터 검증
        if (!number || !address || !name || !password|| !email) {
            return res.status(400).json({ msg: '필수 정보가 누락되었습니다.' });
        }

        // 이메일 유효성 확인
        const isValidEmail = await validateEmail(email);
        if (!isValidEmail) {
            return res.status(400).json({ msg: '유효하지 않은 이메일 형식입니다.' });
        }

        // 이메일 중복 확인
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: '이미 존재하는 이메일입니다.' });
        }

        // 비밀번호 보안 강화: 강력한 비밀번호 조건 적용 (문자와 숫자 포함)
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ msg: '비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자,특수문자를 포함해야 합니다.' });
        }
        // - 제거
        const cleanedNumber = removeHyphen(number);

        // 비밀번호 암호화
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 사용자 생성 및 저장
        const newUser = await User.create({
            number:number,
            address:address,
            email:email,
            name:name,
            password: hashedPassword,
            grade: 0,
            platform: 'local',
            isBlack: false,
            snsId: ''
        });

        // JWT 생성 및 응답
        const token = generateToken(newUser);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('서버 오류');
    }
});



// 로그인
router.post('/login', async (req, res) => {
    const { email, password } = req.body.data;
    console.log(email,password)
    //logger.info(req)

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: '이메일과 비밀번호를 모두 입력해주세요.' });
        }

        const user = await User.findOne({ 
            where: { 
                email:email
            } 
        });
        //console.log(JSON.stringify(user))

        if (!user) {
            return res.status(400).json({ msg: '존재하지 않는 사용자입니다.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: '잘못된 비밀번호입니다.' });
        }
        console.log("user.UserId: ",user.UserId)

        // 세션에 사용자 정보 저장
        req.session.userId = user.UserId;
        req.session.email = user.email;
        req.session.grade = user.grade;
        //console.log(req.session)

        res.status(200).json({ msg: '로그인 성공', user: { email: user.email,userId:user.UserId,name:user.name,grade:user.grade } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('서버 오류');
    }
});
// 로그아웃
router.post('/logout',isAuthenticatedUser, (req, res) => {
    try {
        // 세션에서 특정 속성만 삭제
        delete req.session.userId;
        delete req.session.email;
        delete req.session.grade;

        res.status(200).json({ message: '로그아웃을 성공했습니다.' });
    } catch (err) {
        console.error('로그아웃 중 오류가 발생했습니다:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});


router.get('/logintest',isAuthenticatedUser,(req,res)=>{
    console.log(req.session)
    res.json({ msg: '이곳은 보호된 영역입니다.', email: req.session.email,grade:req.session.grade });
})

module.exports = router;
