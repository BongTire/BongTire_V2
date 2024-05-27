import express, { Request, Response, Router } from 'express';
import db from '../../models';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import logger from '../../config/logger';
import { Json } from 'sequelize/types/utils';
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';
import {returnPastOrNot,returnReservationPossible,splitArray,returnCalendarResult,returnResult,returnReservationContent,returnTodayReservation,returnResercationDatasWithDate,returnBasicResult,returnNonPastReservationDatas,returnReservations,returnTodayReservations} from '../../utils/reservationUtil'

const router: Router = express.Router();
const Calendar = db.Calendar
const ReservationMaster = db.ReservationMaster
const ReservationProduct = db.ReservationProduct
const ReservationTime = db.ReservationTime
const sequelize = db.sequelize


//완료 (프론트에서 받는 형식 확인)
router.get('/calendar',isAuthenticatedAdmin,async function(req:Request,res:Response){//이번달 기준 예약 가능 날짜
    const ptcd = req.query.ptcd as string;
    const pccd = req.query.pccd as string;
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
        let prevMonthData:any[] =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${prevMonth +1} AND Calendars.year = ${prevYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: QueryTypes.SELECT,});
        const todayData:any = await Calendar.findOne({
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
        let monthData:any[] =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${month+1} AND Calendars.year = ${year} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: QueryTypes.SELECT,});
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
        let nextMonthData:any[] =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${nextMonth +1} AND Calendars.year = ${nextYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: QueryTypes.SELECT,});
       
        
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
router.post('/calendar',isAuthenticatedAdmin,async function(req,res){//이번달 기준 예약 가능 날짜
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
        let prevMonthData:any[] =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${prevMonth +1} AND Calendars.year = ${prevYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: QueryTypes.SELECT,});
        
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
        let monthData:any[] =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${month+1} AND Calendars.year = ${year} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: QueryTypes.SELECT,});
       
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
        let nextMonthData:any[] =await sequelize.query(`SELECT * FROM Calendars join OperationTimes on Calendars.OperationTimeId = OperationTimes.OperationTimeId where Calendars.month = ${nextMonth +1} AND Calendars.year = ${nextYear} AND Calendars.deletedAt IS NULL ORDER BY day ASC`, {type: QueryTypes.SELECT,});
       
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

