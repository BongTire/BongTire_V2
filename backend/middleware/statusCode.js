var express = require('express');

function getStatus(statusCode) {
    let message;
    switch (statusCode) {
        case 1000:
            message = 'Continue';
            break;
        case 1010:
            message = 'Switching Protocols';
            break;

    //요청 성공
        case 2000: //요청 성공적
            message = 'OK';
            break;
        case 2001: //데이터 생성 성공적
            message = 'Created';
            break;
        case 2002: 
            message = 'Accepted';
            break;
        case 2003:
            message = 'Non-Authoritative Information';
            break;
        case 2004:
            message = 'No Content';
            break;
        case 2005:
            message = 'Reset Content';
            break;
        case 2006:
            message = 'Partial Content';
            break;

        //new
        //2100번대 / 카테고리: 
        case 2100: //
            message = '';
            break;

        //2200번대 / 카테고리: 
        case 2200: //
            message = '';
            break;

        //2300번대 / 카테고리: 
        case 2300: //
            message = '';
            break;      

    //추가 조치가 필요한 상황
        //기본
        case 3000:
            message = 'Multiple Choices';
            break;
        case 3001: //요청한 리소스가 영구적으로 새로운 위치로 이동되어있음
            message = 'Moved Permanently';
            break;
        case 3002: //요청한 리소스가 임시적으로 새로운 위치로 이동되어있음
            message = 'Found';
            break;
        case 3003:
            message = 'See Other';
            break;
        case 3004:
            message = 'Not Modified';
            break;
        case 3005:
            message = 'Use Proxy';
            break;
        case 3007:
            message = 'Temporary Redirect';
            break;

        //new

    //요청 오류
        //기본
        case 4000: //요청 잘못됨
            message = 'Bad Request';
            break;
        case 4001: //인증 필요
            message = 'Unauthorized';
            break;
        case 4002:
            message = 'Payment Required';
            break;
        case 4003: //서버에 의해 거부
            message = 'Forbidden';
            break;
        case 4004: //요청한 리소스 찾을 수 없음
            message = 'Not Found';
            break;
        case 4005: //요청된 메서드 허용안됨
            message = 'Method Not Allowed';
            break;
        case 4006: 
            message = 'Not Acceptable';
            break;
        case 4007:
            message = 'Proxy Authentication Required';
            break;
        case 4008:
            message = 'Request Timeout';
            break;
        case 4009:
            message = 'Conflict';
            break;
        case 4010: //요청한 리소스가 더이상 서버에 없음
            message = 'Gone';
            break;
        case 4011:
            message = 'Length Required';
            break;
        case 4012:
            message = 'Precondition Failed';
            break;
        case 4013:
            message = 'Payload Too Large';
            break;
        case 4014:
            message = 'URI Too Long';
            break;
        case 4015:
            message = 'Unsupported Media Type';
            break;
        case 4016:
            message = 'Range Not Satisfiable';
            break;
        case 4017:
            message = 'Expectation Failed';
            break;

        //4100번대 / 카테고리: 
        case 4100: //
            message = '';
            break;
        
        //4200번대 / 카테고리: 
        case 4200: //
            message = '';
            break;
        
        //4300번대 / 카테고리: 
        case 4300: //
            message = '';
            break;

        //4400번대 / 카테고리: 
        case 4400: //
            message = '';
            break;

        //4500번대 / 카테고리: 
        case 4500: //
            message = '';
            break;
    //서버 에러
        //기존 statusCode
        case 5000:
            message = 'Internal Server Error';
            break;
        case 5001:
            message = 'Not Implemented';
            break;
        case 5002:
            message = 'Bad Gateway';
            break;
        case 5003:
            message = 'Service Unavailable';
            break;
        case 5004:
            message = 'Gateway Timeout';
            break;
        case 5005:
            message = 'HTTP Version Not Supported';
            break;

        //5100번대 / 카테고리: 
        case 5100: //예약 제외 데이터 저장시 오류
            message = "Failed to save the data to the database.";
            break;
        case 5101: //예약 데이터 저장시 오류
            message = "Failed to save the reservation data to the database.";
            break;
        case 5102: //
            message = "Failed to save the data to the database.";
            break;
        default:
            message = 'Unknown Status';
            break;
    }
    return {
        code: statusCode,
        message: message
    };
}

module.exports = {
    getStatus: getStatus
};