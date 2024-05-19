


var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes, json } = require('sequelize');
const { default: axios } = require('axios');
const { error } = require('console');


// 현재 날짜 정보 가져오기
const today = new Date();
const currentYear = today.getFullYear();

// 주말 여부를 판별하는 함수
const isWeekend = (date) => {
    const day = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    return day === 0 || day === 6; // 일요일 또는 토요일인 경우 주말로 판별
};

// 요일을 한글로 변환하는 함수
const getDayName = (day) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNames[day];
};
const operationTimeCreate = async()=>{
    try {

        console.log('운영시간 저장')
        await OperationTime.create({
            name:'평일',
            type:0,
            startTime:900,
            EndTime:1800,
            reservationInterval:60,
            reservationTime:4,
            isActive:false

        })
        await OperationTime.create({
            name:'공휴일',
            type:1,
            startTime:0,
            EndTime:0,
            reservationInterval:0,
            reservationTime:0,
            isActive:false

        })
        await OperationTime.create({
            name:'주말',
            type:2,
            startTime:900,
            EndTime:1400,
            reservationInterval:60,
            reservationTime:2,
            isActive:false

        })
        await OperationTime.create({
            name:'휴일',
            type:3,
            startTime:0,
            EndTime:0,
            reservationInterval:0,
            reservationTime:0,
            isActive:false

        })
        await OperationTime.create({
            name:'단축 휴일',
            type:4,
            startTime:900,
            EndTime:1300,
            reservationInterval:60,
            reservationTime:4,
            isActive:false

        })
        
    } catch (error) {
        console.error('데이터 저장 중 오류가 발생했습니다:', error);
    }
}
const createCalendarData = async (year) => {
    logger.info(year)
    try {
        const weekdayOperationTimeId= await OperationTime.findOne({
            attributes:['OperationTimeId'],
            where:{
                type:0
            }
        })
        const weekendOperationTimeId= await OperationTime.findOne({
            attributes:['OperationTimeId'],
            where:{
                type:3
            }
        })
        // 각 연도에 대해 1월부터 12월까지 반복하여 캘린더 데이터 생성
        for (let month = 0; month < 12; month++) {
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);

            // 각 달의 첫 번째 날부터 마지막 날까지 반복하여 캘린더 데이터 생성
            for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
                const currentDate = new Date(year, month, day);
                const dayType = isWeekend(currentDate) ? '주말' : '평일';
                let operationTimeId;
                if (dayType === '주말') {
                    operationTimeId = weekendOperationTimeId.OperationTimeId;
                } else {
                    operationTimeId = weekdayOperationTimeId.OperationTimeId;
                }
                await Calendar.create({
                    OperationTimeId: operationTimeId,
                    year: year,
                    month: month + 1,
                    day: day,
                    dayOfWeek: getDayName(currentDate.getDay()), // 요일을 한글로 변환하여 저장
                    isHoliday: false,
                    // dayType 및 holidayName 값은 해당 날짜가 공휴일인 경우에 대한 처리를 추가해야 합니다.
                });
                
            }
        }
        console.log(`${year}년 캘린더 데이터가 성공적으로 생성되었습니다.`);
    } catch (error) {
        console.error('캘린더 데이터 생성 중 오류가 발생했습니다:', error);
    }
};
const holidayAPI =async(number_year,number_month)=>{
    
    const encoding = 'SjsXQWTog%2BGnQJbDp16rBqnRBInCZW4K%2FFculbYDvGdLzdspF1kSDrrjnZRXxH4%2B0nbKccEVxhZURIQJw7QWgQ%3D%3D'
    const decoding = 'SjsXQWTog+GnQJbDp16rBqnRBInCZW4K/FculbYDvGdLzdspF1kSDrrjnZRXxH4+0nbKccEVxhZURIQJw7QWgQ=='
    const url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'
    //let month
    //for(i=1;i<13;i++){
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='+encoding; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /* */
        queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent(number_year); /* */
        // if(i<10){
        //     month = '0'+String(i)
        // }
        queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent(number_month); /* */
        queryParams += '&' + encodeURIComponent('_type')+ '=json'
        let response = await axios.get(url+queryParams,)
        //logger.info(JSON.stringify(response.data.response.body.items.item));
        logger.info(JSON.stringify(response.data));
        //res.json(response.data)
    
        //공휴일 데이터를 캘린더 모델에 저장하는 함수
            const saveHolidaysToCalendar = async () => {
                try {
                    const items = response.data.response.body.items.item;
    
                    if (Array.isArray(items)) {
                        // items가 배열인 경우
                        try {
                            logger.info(number_month)
                            for (const holiday of items) {
                                const locdate = String(holiday.locdate);
                                const year = parseInt(locdate.substring(0, 4));
                                const month = parseInt(locdate.substring(4, 6));
                                const day = parseInt(locdate.substring(6, 8));
        
                                // 캘린더 모델에 데이터 저장
                                await Calendar.update({
                                    dayType: '공휴일',
                                    holidayName: holiday.dateName,
                                },{
                                    where:{
                                        year: year,
                                        month: month,
                                        day: day
                                    }
                                });
                            }
                            logger.info(number_month,'월 공휴일 업데이트가 완료되었습니다')
                            
                            
                        } catch (error) {
                            console.error('데이터 저장 중 오류가 발생했습니다:', error);
                        }
                        
                    } else if (typeof items === 'object') {
                        try {
                            logger.info(number_month)
                            // items가 객체인 경우
                        const locdate = String(items.locdate);
                        const year = parseInt(locdate.substring(0, 4));
                        const month = parseInt(locdate.substring(4, 6));
                        const day = parseInt(locdate.substring(6, 8));
    
                        // 캘린더 모델에 데이터 저장
                        await Calendar.update({
                            dayType: '공휴일',
                            holidayName: items.dateName,
                        },{
                            where:{
                                year: year,
                                month: month,
                                day: day
                            }
                        });
                            
                        } catch (error) {
                            console.error('데이터 저장 중 오류가 발생했습니다:', error);
                        }
                        
                    } else if(!response.data.response.body.items.item){
                        logger.info(number_month)
                        logger.info(number_month,'월은 공휴일이 존재하지 않습니다')
                    }else {
                        // 예외 처리
                        console.error('Invalid format for items');
                    }
                    
                } catch (error) {
                    console.error('데이터 저장 중 오류가 발생했습니다:', error);
                }
            };
            // 함수 호출
            saveHolidaysToCalendar();
    //}

   

    
}
async function generateReservationTimes() {
    try {
        const calendars = await Calendar.findAll({
            where: {
                dayOfWeek: ['월', '화', '수', '목', '금'] // 필터링 조건
            }
        });

        for (const calendar of calendars) {
            const operationTimes = await OperationTime.findAll({
                where: {
                    type: 0 // type이 0인 경우 필터링
                }
            });

            for (const operationTime of operationTimes) {
                let startTime = operationTime.startTime;
                let endTime = operationTime.endTime;
                const intervalMinutes = operationTime.reservationInterval;

                while (startTime < endTime) {
                    const intervalHours = Math.floor(intervalMinutes / 60); // 간격을 시간 단위로 변환
                    const intervalRemainderMinutes = intervalMinutes % 60; // 나머지 분

                    // startTime에 interval을 더할 때 시간과 분을 고려하여 처리
                    let newHours = Math.floor(startTime / 100) + intervalHours;
                    let newMinutes = startTime % 100 + intervalRemainderMinutes;

                    if (newMinutes >= 60) {
                        newHours += 1;
                        newMinutes -= 60;
                    }

                    // endTime 계산
                    let newEndTime = newHours * 100 + newMinutes;

                    // ReservationTime 생성
                    await ReservationTime.create({
                        CalendarId: calendar.CalendarId,
                        OperationTimeId: operationTime.OperationTimeId,
                        startTime: startTime,
                        endTime: newEndTime,
                        numberOfReservation: 0,
                        availableNumberOfReservation: 0,
                        salesThisTime: 0,
                        reservationPossible: true
                    });

                    startTime = newEndTime; // startTime을 업데이트하여 다음 ReservationTime 생성
                }
            }
        }
    } catch (error) {
        console.error('Error generating ReservationTimes:', error);
    }
}

