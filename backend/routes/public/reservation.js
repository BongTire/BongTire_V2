var express = require('express');
var router = express.Router();
const {BestSellProduct,Brand,Calendar,Car,CarHashTagConnection,CarTrim,Filter,HashTag,Menu,OperationTime,OtherproductHashTagConnection,OwnCar,Page,PCCD,PCCDBrandConnectionTable,Post,Product,PTCD,ReservationMaster,ReservationProduct,ReservationTime,Revenue,Tire,TireHashTagConnection,User,Wheel,WheelHashTagConnection}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../models'); // 모델들이 정의된 파일을 불러옵니다.

// 새로운 예약 코드 생성
const currentDate = new Date();
const formattedDate = formatDate(currentDate); // 현재 날짜를 형식에 맞게 포맷팅

function formatDate(date) {
    // 년, 월, 일을 가져오기 위해 Date 객체 사용
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 패딩
    const day = String(date.getDate()).padStart(2, '0'); // 일도 두 자리로 패딩
    return `${year}${month}${day}`;
}

function returnPastOrNot(comparisonDate, todayData) {
    logger.info('comparisonDate: ' + JSON.stringify(comparisonDate));
    logger.info('todayData: ' + JSON.stringify(todayData));
    logger.info(JSON.stringify(comparisonDate.year));
    logger.info(JSON.stringify(todayData.year));

    // 과거 여부를 초기화
    let pastOrNot = true;

    // 현재 연도와 비교
    if (comparisonDate.year > todayData.year) {
        // 비교 연도가 현재 연도보다 큰 경우, 미래임
        logger.info('comparisonDate.year > todayData.year , false')
        return false;
    } else if (comparisonDate.year === todayData.year) {
        // 연도가 같은 경우, 월을 비교
        if (comparisonDate.month > todayData.month) {
            logger.info('comparisonDate.month > todayData.month , false')
            return false;
        } else if (comparisonDate.month === todayData.month) {
            // 월이 같은 경우, 일을 비교
            if (comparisonDate.day > todayData.day) {
                logger.info('comparisonDate.month === todayData.month , false')
                return false;
            }
        }
    }else{
        logger.info('흠 모지')
    }

    // 기본값은 과거임
    return pastOrNot;
}

function returnReservationPossible(reservationPossibleDatas) {
    let function_reservationPossible = false;

    reservationPossibleDatas.forEach((data, index) => {
        //logger.info(`reservationPossibleDatas[${index}].reservationPossible: ${data.reservationPossible}`);
        if (data.reservationPossible === 1) {
            function_reservationPossible = true;
        }
    });
    //logger.info(`reservationPossible: ${function_reservationPossible}`);
    return function_reservationPossible;
}


function splitArray(date) {
    const result = [];
    const chunkSize = 7;
    for (let i = 0; i < date.length; i += chunkSize) {
        const chunk = date.slice(i, i + chunkSize);
        //logger.info('chunk: '+JSON.stringify(chunk))
        result.push(chunk);
    }
    return result;
}

function returnCalendarResult(year,month,todayData,splitDate){
    let result = {
        year: year,
        month: month,
        today: {
            calendarId:todayData.CalendarId,
            month:todayData.month,
            week:todayData.week ?? null,
            day:todayData.day,
            dayOfWeek:todayData.dayOfWeek ?? null
        },
        date: splitDate,
    }
    return result

} 

