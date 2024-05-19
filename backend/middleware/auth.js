const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');


// JUST USER 로그인 여부 확인
const isAuthenticatedUser = (req, res, next) => {
    if (req.session && req.session.userId) {
        console.log(req.session.userId)
      // 로그인된 사용자인 경우
      return next(); // 다음 미들웨어 또는 엔드포인트로 진행
    } else {
      // 로그인이 안 된 경우
      return res.status(401).json({ 
        code: 4001,
        message: '로그인이 필요합니다.' }); // 401 Unauthorized
    }
};

// ANDMIN 로그인 여부 확인
const isAuthenticatedAdmin = (req, res, next) => {
    if (req.session && req.session.userId) {
        // 로그인된 사용자인 경우
        console.log(req.session.userId)
        if(req.session.grade == 0){
            //grade가 어드민
            console.log(req.session.grade)
            return next(); // 다음 미들웨어 또는 엔드포인트로 진행
        }else{
            return res.status(401).json({ code: 4003, msg: '관리자가 아닙니다.' }); // 401 Unauthorized
        }
      
      
    } else {
      // 로그인이 안 된 경우
      return res.status(401).json({ code: 4001, msg: '로그인이 필요합니다.' }); // 401 Unauthorized
    }
  };


module.exports = {
    isAuthenticatedUser: isAuthenticatedUser,
    isAuthenticatedAdmin:isAuthenticatedAdmin

};