const reservationTimeTable = async()=>{
    

}


router.get('/holiday',async function (req,res){  
    holidayAPI(String(currentYear),'01');
    holidayAPI(String(currentYear),'02');
    holidayAPI(String(currentYear),'03');
    holidayAPI(String(currentYear),'04');
    holidayAPI(String(currentYear),'05');
    holidayAPI(String(currentYear),'06');
    holidayAPI(String(currentYear),'07');
    holidayAPI(String(currentYear),'08');
    holidayAPI(String(currentYear),'09');
    holidayAPI(String(currentYear),'10');
    holidayAPI(String(currentYear),'11');
    holidayAPI(String(currentYear),'12');

    res.send('holiday')

    
})

router.get('/createCalendar',async function(req,res){
    
    // 현재 연도와 내년 연도의 캘린더 데이터 생성
    createCalendarData(currentYear);
    //createCalendarData(currentYear + 1);
})

router.get('/operationTime',async function(req,res){ //영업시간 기본 생성
    operationTimeCreate();
    
})

router.get('/reservationTime',async function(req,res){
    const sampleData = [
        {
            CalendarId: 72,
            OperationTimeId: 1,
            startTime: 900,
            endTime: 1000,
            numberOfReservation:4,
            availableNumberOfReservation: 4,
            reservationPossible: true,
        },
        {
            CalendarId: 72,
            OperationTimeId: 1,
            startTime: 1000,
            endTime: 1100,
            numberOfReservation:4,
            availableNumberOfReservation: 4,
            reservationPossible: true,
        },
        {
            CalendarId: 72,
            OperationTimeId: 1,
            startTime: 1100,
            endTime: 1200,
            numberOfReservation:4,
            availableNumberOfReservation: 4,
            reservationPossible: true,
        },
        {
            CalendarId: 72,
            OperationTimeId: 1,
            startTime: 1200,
            endTime: 1300,
            numberOfReservation:4,
            availableNumberOfReservation: 4,
            reservationPossible: true,
        },
        {
            CalendarId: 72,
            OperationTimeId: 1,
            startTime: 1300,
            endTime: 1400,
            numberOfReservation:4,
            availableNumberOfReservation: 4,
            reservationPossible: true,
        },
        {
            CalendarId: 72,
            OperationTimeId: 1,
            startTime: 1400,
            endTime: 1500,
            numberOfReservation:4,
            availableNumberOfReservation: 4,
            reservationPossible: true,
        }
        
    ];
    await ReservationTime.bulkCreate(sampleData);
})

router.get('/setting',async function(req,res){
    try {
        // /operationTime 요청
        await operationTimeCreate();
        // /createCalendar 요청
        await createCalendarData(currentYear);
        // /holiday 요청
        
        // await holidayAPI(String(currentYear),'01');
        // await holidayAPI(String(currentYear),'02');
        // await holidayAPI(String(currentYear),'03');
        // await holidayAPI(String(currentYear),'04');
        // await holidayAPI(String(currentYear),'05');
        // await holidayAPI(String(currentYear),'06');
        // await holidayAPI(String(currentYear),'07');
        // await holidayAPI(String(currentYear),'08');
        // await holidayAPI(String(currentYear),'09');
        // await holidayAPI(String(currentYear),'10');
        // await holidayAPI(String(currentYear),'11');
        // await holidayAPI(String(currentYear),'12');

        // 모든 요청이 완료되면 응답 전송
        res.send('Calender,Operation Setting completed');
    } catch (error) {
        console.error('Error during setting:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;  