//완료 (프론트에서 받는 형식 확인)
router.get('/calendar',async function(req,res){//이번달 기준 예약 가능 날짜
    const ptcd = req.query.ptcd;
    const pccd = req.query.pccd;
    //이번달 기준으로 달력 데이터를 가져와야한다.

    if(ptcd == 'R0401'&&pccd =='R0801')
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const firstDayOfMonth = new Date(year, month, 1);
        logger.info("firstDayOfMonth: ",firstDayOfMonth)
        const lastDayOfMonth = new Date(year, month + 1, 0);
        //logger.info("lastDayOfMonth: ",lastDayOfMonth)
        const firstDayOfWeek = firstDayOfMonth.getDay();
        //logger.info("firstDayOfWeek: ",firstDayOfWeek)
        const lastDayOfWeek = lastDayOfMonth.getDay();

        const daysInMonth = lastDayOfMonth.getDate();
        const weeksInMonth = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
        const date = [];

        // 이전 달 날짜 추가
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthDays = new Date(year, month, 0).getDate();
        const prevMonthStart = prevMonthDays - firstDayOfWeek + 1;
        // const prevMonthData = await Calendar.findAll({
        //     where:{
        //         month:prevMonth +1,
        //         year:prevYear
        //     },
        //     order:[['day','ASC']]
        // })
        let prevMonthData =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${prevMonth +1} AND Calendars.year = ${prevYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: sequelize.QueryTypes.SELECT,});
        const todayData = await Calendar.findOne({
            where:{
                year: year,
                month:month+1,
                day:day
            },
            raw:true
        })
        logger.info('prevMonthData: '+JSON.stringify(prevMonthData))
        let dayOfWeek;
        for (let i = 0; i < firstDayOfWeek; i++) {
            
            let reservationPossible;
            let pastOrNot = returnPastOrNot(prevMonthData[prevMonthStart + i -1],todayData)
            logger.info('pastOrNot: '+JSON.stringify(pastOrNot))
            if(pastOrNot == true){ //오늘 보다 이전이면
                logger.info('과거')
                reservationPossible = false
            }else if(prevMonthData[prevMonthStart + i -1].OperationTimeId == 4){//휴일
                logger.info('휴일')
                reservationPossible = false
            }else{
                logger.info('not 휴일')
                logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(prevMonthData[prevMonthStart + i -1].CalendarId))
                
                let reservationPossibleDatas = await ReservationTime.findAll({
                    where:{
                        CalendarId:Number(prevMonthData[prevMonthStart + i -1].CalendarId)
                    },
                    raw:true
                })
                logger.info('reservationPossibleDatas: '+JSON.stringify(reservationPossibleDatas))
                reservationPossible = returnReservationPossible(reservationPossibleDatas)
            }
            
            date.push({
                calendarId:prevMonthData[prevMonthStart + i -1].CalendarId,
                operationTimeId:prevMonthData[prevMonthStart + i -1].OperationTimeId,
                isCurrentMonth:false,
                month: prevMonthData[prevMonthStart + i -1].month,
                day: prevMonthData[prevMonthStart + i -1].day,
                dayOfWeek:prevMonthData[prevMonthStart + i -1].dayOfWeek ?? null,
                isHoliday:prevMonthData[prevMonthStart + i -1].isHoliday ?? null,
                holidayName:prevMonthData[prevMonthStart + i -1].holidayName ?? null,
                reservationPossible:reservationPossible,
            });
        }
        logger.info('date: ',date)

        // 현재 달 날짜 추가
        // const monthData = await Calendar.findAll({
        //     where:{
        //         month:month+1,
        //         year:year
        //     },
        //     order:[['day','ASC']],
        //     raw: true,
        // })
        let monthData =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${month+1} AND Calendars.year = ${year} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: sequelize.QueryTypes.SELECT,});
        console.log(monthData)
        for (let i = 0; i < daysInMonth; i++) {
            let reservationPossible;
            let pastOrNot = returnPastOrNot(monthData[i],todayData)
            if(pastOrNot == true){ //오늘 보다 이전이면
                logger.info('과거')
                reservationPossible = false
            }else if(monthData[i].OperationTimeId == 4){//휴일
                logger.info('휴일')
                reservationPossible = false
            }else{
                logger.info('not 휴일')
                logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(monthData[i].CalendarId))
                
                let reservationPossibleDatas = await ReservationTime.findAll({
                    where:{
                        CalendarId:Number(monthData[i].CalendarId)
                    },
                    raw:true
                })
                logger.info('reservationPossibleDatas: '+JSON.stringify(reservationPossibleDatas))
                reservationPossible = returnReservationPossible(reservationPossibleDatas)
            }
            date.push({
                calendarId:monthData[i].CalendarId,
                operationTimeId:monthData[i].OperationTimeId,
                isCurrentMonth:true,
                month:monthData[i].month,
                day: monthData[i].day ? monthData[i].day:null,
                dayOfWeek:monthData[i].dayOfWeek ? monthData[i].dayOfWeek:null,
                isHoliday:monthData[i].isHoliday ? monthData[i].isHoliday:null ,
                holidayName:monthData[i].holidayName ? monthData[i].holidayName: null,
                reservationPossible:reservationPossible ? reservationPossible:false, //수정해야함
            });
        }
        console.log(monthData)

        // 다음 달 날짜 추가
        const nextYear = month === 11 ? year + 1 : year;
        const nextMonth = month === 11 ? 0 : month + 1;
        // let nextMonthData=await Calendar.findAll({
        //     where:{
        //         month:nextMonth +1,
        //         year:nextYear
        //     },
        //     order:[['day','ASC']]
        // })
        let nextMonthData =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${nextMonth +1} AND Calendars.year = ${nextYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: sequelize.QueryTypes.SELECT,});
       
        
        const daysToAdd = (weeksInMonth * 7) - (date.length);
        logger.info(daysToAdd)
        for (let i = 0; i <= daysToAdd; i++) {
            let reservationPossible;
            let pastOrNot = returnPastOrNot(nextMonthData[i],todayData)
            if(pastOrNot == true){ //오늘 보다 이전이면
                logger.info('과거')
                reservationPossible = false
            }else if(nextMonthData[i].OperationTimeId == 4){//휴일
                logger.info('휴일')
                reservationPossible = false
            }else{
                logger.info('not 휴일')
                logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(nextMonthData[i].CalendarId))
                
                let reservationPossibleDatas = await ReservationTime.findAll({
                    where:{
                        CalendarId:Number(nextMonthData[i].CalendarId)
                    },
                    raw:true
                })
                logger.info('reservationPossibleDatas: '+JSON.stringify(reservationPossibleDatas))
                reservationPossible = returnReservationPossible(reservationPossibleDatas)
            }
            date.push({
                calendarId:nextMonthData[i].CalendarId,
                operationTimeId:nextMonthData[i].OperationTimeId,
                isCurrentMonth:false,
                day: nextMonthData[i].day,
                month:nextMonthData[i].month,
                dayOfWeek:nextMonthData[i].dayOfWeek,
                isHoliday:nextMonthData[i].isHoliday,
                holidayName:nextMonthData[i].holidayName,
                reservationPossible:reservationPossible,
            });
        }
        
        const splitDate =splitArray(date) 
        
        //logger.info('todayData: '+todayData)
        const returnData = returnCalendarResult(todayData.year,todayData.month,todayData,splitDate)
        //logger.info('splitDate: '+JSON.stringify(splitDate))

        res.json(returnData);
    } catch (error) {
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//완료 (프론트에서 받는 형식 확인)
router.post('/calendar',async function(req,res){//이번달 기준 예약 가능 날짜
    const ptcd = req.query.ptcd;
    const pccd = req.query.pccd;
    const selectedMonth = Number(req.body.data.month);
    const selectedYear = Number(req.body.data.year);
    //선택된 달 기준으로 달력 데이터를 가져와야한다.
    if(ptcd == 'R0401'&&pccd =='R0801')
    try {
        const today = new Date(selectedYear,selectedMonth-1,1);
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const firstDayOfMonth = new Date(year, month, 1);
        logger.info("firstDayOfMonth: ",firstDayOfMonth)
        const lastDayOfMonth = new Date(year, month + 1, 0);
        //logger.info("lastDayOfMonth: ",lastDayOfMonth)
        const firstDayOfWeek = firstDayOfMonth.getDay();
        //logger.info("firstDayOfWeek: ",firstDayOfWeek)
        const lastDayOfWeek = lastDayOfMonth.getDay();

        const daysInMonth = lastDayOfMonth.getDate();
        const weeksInMonth = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
        const date = [];
        
        //당일 날짜 데이터
        const today_today = new Date();
        const today_year = today_today.getFullYear();
        const today_month = today_today.getMonth();
        const today_day = today_today.getDate();
        const todayData = await Calendar.findOne({
            where:{
                year: today_year,
                month:today_month+1,
                day:today_day
            },
            raw:true
        })

        // 이전 달 날짜 추가
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthDays = new Date(year, month, 0).getDate();
        logger.info("prevMonthDays: "+prevMonthDays)
        const prevMonthStart = prevMonthDays - firstDayOfWeek + 1;
        logger.info("prevMonthStart: "+prevMonthStart)
        // const prevMonthData = await Calendar.findAll({
        //     where:{
        //         month:prevMonth +1,
        //         year:prevYear
        //     },
        //     order:[['day','ASC']]
        // })
        let prevMonthData =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${prevMonth +1} AND Calendars.year = ${prevYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: sequelize.QueryTypes.SELECT,});
        
        logger.info('prevMonthData: '+JSON.stringify(prevMonthData))
        let dayOfWeek;
        for (let i = 0; i < firstDayOfWeek; i++) {
            let reservationPossible;
            let pastOrNot = returnPastOrNot(prevMonthData[prevMonthStart + i -1],todayData)
            logger.info('pastOrNot: '+JSON.stringify(pastOrNot))
            if(pastOrNot == true){ //오늘 보다 이전이면
                logger.info('과거')
                reservationPossible = false
            }else if(prevMonthData[prevMonthStart + i -1].OperationTimeId == 4){//휴일
                logger.info('휴일')
                reservationPossible = false
            }else{
                logger.info('not 휴일')
                logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(prevMonthData[prevMonthStart + i -1].CalendarId))
                
                let reservationPossibleDatas = await ReservationTime.findAll({
                    where:{
                        CalendarId:Number(prevMonthData[prevMonthStart + i -1].CalendarId)
                    },
                    raw:true
                })
                logger.info('reservationPossibleDatas: '+JSON.stringify(reservationPossibleDatas))
                reservationPossible = returnReservationPossible(reservationPossibleDatas)
            }
            
            date.push({
                calendarId:prevMonthData[prevMonthStart + i -1].CalendarId,
                operationTimeId:prevMonthData[prevMonthStart + i -1].OperationTimeId,
                isCurrentMonth:false,
                month: prevMonthData[prevMonthStart + i -1].month,
                day: prevMonthData[prevMonthStart + i -1].day,
                dayOfWeek:prevMonthData[prevMonthStart + i -1].dayOfWeek ?? null,
                isHoliday:prevMonthData[prevMonthStart + i -1].isHoliday ?? null,
                holidayName:prevMonthData[prevMonthStart + i -1].holidayName ?? null,
                reservationPossible:reservationPossible,
            });
        }
        logger.info('date: ',date)

        // 현재 달 날짜 추가
        // const monthData = await Calendar.findAll({
        //     where:{
        //         month:month+1,
        //         year:year
        //     },
        //     order:[['day','ASC']],
        //     raw: true,
        // })
        let monthData =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${month+1} AND Calendars.year = ${year} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: sequelize.QueryTypes.SELECT,});
       
        console.log(monthData)
        for (let i = 0; i < daysInMonth; i++) {
            let reservationPossible;
            let pastOrNot = returnPastOrNot(monthData[i],todayData)
            if(pastOrNot == true){ //오늘 보다 이전이면
                logger.info('과거')
                reservationPossible = false
            }else if(monthData[i].OperationTimeId == 4){//휴일
                logger.info('휴일')
                reservationPossible = false
            }else{
                logger.info('not 휴일')
                logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(monthData[i].CalendarId))
                
                let reservationPossibleDatas = await ReservationTime.findAll({
                    where:{
                        CalendarId:Number(monthData[i].CalendarId)
                    },
                    raw:true
                })
                logger.info('reservationPossibleDatas: '+JSON.stringify(reservationPossibleDatas))
                reservationPossible = returnReservationPossible(reservationPossibleDatas)
            }
            date.push({
                calendarId:monthData[i].CalendarId,
                operationTimeId:monthData[i].OperationTimeId,
                isCurrentMonth:true,
                month:monthData[i].month,
                day: monthData[i].day ? monthData[i].day:null,
                dayOfWeek:monthData[i].dayOfWeek ? monthData[i].dayOfWeek:null,
                isHoliday:monthData[i].isHoliday ? monthData[i].isHoliday:null ,
                holidayName:monthData[i].holidayName ? monthData[i].holidayName: null,
                reservationPossible:reservationPossible ? reservationPossible:false, //수정해야함
            });
        }
        console.log(monthData)

        // 다음 달 날짜 추가
        const nextYear = month === 11 ? year + 1 : year;
        const nextMonth = month === 11 ? 0 : month + 1;
        // let nextMonthData=await Calendar.findAll({
        //     where:{
        //         month:nextMonth +1,
        //         year:nextYear
        //     },
        //     order:[['day','ASC']]
        // })
        let nextMonthData =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${nextMonth +1} AND Calendars.year = ${nextYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: sequelize.QueryTypes.SELECT,});
       
        const daysToAdd = (weeksInMonth * 7) - (date.length);
        logger.info(daysToAdd)
        for (let i = 0; i <= daysToAdd; i++) {
            let reservationPossible;
            let pastOrNot = returnPastOrNot(nextMonthData[i],todayData)
            if(pastOrNot == true){ //오늘 보다 이전이면
                logger.info('과거')
                reservationPossible = false
            }else if(nextMonthData[i].OperationTimeId == 4){//휴일
                logger.info('휴일')
                reservationPossible = false
            }else{
                logger.info('not 휴일')
                logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(nextMonthData[i].CalendarId))
                
                let reservationPossibleDatas = await ReservationTime.findAll({
                    where:{
                        CalendarId:Number(nextMonthData[i].CalendarId)
                    },
                    raw:true
                })
                logger.info('reservationPossibleDatas: '+JSON.stringify(reservationPossibleDatas))
                reservationPossible = returnReservationPossible(reservationPossibleDatas)
            }
            date.push({
                calendarId:nextMonthData[i].CalendarId,
                operationTimeId:nextMonthData[i].OperationTimeId,
                isCurrentMonth:false,
                day: nextMonthData[i].day,
                month:nextMonthData[i].month,
                dayOfWeek:nextMonthData[i].dayOfWeek,
                isHoliday:nextMonthData[i].isHoliday,
                holidayName:nextMonthData[i].holidayName,
                reservationPossible:reservationPossible,
            });
        }
        
        const splitDate =splitArray(date) 

        
        logger.info('todayData: '+todayData)
        const returnData = returnCalendarResult(year,month+1,todayData,splitDate)
        //logger.info('splitDate: '+JSON.stringify(splitDate))

        res.json(returnData);
    } catch (error) {
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/time',async function(req,res){//해당 날짜에 가능한 시간대
    const ptcd = req.query.ptcd;
    const pccd = req.query.pccd;
    const data = req.body.data;
    let dateData =[];

    if(ptcd=='R0401'&& pccd =='R0801'){
        try {
            const calendarId = await Calendar.findOne({
                where:{
                    year:data.year,
                    month:data.month,
                    day:data.day
                },
                raw:true
            })
            console.log(calendarId)

            const reservationTime = await ReservationTime.findAll({
                where:{
                    calendarId:calendarId.CalendarId
                },
                raw:true
            })
            console.log(reservationTime)
            const length = reservationTime.length;
            for(let i =0;i<length;i++){
                dateData.push({
                    startTime: reservationTime[i].startTime,
                    endTime: reservationTime[i].endTime,
                    numberOfReservation : reservationTime[i].numberOfReservation  ,
                    availableNumberOfReservation :reservationTime[i].availableNumberOfReservation,
                    reservationPossible : reservationTime[i].reservationPossible ,
                    operationTimeId: reservationTime[i].OperationTimeId 
                })
            }
            res.json(dateData)
            
        } catch (error) {
            
        }

    }
})
/////////////////결계/////////////////
function returnResult(todayReservation,date) {
    const result = {
        status:{
            message: "상태 메시지 작성",
            code : "상태 코드"
          },
          date:date ?? null,
          todayReservation:todayReservation ?? null
    }

    return result;
}
function returnReservationContent(productTire,productWheel,reservationMasterData){
    //logger.info(JSON.stringify(productTire))
    let tireData = [];
    let productType = [];
    let wheelData,reservationContent = [];

    logger.info('reservationMasterData: '+JSON.stringify(reservationMasterData))
    productTire.map((product, i)=>{
        let tireLocation = JSON.parse(product.tireLocation)
        tireData[i] = {
            PCCD:product.PCCD ?? null,
            amount:product.amount ?? null,
            laborCost:product.laborCost ?? null,
            price:product.price ?? null,
            product:{
                ProductId:product.TireId ?? null,
                PCCD:product.ReservationProductsPCCD ?? null,
                drivingMethodPCCD:product.drivingMethodPCCD ?? null,
                brandName:product.name ?? null,
                brandLogo:product.brandLogo ?? null,
                productName:product.productName ?? null,
                image:product.image ?? null,
                isActive:product.isActive ?? null,
                isContinue:product.isContinue ?? null,
                isSecond:product.isSecond ?? null,
                isVisible:product.isVisible ?? null,
                tireSize:product.tireSize ?? null,
            },
            tireLocation:tireLocation ?? null
      }
      //logger.info(JSON.stringify(tireData[i]))
    })
    productWheel.map((product, i)=>{
        let tireLocation = JSON.parse(product.tireLocation)
        wheelData[i] = {
            PCCD:product.PCCD ?? null,
            amount:product.amount ?? null,
            laborCost:product.laborCost ?? null,
            price:product.price ?? null,
            product:{
                ProductId:product.TireId ?? null,
                PCCD:product.ReservationProductsPCCD ?? null,
                drivingMethodPCCD:product.drivingMethodPCCD ?? null,
                brandName:product.name ?? null,
                brandLogo:product.brandLogo ?? null,
                productName:product.productName ?? null,
                image:product.image ?? null,
                wheelSize:product.wheelSize ?? null,
                frontOffset:product.frontOffset ?? null,
                rearOffset:product.rearOffset ?? null,
                isActive:product.isActive ?? null,
                isContinue:product.isContinue ?? null,
                isSecond:product.isSecond ?? null,
                isVisible:product.isVisible ?? null
                
            },
            tireLocation:tireLocation ?? null
      }
      //logger.info(JSON.stringify(wheelData[i]))
    })

    productType = [
        {
            icon: `http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/tire-icon.png`,
            id: 10,
            title: "타이어",
            PCCD:"P0601",
            data:tireData
        },
        {
            icon:`http://${process.env.DNS_SERVER_NAME}/images/systemIcon/Car/wheel-icon.png`,
            id: 11,
            title: "휠",
            PCCD:"P0602",
            data:wheelData
        }
    ]
    
    reservationContent = {
        name:reservationMasterData.name ?? null,
        number:reservationMasterData.number ?? null,
        userId: reservationMasterData.UserId === -1 ? null : (reservationMasterData.UserId ?? null), //UserId 가 -1 이면 null 처리
        CalendarId:reservationMasterData.CalendarId ?? null,
        ReservationMasterId:reservationMasterData.ReservationMasterId??null,
        OperationTime:reservationMasterData.OperationTimeId ?? null,
        ReservationTimeId:reservationMasterData.ReservationTimeId ?? null,
        reservationCode:reservationMasterData.ReservationCode ?? null,
        paymentMethod:reservationMasterData.paymentMethod ?? null,
        request:reservationMasterData.request ?? null,
        totalPrice:reservationMasterData.totalPrice ?? null,
        isCancel:reservationMasterData.isCancel ?? null,
        isComplete:reservationMasterData.isComplete ?? null,
        isReceive:reservationMasterData.isReceive ?? null,
        productType: productType ?? null
    }

    return reservationContent
}
function returnTodayReservation(reservationMasterData,reservationContent){
    logger.info("reservationMasterData: "+ JSON.stringify(reservationMasterData))
    let todayReservation = {
        time:reservationMasterData.startTime ?? null,
        reservationContent:reservationContent ?? null,
    }
    return todayReservation
}
function returnReservation(reservationMasterData,reservationContent){
    logger.info("reservationMasterData: "+ JSON.stringify(reservationMasterData))
    let todayReservation = {
        time:reservationMasterData.startTime ?? null,
        reservationContent:reservationContent ?? null,
        date:reservationMasterData.date ?? null
    }
    return todayReservation
}
function returnResercationDatasWithDate(todayReservation) {
    logger.info('todayReservations: '+JSON.stringify(todayReservation))
    let resercationDatasWithDate = []
    todayReservation.forEach((data,index)=>{
        logger.info('todayReservation: '+JSON.stringify(data))
        let date = data.date
        delete data["date"]
        resercationDatasWithDate.push({
            date:date,
            Reservation:data
        })
    })
    return resercationDatasWithDate;
}//
function returnInquiryResult(resercationDatasWithDate) {
    const result = {
        status:{
            message: "완료",
            code : 200
          },
        data:resercationDatasWithDate
    }

    return result;
}//
async function retrunProductData(reservationMasterData){
    let replacements = {reservationMasterId: reservationMasterData.ReservationMasterId};
    let reservationTiredata = await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Tires on ReservationProducts.ProductId = Tires.TireId join Brands on Tires.BrandId = Brands.BrandId where ReservationMasterId = '${reservationMasterData.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0601'`, { type: sequelize.QueryTypes.SELECT })
    let reservationWheeldata =await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Wheels on ReservationProducts.ProductId = Wheels.WheelId join Brands on Wheels.BrandId = Brands.BrandId where ReservationMasterId = '${reservationMasterData.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0602'`, { type: sequelize.QueryTypes.SELECT })
    
    let reservationMasterMemberDatabaseQuery =`SELECT * FROM ReservationMasters JOIN Users ON ReservationMasters.UserId = Users.UserId JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId WHERE ReservationMasters.ReservationMasterId = ${reservationMasterData.ReservationMasterId} AND ReservationMasters.deletedAt IS NULL`;
    let reservationMasterNonMemberDatabaseQuery = `SELECT * FROM ReservationMasters JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId WHERE ReservationMasters.ReservationMasterId = ${reservationMasterData.ReservationMasterId} AND ReservationMasters.deletedAt IS NULL`;
    
    const reservationMasterMemberData = await sequelize.query(reservationMasterMemberDatabaseQuery, {type: sequelize.QueryTypes.SELECT,});
    //logger.info('reservationMasterMemberData(회원) : '+JSON.stringify(reservationMasterMemberData))
    const reservationMasterNonMemberData = await sequelize.query(reservationMasterNonMemberDatabaseQuery, {type: sequelize.QueryTypes.SELECT,});
    //logger.info('reservationMasterNonMemberData(비회원) : '+JSON.stringify(reservationMasterNonMemberData))

    const reservationMasterDataWithUserData = reservationMasterMemberData[0] ?? reservationMasterNonMemberData[0];
    //logger.info('reservationTiredata(타이어) : '+ JSON.stringify(reservationTiredata))
    //logger.info('reservationWheeldata(휠) : '+ JSON.stringify(reservationWheeldata))
    //logger.info('reservationMasterDataWithUserData : '+ JSON.stringify(reservationMasterDataWithUserData))
    //logger.info(reservationMasterDataWithUserData.name)

    return {reservationTiredata, reservationWheeldata, reservationMasterDataWithUserData}
}//
function returnNonPastReservationDatas(comparisonDateDatas, todayData) {
    logger.info('comparisonDate: ' + JSON.stringify(comparisonDateDatas));
    logger.info('todayData: ' + JSON.stringify(todayData));
    logger.info(JSON.stringify(comparisonDateDatas.year));
    logger.info(JSON.stringify(todayData.year));

    // 미래 예약 내역
    let reservationDetails = [];

    comparisonDateDatas.forEach((data, index) => {
        // 현재 연도와 비교
    if (data.year > todayData.year) {
        // 비교 연도가 현재 연도보다 큰 경우, 미래임
        logger.info('comparisonDateDatas.year > todayData.year , false')
        reservationDetails.push(data)
    } else if (data.year === todayData.year) {
        // 연도가 같은 경우, 월을 비교
        if (data.month > todayData.month) {
            logger.info('comparisonDateDatas.month > todayData.month , false')
            reservationDetails.push(data)
        } else if (data.month === todayData.month) {
            // 월이 같은 경우, 일을 비교
            if (data.day > todayData.day) {
                logger.info('comparisonDateDatas.month === todayData.month , false')
                reservationDetails.push(data)
            }
        }
    }else{
        logger.info('흠 모지')
    }
    });
    logger.info('reservationDetails: '+JSON.stringify(reservationDetails))

    

    // 기본값은 빈배열
    return reservationDetails;
}