router.post('/time',isAuthenticatedAdmin,async function(req,res){//해당 날짜에 가능한 시간대
    const ptcd = req.query.ptcd;
    const pccd = req.query.pccd;
    const data = req.body.data;
    let dateData =[];

    if(ptcd=='R0401'&& pccd =='R0801'){
        try {
            const calendarId:any = await Calendar.findOne({
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


router.post('/',isAuthenticatedAdmin,async function(req,res){
    const data = req.body;
    const reservationContent = data.reservationContent;
    const product = data.product;
    
    const name = data.name ?? null
    const number =data.number ?? null
    const userId = -1; //관리자가 직접예약해서 일단 -1넣음


   // const {ownCarId,paymentMethod,request,totalPrice} = req.body.data ?? ""
   const year = Number(data.date.substring(0,4))
   const month = Number(data.date.substring(4,6))
   const day = Number(data.date.substring(6,8))
   let newReservation:any,newReservationCode:any;
   let reservationTiredata,reservationWheeldata;
   let result;
   
        try {
            const calendarDataDB:any = await Calendar.findOne({
                where:{
                    year:year,
                    month:month,
                    day:day
                }
            })
            
            let reservationTimeDataDB:any =await sequelize.query(`select * from ReservationTimes join OperationTimes on ReservationTimes.OperationTimeId = OperationTimes.OperationTimeId where ReservationTimes.CalendarId = ${calendarDataDB.CalendarId} AND ReservationTimes.startTime =${data.time} AND ReservationTimes.deletedAt IS NULL`, {type: QueryTypes.SELECT,});
            reservationTimeDataDB = reservationTimeDataDB[0]
            
            logger.info('reservationTimeDataDB: '+JSON.stringify(reservationTimeDataDB))
            
            //예약 가능한 자리가 남았다면
            if(reservationTimeDataDB.reservationPossible == 1){//예약이 가능하다면

            }else if(reservationTimeDataDB.reservationPossible == 0){//예약 불가
                logger.info('예약 full, 관리자 예약 시도중')
                //res.send('예약 불가')//여기에는 비즈니스 코드 도입해야함
            }
            try{
                await sequelize.transaction(async (transaction)=>{
                    //새 예약 생성
                    newReservation = await ReservationMaster.create({
                        ReservationTimeId: reservationTimeDataDB.ReservationTimeId,
                        CalendarId: calendarDataDB.CalendarId,
                        OperationTimeId: reservationTimeDataDB.OperationTimeId,
                        UserId: userId,
                        ReservationCode:String(req.body.date+'-'+reservationTimeDataDB.startTime),
                        paymentMethod: data.paymentMethod,
                        request: data.request,
                        totalPrice: data.totalPrice,
                        isCancel: data.isCancel,
                        isReceive: data.isReceive,
                        isComplete: data.isComplete,
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
                    
                        // 예약 상품 정보 저장
                        for (const item of product) {
                            logger.info('product: '+JSON.stringify(item))
                            await ReservationProduct.create({
                                ReservationMasterId: newReservation.ReservationMasterId,
                                ReservationTimeId: reservationTimeDataDB.ReservationTimeId,
                                CalendarId: calendarDataDB.CalendarId,
                                OperationTimeId:reservationTimeDataDB.OperationTimeId,
                                UserId: userId,
                                ReservationCode:String(data.date+'-'+reservationTimeDataDB.startTime+'-'+newReservation.ReservationMasterId),
                                PCCD: item.PCCD,
                                ProductId:item.ProductId, //productId string -> int
                                amount: item.amount,
                                price: item.price,
                                tireLocation: String('['+item.tireLocation+']'),
                                laborCost: item.laborCost
                            }, { transaction: transaction });
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
                
                reservationTiredata = await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Tires on ReservationProducts.ProductId = Tires.TireId join Brands on Tires.BrandId = Brands.BrandId where ReservationMasterId = '${newReservation.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0601'`, { type: QueryTypes.SELECT })
                reservationWheeldata =await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Wheels on ReservationProducts.ProductId = Wheels.WheelId join Brands on Wheels.BrandId = Brands.BrandId where ReservationMasterId = '${newReservation.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0602'`, { type: QueryTypes.SELECT })
                //const reservationMasterData = await sequelize.query(`select * from ReservationMasters join Users on ReservationMasters.UserId = Users.UserId where  ReservationMasters.ReservationMasterId =${newReservation.ReservationMasterId} AND ReservationMasters.deletedAt IS NULL `, { type: QueryTypes.SELECT })
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
                    type: QueryTypes.SELECT,
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
            
        } catch (error) {
            logger.error(error)
            
        }
})

router.post('/inquiry',isAuthenticatedAdmin,async function(req,res){//예약조회
    const{name, number} = req.body.data;
    try {
        let reservationDatasQuery =`SELECT * 
                    FROM ReservationMasters 
                    JOIN Calendars ON ReservationMasters.CalendarId = Calendars.CalendarId 
                    JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId
                    WHERE ReservationMasters.name = "${name}" AND ReservationMasters.number = "${number}" AND ReservationMasters.UserId = -1
                    AND ReservationMasters.deletedAt IS NULL`;
        const reservationDatas = await sequelize.query(reservationDatasQuery, {type: QueryTypes.SELECT,});
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
        let result = returnBasicResult(resercationDatas)
        
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



router.get('/reservedata',isAuthenticatedAdmin, async function(req: Request, res: Response) {
    const date = req.query.date as string;
    const year = Number(date.substring(0, 4));
    const month = Number(date.substring(4, 6));
    const day = Number(date.substring(6, 8));

    try {
        const calendarData = await Calendar.findOne({
            where: { year, month, day },
            raw: true
        });

        if (!calendarData) {
            throw new Error('Calendar data not found');
        }

        const reservationTimeDatas = await ReservationTime.findAll({
            where: { CalendarId: calendarData.CalendarId },
            raw: true
        });

        const reservationContent = await returnTodayReservations(reservationTimeDatas);
        const result = returnResult(reservationContent, date);

        res.json(result);
    } catch (error: any) {
        logger.error('Error: ' + error);
        res.status(400).json({
            status: {
                code: 4000,
                message: error.message
            },
            data: error
        });
    }
});

router.post('/confirmed', isAuthenticatedAdmin, async function(req: Request, res: Response) {
    try {
        const data = req.body.data;
        const reservationMasterId = data.ReservationMasterId;

        const updatedReservation = await ReservationMaster.update(
            {
                isCancel: data.isCancel,
                isReceive: data.isReceive,
                isComplete: data.isComplete
            },
            {
                where: { ReservationMasterId: reservationMasterId }
            }
        );

        if (updatedReservation[0] > 0) {
            res.status(200).json({
                success: true,
                message: 'Reservation updated successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Reservation not found or not updated'
            });
        }
    } catch (error) {
        logger.error('/api/admin/reservation/confirmed: ' + error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating reservation'
        });
    }
});

router.post('/isActive', isAuthenticatedAdmin, async function(req: Request, res: Response) {
    const data = req.body.data;

    try {
        const reservationTimeData = await ReservationTime.findOne({
            where: { ReservationTimeId: data.ReservationTimeId }
        });

        if (!reservationTimeData) {
            throw new Error('Reservation time data not found');
        }

        if (data.reservationPossible === false && reservationTimeData.availableNumberOfReservation === reservationTimeData.numberOfReservation) {
            const updatedReservationTime = await ReservationTime.update(
                { reservationPossible: false },
                { where: { ReservationTimeId: data.ReservationTimeId } }
            );

            if (updatedReservationTime[0] > 0) {
                res.json({
                    status: {
                        code: 2000,
                        message: 'The reservation time has been deactivated.'
                    }
                });
            } else {
                res.json({
                    status: {
                        code: 4000,
                        message: 'Failed to deactivate the reservation time.'
                    }
                });
            }
        } else if (data.reservationPossible === false && reservationTimeData.availableNumberOfReservation < reservationTimeData.numberOfReservation) {
            res.json({
                status: {
                    code: 4000,
                    message: 'There are already reservations for this time.'
                }
            });
        } else if (data.reservationPossible === true) {
            const updatedReservationTime = await ReservationTime.update(
                { reservationPossible: true },
                { where: { ReservationTimeId: data.ReservationTimeId } }
            );

            if (updatedReservationTime[0] > 0) {
                res.json({
                    status: {
                        code: 2000,
                        message: 'The reservation time has been activated.'
                    }
                });
            } else {
                res.json({
                    status: {
                        code: 4000,
                        message: 'Failed to activate the reservation time.'
                    }
                });
            }
        }
    } catch (error :any) {
        logger.error('/isActive Error: ' + error);
        res.json({
            status: {
                code: 4000,
                message: error.message
            },
            data: error
        });
    }
});

export default router;