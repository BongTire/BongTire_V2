var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection, sequelize}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes, Op } = require('sequelize');
const { default: axios } = require('axios');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')


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
            startTime:800,
            endTime:1800,
            reservationInterval:60,
            reservationTime:5,
            isActive:false

        })
        await OperationTime.create({
            name:'토',
            type:1,
            startTime:800,
            endTime:1600,
            reservationInterval:60,
            reservationTime:5,
            isActive:false

        })
        await OperationTime.create({
            name:'공휴일',
            type:2,
            startTime:1000,
            endTime:1600,
            reservationInterval:60,
            reservationTime:5,
            isActive:false

        })
        
        await OperationTime.create({
            name:'휴일',
            type:3,
            startTime:0,
            endTime:0,
            reservationInterval:0,
            reservationTime:0,
            isActive:false

        })
        await OperationTime.create({
            name:'단축 휴일',
            type:4,
            startTime:900,
            endTime:1300,
            reservationInterval:60,
            reservationTime:5,
            isActive:false
        })
        
    } catch (error) {
        console.error('데이터 저장 중 오류가 발생했습니다:', error);
    }
}

const createCalendarData = async (year) => {
    logger.info(year);
    
    try {
        const weekdayOperationTimeId = await OperationTime.findOne({
            attributes: ['OperationTimeId'],
            where: {
                name: '평일',
            },
        });
        const weekendOperationTimeId = await OperationTime.findOne({
            attributes: ['OperationTimeId'],
            where: {
                name: '토',
            },
        });
        const holidayOperationTimeId = await OperationTime.findOne({
            attributes: ['OperationTimeId'],
            where: {
                name: '휴일',
            },
        });

        // 주말을 토요일과 일요일로 구분하는 함수
function getDayType(day) {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[day];

    if (dayName === "토") {
        return "토요일";
    } else if (dayName === "일") {
        return "일요일";
    } else {
        return "평일";
    }
}

// 각 연도에 대해 1월부터 12월까지 반복하여 캘린더 데이터 생성
for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 각 달의 첫 번째 날부터 마지막 날까지 반복하여 캘린더 데이터 생성
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const currentDate = new Date(year, month, day);
        const dayOfWeek = currentDate.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
        const dayType = getDayType(dayOfWeek); // '토요일', '일요일', '평일'
        
        let operationTimeId;
        if (dayType === "토요일") {
            operationTimeId = weekendOperationTimeId.OperationTimeId;
        } else if (dayType === "일요일") {
            operationTimeId = holidayOperationTimeId.OperationTimeId;
        } else {
            operationTimeId = weekdayOperationTimeId.OperationTimeId;
        }

        // 데이터가 이미 존재하는지 확인
        const existingRecord = await Calendar.findOne({
            where: {
                year,
                month: month + 1,
                day,
            },
            raw: true,
        });

        // 데이터가 없을 경우에만 생성
        if (!existingRecord) {
            await Calendar.create({
                OperationTimeId: operationTimeId,
                year,
                month: month + 1,
                day,
                dayOfWeek: getDayName(dayOfWeek), // 요일을 한글로 변환하여 저장
                isHoliday: false,
            });
        } else {
            console.log(`${year}년 ${month + 1}월 ${day}일 캘린더 데이터가 이미 존재합니다.`);
        }
    }
}

        console.log(`${year}년 캘린더 데이터가 성공적으로 생성되었습니다.`);
    } catch (error) {
        console.error('캘린더 데이터 생성 중 오류가 발생했습니다:', error);
    }
};