async function returnReservations(reservationTimeDatas){
    
    let reTodayReservation =[]
    
    for(let i=0;i<reservationTimeDatas.length; i++){
        logger.info(i)
        //logger.info('reservationTimeDatas[i]'+JSON.stringify(reservationTimeDatas[i]))

        let reservationMasters = await sequelize.query(`select * from ReservationMasters join ReservationTimes on ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId join Calendars on ReservationMasters.CalendarId = Calendars.CalendarId where ReservationMasters.ReservationTimeId = '${reservationTimeDatas[i].ReservationTimeId}' AND ReservationMasters.deletedAt IS NULL`, { type: sequelize.QueryTypes.SELECT })
        logger.info('reservationMasters: '+JSON.stringify(reservationMasters[i]))
        for(let x=0;x<reservationMasters.length;x++){
            
            logger.info('reservationMasters[x]'+JSON.stringify(reservationMasters[x]))
            let {reservationTiredata, reservationWheeldata, reservationMasterDataWithUserData} = await retrunProductData(reservationMasters[x]);
            //logger.info('reservationTiredata: '+JSON.stringify(reservationTiredata))
            //logger.info('reservationWheeldata: '+JSON.stringify(reservationWheeldata))
            //logger.info('reservationMasterDataWithUserData: '+JSON.stringify(reservationMasterDataWithUserData))
            
            let reReservationContent =returnReservationContent(reservationTiredata,reservationWheeldata,reservationMasterDataWithUserData)
            logger.info(JSON.stringify(returnReservationContent(reservationTiredata,reservationWheeldata,reservationMasterDataWithUserData)))
            logger.info('!!returnReservationContent: '+JSON.stringify(reReservationContent))
            //reservationMasters[x].date 추가
            logger.info('reservationMasters[x].month: '+reservationMasters[x].month)
            let month = String(reservationMasters[x].month).padStart(2,'0')
            logger.info('reservationMasters[x].day: '+reservationMasters[x].day)
            let day = String(reservationMasters[x].day).padStart(2,'0')
            let date =String(reservationMasters[x].year+month+day)
            reservationMasters[x].date = date
            logger.info('reservationMasters[x].date: '+reservationMasters[x].date)
            if(x==reservationMasters.length -1){
                reTodayReservation.push(returnReservation(reservationMasters[x],reReservationContent))
            }
            
        }
        
         
        logger.info('reTodayReservation: '+JSON.stringify(reTodayReservation))
    }
    return reTodayReservation;
}

router.post('/',async function(req,res){
    // const ptcd = req.query.ptcd;
    // const pccd = req.query.pccd;
    // const data = req.body.data
    const todayReservation = req.body.todayReservation;
    const reservationContent = todayReservation.reservationContent;
    const productType = reservationContent.productType
    const name = reservationContent.name ?? null
    const number =reservationContent.number ?? null
    const userId = req.session.userId ?? -1;


   // const {ownCarId,paymentMethod,request,totalPrice} = req.body.data ?? ""
   const year = Number(req.body.date.substring(0,4))
   const month = Number(req.body.date.substring(4,6))
   const day = Number(req.body.date.substring(6,8))
   let newReservation,newReservationCode;
   let reservationTiredata,reservationWheeldata;
   let result;
   
        try {
            const calendarDataDB = await Calendar.findOne({
                where:{
                    year:year,
                    month:month,
                    day:day
                }
            })
            
            let reservationTimeDataDB =await sequelize.query(`select * from ReservationTimes join OperationTimes on ReservationTimes.OperationTimeId = OperationTimes.OperationTimeId where ReservationTimes.CalendarId = ${calendarDataDB.CalendarId} AND ReservationTimes.startTime =${todayReservation.time} AND ReservationTimes.deletedAt IS NULL`, {type: sequelize.QueryTypes.SELECT,});
            reservationTimeDataDB = reservationTimeDataDB[0]
            
            logger.info('reservationTimeDataDB: '+JSON.stringify(reservationTimeDataDB))
            
            //예약 가능한 자리가 남았다면
            if(reservationTimeDataDB.reservationPossible == 1){//예약이 가능하다면
                try{
                    await sequelize.transaction(async (transaction)=>{
                        //새 예약 생성
                        newReservation = await ReservationMaster.create({
                            ReservationTimeId: reservationTimeDataDB.ReservationTimeId,
                            CalendarId: calendarDataDB.CalendarId,
                            OperationTimeId: reservationTimeDataDB.OperationTimeId,
                            UserId: userId,
                            ReservationCode:String(req.body.date+'-'+reservationTimeDataDB.startTime),
                            paymentMethod: reservationContent.paymentMethod,
                            request: reservationContent.request,
                            totalPrice: reservationContent.totalPrice,
                            isCancel: reservationContent.isCancel,
                            isReceive: reservationContent.isReceive,
                            isComplete: reservationContent.isComplete,
                            name: name,
                            number: number
                        }, { transaction: transaction })
                        logger.info(JSON.stringify(newReservation))
                        //예약 코드수정
                        newReservationCode = await ReservationMaster.update({
                            ReservationCode:String(req.body.date+'-'+reservationTimeDataDB.startTime+'-'+newReservation.ReservationMasterId)
                        },{
                            where:{ReservationMasterId:newReservation.ReservationMasterId},
                            transaction: transaction
                        })
                        console.log(JSON.stringify(newReservationCode))
                        logger.info('setadsf')
                            // 예약 상품 정보 저장
                        for (const product of productType) {
                            logger.info('product: '+JSON.stringify(product))
                            for (const item of product.data) {
                                logger.info('item: '+JSON.stringify(item))
                                logger.info(item.product.ProductId)
                                await ReservationProduct.create({
                                    ReservationMasterId: newReservation.ReservationMasterId,
                                    ReservationTimeId: reservationTimeDataDB.ReservationTimeId,
                                    CalendarId: calendarDataDB.CalendarId,
                                    OperationTimeId:reservationTimeDataDB.OperationTimeId,
                                    UserId: userId,
                                    ReservationCode: newReservationCode.ReservationCode,
                                    PCCD: item.PCCD,
                                    ProductId:item.product.ProductId ?? item.product[0].ProductId, //productId string -> int
                                    amount: item.amount,
                                    price: item.price,
                                    tireLocation: String('['+item.tireLocation+']'),
                                    laborCost: item.laborCost
                                }, { transaction: transaction });
                                
                            }
                        }
                        //ReservationTime 예약 가능 횟수 -1
                        if(reservationTimeDataDB.availableNumberOfReservation ==1){//그 타임 예약 마감   
                            logger.info('해당 타임 마지막 예약')
                            await ReservationTime.update({
                                availableNumberOfReservation:0,
                                reservationPossible:false
                            },{
                                where:{ReservationTimeId:reservationTimeDataDB.ReservationTimeId},
                                transaction:transaction
                            })
                            
                        }else if(reservationTimeDataDB.availableNumberOfReservation > 1){
                            logger.info('잔여 예약 가능')
                            //logger.info('reservationDesignatedDateData: '+JSON.stringify(reservationDesignatedDateData.availableNumberOfReservation))
                            await ReservationTime.update({
                                availableNumberOfReservation:reservationTimeDataDB.availableNumberOfReservation -1,
                            },
                            {
                                where:{ReservationTimeId:reservationTimeDataDB.ReservationTimeId},
                                transaction:transaction
                            })
                            
                        }
                            })
    
                    //예약 상품 
                    
                    reservationTiredata = await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Tires on ReservationProducts.ProductId = Tires.TireId join Brands on Tires.BrandId = Brands.BrandId where ReservationMasterId = '${newReservation.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0601'`, { type: sequelize.QueryTypes.SELECT })
                    reservationWheeldata =await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Wheels on ReservationProducts.ProductId = Wheels.WheelId join Brands on Wheels.BrandId = Brands.BrandId where ReservationMasterId = '${newReservation.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0602'`, { type: sequelize.QueryTypes.SELECT })
                    //const reservationMasterData = await sequelize.query(`select * from ReservationMasters join Users on ReservationMasters.UserId = Users.UserId where  ReservationMasters.ReservationMasterId =${newReservation.ReservationMasterId} AND ReservationMasters.deletedAt IS NULL `, { type: sequelize.QueryTypes.SELECT })
                    let reservationMasterDatabaseQuery =`SELECT * 
                    FROM ReservationMasters 
                    JOIN Users ON ReservationMasters.UserId = Users.UserId 
                    JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId
                    WHERE ReservationMasterId = :reservationMasterId 
                    AND ReservationMasters.deletedAt IS NULL`;
    
                    let replacements = {
                        reservationMasterId: newReservation.ReservationMasterId
                    };
    
                    // 비회원 - 유저 조인 안함
                    if (userId ==-1) {
                        reservationMasterDatabaseQuery = 
                            `SELECT * 
                            FROM ReservationMasters 
                            JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId
                            WHERE ReservationMasterId = :reservationMasterId 
                            AND ReservationMasters.deletedAt IS NULL`;
                    }
    
                    // 쿼리 실행
                    const reservationMasterData = await sequelize.query(reservationMasterDatabaseQuery, {
                        replacements: replacements,
                        type: sequelize.QueryTypes.SELECT,
                    });
                    const reReservationContent = returnReservationContent(reservationTiredata,reservationWheeldata,reservationMasterData[0])
                    const reTodayReservation = returnTodayReservation(reservationMasterData[0],reReservationContent)
                    result = returnResult(reTodayReservation,req.body.date)
                    //logger.info(JSON.stringify(reservationMasterData))
                    logger.info('예약 데이터 성공적으로 저장')
                }catch(error){
                    logger.error('예약 트랜잭션 오류: ',error)
                }
               res.json(result)

            }else if(reservationTimeDataDB.reservationPossible == 0){//예약 불가
                //logger.info('예약 full, 관리자 예약 시도중')
                res.send('예약 불가')//여기에는 비즈니스 코드 도입해야함
            }
            
            
            
        } catch (error) {
            logger.error(error)
            
        }
})