const holidayAPI =async(number_year)=>{
    
    const encoding = 'SjsXQWTog%2BGnQJbDp16rBqnRBInCZW4K%2FFculbYDvGdLzdspF1kSDrrjnZRXxH4%2B0nbKccEVxhZURIQJw7QWgQ%3D%3D'
    const decoding = 'SjsXQWTog+GnQJbDp16rBqnRBInCZW4K/FculbYDvGdLzdspF1kSDrrjnZRXxH4+0nbKccEVxhZURIQJw7QWgQ=='
    const url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'
    const holidayOperationTime = await OperationTime.findOne({
        attributes:['OperationTimeId'],
        where:{
            name:'공휴일'
        }
    })
    let string_month
    for(i=1;i<13;i++){
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='+encoding; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /* */
        queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent(number_year); /* */
        if(i<10){
            string_month = '0'+String(i)
        }else{
            string_month = String(i)
        }
        queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent(string_month); /* */
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
                            
                            for (const holiday of items) {
                                const locdate = String(holiday.locdate);
                                const year = parseInt(locdate.substring(0, 4));
                                const month = parseInt(locdate.substring(4, 6));
                                const day = parseInt(locdate.substring(6, 8));
                                logger.info(month)
        
                                // 캘린더 모델에 데이터 저장
                                await Calendar.update({
                                    dayType: '공휴일',
                                    holidayName: holiday.dateName,
                                    OperationTimeId:holidayOperationTime.OperationTimeId,
                                    isHoliday:true
                                },{
                                    where:{
                                        year: year,
                                        month: month,
                                        day: day
                                    }
                                });
                            }
                            logger.info(string_month,'월 공휴일 업데이트가 완료되었습니다')
                            
                            
                        } catch (error) {
                            console.error('데이터 저장 중 오류가 발생했습니다:', error);
                        }
                        
                    } else if (typeof items === 'object') {
                        try {
                            
                            // items가 객체인 경우
                        const locdate = String(items.locdate);
                        const year = parseInt(locdate.substring(0, 4));
                        const month = parseInt(locdate.substring(4, 6));
                        const day = parseInt(locdate.substring(6, 8));
                        logger.info(month)
    
                        // 캘린더 모델에 데이터 저장
                        await Calendar.update({
                            dayType: '공휴일',
                            holidayName: items.dateName,
                            OperationTimeId:holidayOperationTime.OperationTimeId,
                            isHoliday:true
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
                        
                        logger.info(string_month,'월은 공휴일이 존재하지 않습니다')
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
    }

   

    
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


router.get('/holiday',isAuthenticatedAdmin,async function (req,res){  
    holidayAPI(String(currentYear));
    

    res.send('holiday')

    
})

router.get('/create',isAuthenticatedAdmin,async function(req,res){
    
    // 현재 연도와 내년 연도의 캘린더 데이터 생성
    createCalendarData(currentYear);
    //createCalendarData(currentYear + 1);
})

router.get('/operationTime',isAuthenticatedAdmin,isAuthenticatedAdmin,async function(req,res){ //영업시간 기본 생성
    operationTimeCreate();
    
})
router.get('/reservationTime',isAuthenticatedAdmin, async function(req, res) {
    
    try {
        // Calendar 객체에서 OperationId가 0인 모든 객체를 가져옵니다.
        const weekdayIds = await Calendar.findAll({
            attributes: ['CalendarId'], // CalendarId만 가져오기
            where: {
                OperationTimeId: 1
            },
            raw: true // 데이터베이스 객체가 아닌 순수한 객체로 반환
        });
        //토요일
        const weekendIds = await Calendar.findAll({
            attributes: ['CalendarId'], // CalendarId만 가져오기
            where: {
                OperationTimeId: 2
            },
            raw: true // 데이터베이스 객체가 아닌 순수한 객체로 반환
        });
        //공휴일
        const holidayIds = await Calendar.findAll({
            attributes: ['CalendarId'], // CalendarId만 가져오기
            where: {
                OperationTimeId: 3
            },
            raw: true // 데이터베이스 객체가 아닌 순수한 객체로 반환
        });
        console.log(JSON.stringify(weekdayIds))

        // 기본 샘플 데이터
        const baseSampleData = [
            {
                OperationTimeId: 1,
                startTime: 800,
                endTime: 900,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 900,
                endTime: 1000,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1000,
                endTime: 1100,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1100,
                endTime: 1200,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1200,
                endTime: 1300,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1300,
                endTime: 1400,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1400,
                endTime: 1500,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1500,
                endTime: 1600,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1600,
                endTime: 1700,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1700,
                endTime: 1800,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
        ];
        //토요일
        const baseweekendData = [
            {
                OperationTimeId: 1,
                startTime: 800,
                endTime: 900,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 900,
                endTime: 1000,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 1,
                startTime: 1000,
                endTime: 1100,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 2,
                startTime: 1100,
                endTime: 1200,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 2,
                startTime: 1200,
                endTime: 1300,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 2,
                startTime: 1300,
                endTime: 1400,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 2,
                startTime: 1400,
                endTime: 1500,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 2,
                startTime: 1500,
                endTime: 1600,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            }
            
            
        ];

        //공휴일
        const baseholidayData = [
            {
                OperationTimeId: 3,
                startTime: 1000,
                endTime: 1100,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 3,
                startTime: 1100,
                endTime: 1200,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 3,
                startTime: 1200,
                endTime: 1300,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 3,
                startTime: 1300,
                endTime: 1400,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 3,
                startTime: 1400,
                endTime: 1500,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            },
            {
                OperationTimeId: 3,
                startTime: 1500,
                endTime: 1600,
                numberOfReservation: 5,
                availableNumberOfReservation: 5,
                reservationPossible: true,
            }
            
        ];

        // CalendarId마다 데이터를 생성합니다.
        const weekday = [];
        weekdayIds.forEach((calendarIdObj) => {
            const calendarId = calendarIdObj.CalendarId; // 각 CalendarId 가져오기
            baseSampleData.forEach((sample) => {
                const newSample = { ...sample, CalendarId: calendarId }; // 각 CalendarId에 대한 새로운 샘플 데이터 생성
                weekday.push(newSample);
            });
        });
        const weekend =[];
        weekendIds.forEach((calendarIdObj) => {
            const calendarId = calendarIdObj.CalendarId; // 각 CalendarId 가져오기
            logger.info('토요일: '+calendarId)
            baseweekendData.forEach((sample) => {
                const newSample = { ...sample, CalendarId: calendarId }; // 각 CalendarId에 대한 새로운 샘플 데이터 생성
                weekend.push(newSample);
            });
        });
        const holiday =[];
        holidayIds.forEach((calendarIdObj) => {
            const calendarId = calendarIdObj.CalendarId; // 각 CalendarId 가져오기
            logger.info(calendarId)
            baseholidayData.forEach((sample) => {
                const newSample = { ...sample, CalendarId: calendarId }; // 각 CalendarId에 대한 새로운 샘플 데이터 생성
                holiday.push(newSample);
            });
        });

        // 데이터베이스에 추가합니다.
        // 여러 비동기 작업을 병렬로 처리하고 결과를 기다립니다.
        await Promise.all([
            ReservationTime.bulkCreate(weekday), // 주중 데이터 추가
            ReservationTime.bulkCreate(weekend), // 주말 데이터 추가
            ReservationTime.bulkCreate(holiday), // 공휴일 데이터 추가
        ]);


        res.status(200).send('Reservation times created successfully');
    } catch (error) {
        console.error('Error creating reservation times:', error);
        res.status(500).send('An error occurred while creating reservation times');
    }
});

// 해당 함수들을 순차적으로 실행하는 함수
const executeInOrder = async () => {
    try {
        // 1. OperationTime 생성
        await operationTimeCreate(); // 이 함수가 완료될 때까지 대기
        
        // 2. Calendar 데이터 생성
        await createCalendarData(currentYear); // 이 함수가 완료될 때까지 대기
        
        // 3. Holiday 데이터 생성
        await holidayAPI(String(currentYear)); // 이 함수가 완료될 때까지 대기
        
        console.log("모든 작업이 성공적으로 완료되었습니다.");
    } catch (error) {
        console.error("작업 중 오류가 발생했습니다:", error);
    }
};
router.get('/setting',async function(req,res){
    try {
        executeInOrder(); // 함수 실행
    } catch (error) {
        console.error('Error during setting:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;  