router.post('/inquiry',async function(req,res){//예약조회
    const{name, number} = req.body.data;
    try {
        let reservationDatasQuery =`SELECT * 
                    FROM ReservationMasters 
                    JOIN Calendars ON ReservationMasters.CalendarId = Calendars.CalendarId 
                    JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId
                    WHERE ReservationMasters.name = "${name}" AND ReservationMasters.number = "${number}" AND ReservationMasters.UserId = -1
                    AND ReservationMasters.deletedAt IS NULL`;
        const reservationDatas = await sequelize.query(reservationDatasQuery, {type: sequelize.QueryTypes.SELECT,});
        logger.info('reservationDatas: '+JSON.stringify(reservationDatas))
        const today = new Date();
        const today_year = today.getFullYear();
        const today_month = today.getMonth();
        const today_day = today.getDate();
        const todayData = await Calendar.findOne({
            where:{
                year: today_year,
                month:today_month+1,
                day:today_day
            },
            raw:true
        })
        logger.info('todayData: '+JSON.stringify(todayData))
        const nonPastReservationDatas = returnNonPastReservationDatas(reservationDatas,todayData)
        logger.info('nonPastReservationDatas: '+JSON.stringify(nonPastReservationDatas))

        let reservationContent = await returnReservations(nonPastReservationDatas);
        let resercationDatas = returnResercationDatasWithDate(reservationContent)
        result = returnInquiryResult(resercationDatas)
        
        res.json(result)
        


    } catch (error) {
        logger.error(error+'에러 입니다')
        res.json({
            status:{
                code: 4000,
                message: "에러 입니다." + error
            },
            data:""
        })
    }
})

module.exports = router;  