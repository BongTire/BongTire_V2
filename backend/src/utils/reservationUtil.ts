import db from '../models';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import logger from '../config/logger';
import exp from 'constants';
const sequelize = db.sequelize
const ReservationTime = db.ReservationTime
const Calendar = db.Calendar
const ReservationProduct = db.ReservationProduct
const ReservationMaster = db.ReservationMaster

export function returnPastOrNot(comparisonDate:any, todayData:any) {
    // logger.info('comparisonDate: ' + JSON.stringify(comparisonDate));
    // logger.info('todayData: ' + JSON.stringify(todayData));
    // logger.info(JSON.stringify(comparisonDate.year));
    // logger.info(JSON.stringify(todayData.year));

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

export function returnReservationPossible(reservationPossibleDatas:any) {
    let function_reservationPossible = false;

    reservationPossibleDatas.forEach((data:any, index:any) => {
        //logger.info(`reservationPossibleDatas[${index}].reservationPossible: ${data.reservationPossible}`);
        if (data.reservationPossible === 1) {
            function_reservationPossible = true;
        }
    });
    //logger.info(`reservationPossible: ${function_reservationPossible}`);
    return function_reservationPossible;
}

export function splitArray(date:any) {
    const result = [];
    const chunkSize = 7;
    for (let i = 0; i < date.length; i += chunkSize) {
        const chunk = date.slice(i, i + chunkSize);
        //logger.info('chunk: '+JSON.stringify(chunk))
        result.push(chunk);
    }
    return result;
}

export function returnCalendarResult(year:any,month:any,todayData:any,splitDate:any){
    let result = {
        year: year,
        month: month,
        today: {
            CalendarId:todayData.CalendarId,
            month:todayData.month,
            week:todayData.week ?? null,
            day:todayData.day,
            dayOfWeek:todayData.dayOfWeek ?? null
        },
        date: splitDate,
    }
    return result

} 
export function returnResult(todayReservation:any,date:any) {
    const result = {
        status:{
            message: "상태 메시지 작성",
            code : "상태 코드"
          },
          data:{date:date ?? null,...todayReservation ?? null}
    }

    return result;
}
export function returnReservationContent(productTire:any,productWheel:any,reservationMasterData:any){
    //logger.info(JSON.stringify(productTire))
    let tireData:any = [];
    let products:any = [];
    let wheelData:any ,reservationContent:any = [];

    //logger.info('reservationMasterData: '+JSON.stringify(reservationMasterData))
    if(productTire.length !== 0){
        productTire.map((product:any, i:any)=>{
            let tireLocation = JSON.parse(product.tireLocation)
            tireData[i] = {
                ReservationProductId:product.ReservationProductId ?? null,
                ProductId:product.TireId ?? null,
                amount:product.amount ?? null,
                laborCost:product.laborCost ?? null,
                price:product.price ?? null,
                PCCD:product.PCCD ?? null,
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
                PCCD2:product.ReservationProductsPCCD ?? null,
                tireLocation:tireLocation ?? null
          }
          //logger.info(JSON.stringify(tireData[i]))
        })
        products = [...tireData]
    }

    //logger.info(JSON.stringify(productWheel))
    if(productWheel.length !== 0){
        productWheel.map((product:any, i:any)=>{
            let tireLocation :any= JSON.parse(product.tireLocation)
            wheelData[i] = {
                ReservationProductId:product.ReservationProductId ?? null,
                PCCD:product.PCCD ?? null,
                amount:product.amount ?? null,
                laborCost:product.laborCost ?? null,
                price:product.price ?? null,
                ProductId:product.TireId ?? null,
                PCCD2:product.ReservationProductsPCCD ?? null,
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
                isVisible:product.isVisible ?? null,
                tireLocation:tireLocation ?? null
          }
          //logger.info(JSON.stringify(wheelData[i]))
        })
        products = [...wheelData]
    }
    

    
    
    reservationContent = {
        ReservationMasterId:reservationMasterData.ReservationMasterId??null,
        ReservationTimeId:reservationMasterData.ReservationTimeId ?? null,
        CalendarId:reservationMasterData.CalendarId ?? null,
        OperationTimeId:reservationMasterData.OperationTimeId ?? null,
        UserId: reservationMasterData.UserId === -1 ? null : (reservationMasterData.UserId ?? null), //UserId 가 -1 이면 null 처리
        OwnCarId:null,
        ReservationCode:reservationMasterData.ReservationCode ?? null,
        paymentMethod:reservationMasterData.paymentMethod ?? null,
        request:reservationMasterData.request ?? null,
        totalPrice:reservationMasterData.totalPrice ?? null,
        isCancel:reservationMasterData.isCancel ?? null,
        isComplete:reservationMasterData.isComplete ?? null,
        isReceive:reservationMasterData.isReceive ?? null,
        name:reservationMasterData.name ?? null,
        number:reservationMasterData.number ?? null,



        product: products ?? null
    }

    return reservationContent
}
export function returnTodayReservation(reservationMasterData:any,reservationContent:any){
    //logger.info("reservationMasterData: "+ JSON.stringify(reservationMasterData))
    let todayReservation = {
        time:reservationMasterData.startTime ?? null,
        ...reservationContent
    }
    return todayReservation
}
export function returnReservation(reservationMasterData:any,reservationContent:any){
    //logger.info("reservationMasterData: "+ JSON.stringify(reservationMasterData))
    let todayReservation = {
        time:reservationMasterData.startTime ?? null,
        ...reservationContent ?? null,
        date:reservationMasterData.date ?? null
    }
    return todayReservation
}
export function returnResercationDatasWithDate(todayReservation:any) {
    //logger.info('todayReservations: '+JSON.stringify(todayReservation))
    let resercationDatasWithDate:any = []
    todayReservation.forEach((data:any,index:any)=>{
        //logger.info('todayReservation: '+JSON.stringify(data))
        let date = data.date
        delete data["date"]
        resercationDatasWithDate.push({
            date:date,
            ...data
        })
    })
    return resercationDatasWithDate;
}//
export function returnBasicResult(data:any) {
    const result = {
        status:{
            message: "완료",
            code : 2000
          },
        data:data
    }

    return result;
}//
export function returnBasicErrorResult(error:any) {
    const result = {
        status:{
            message: "실패",
            code : 4000
          },
          error:error
    }

    return result;
}//
export async function retrunProductData(reservationMasterData:any){
    //logger.info('여기야!!!!!!'+JSON.stringify(reservationMasterData))
    let replacements = {reservationMasterId: reservationMasterData.ReservationMasterId};
    let reservationTiredata = await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Tires on ReservationProducts.ProductId = Tires.TireId join Brands on Tires.BrandId = Brands.BrandId where ReservationMasterId = '${reservationMasterData.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0601'`, { type: QueryTypes.SELECT })
    let reservationWheeldata =await sequelize.query(`select *,ReservationProducts.PCCD as ReservationProductsPCCD from ReservationProducts join Wheels on ReservationProducts.ProductId = Wheels.WheelId join Brands on Wheels.BrandId = Brands.BrandId where ReservationMasterId = '${reservationMasterData.ReservationMasterId}' AND ReservationProducts.deletedAt IS NULL AND ReservationProducts.PCCD = 'P0602'`, { type: QueryTypes.SELECT })
    
    let reservationMasterMemberDatabaseQuery =`SELECT * FROM ReservationMasters JOIN Users ON ReservationMasters.UserId = Users.UserId JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId WHERE ReservationMasters.ReservationMasterId = ${reservationMasterData.ReservationMasterId} AND ReservationMasters.deletedAt IS NULL`;
    let reservationMasterNonMemberDatabaseQuery = `SELECT * FROM ReservationMasters JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId WHERE ReservationMasters.ReservationMasterId = ${reservationMasterData.ReservationMasterId} AND ReservationMasters.deletedAt IS NULL`;
    
    const reservationMasterMemberData = await sequelize.query(reservationMasterMemberDatabaseQuery, {type: QueryTypes.SELECT,});
    //logger.info('reservationMasterMemberData(회원) : '+JSON.stringify(reservationMasterMemberData))
    const reservationMasterNonMemberData = await sequelize.query(reservationMasterNonMemberDatabaseQuery, {type: QueryTypes.SELECT,});
    //logger.info('reservationMasterNonMemberData(비회원) : '+JSON.stringify(reservationMasterNonMemberData))

    const reservationMasterDataWithUserData = reservationMasterMemberData[0] ?? reservationMasterNonMemberData[0];
    // logger.info('reservationTiredata(타이어) : '+ JSON.stringify(reservationTiredata))
    // logger.info('reservationWheeldata(휠) : '+ JSON.stringify(reservationWheeldata))
    // logger.info('reservationMasterDataWithUserData : '+ JSON.stringify(reservationMasterDataWithUserData))
    //logger.info(reservationMasterDataWithUserData.name)

    return {reservationTiredata, reservationWheeldata, reservationMasterDataWithUserData}
}//
export function returnNonPastReservationDatas(comparisonDateDatas:any, todayData:any) {
    logger.info('comparisonDate: ' + JSON.stringify(comparisonDateDatas));
    logger.info('todayData: ' + JSON.stringify(todayData));
    logger.info(JSON.stringify(comparisonDateDatas.year));
    logger.info(JSON.stringify(todayData.year));

    // 미래 예약 내역
    let reservationDetails:any = [];

    comparisonDateDatas.forEach((data:any, index:any) => {
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

export async function returnReservations(reservationTimeDatas:any){
    
    let reTodayReservation =[]
    
    for(let i=0;i<reservationTimeDatas.length; i++){
        logger.info(i)
        //logger.info('reservationTimeDatas[i]'+JSON.stringify(reservationTimeDatas[i]))

        let reservationMasters:any[] = await sequelize.query(`select * from ReservationMasters join ReservationTimes on ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId join Calendars on ReservationMasters.CalendarId = Calendars.CalendarId where ReservationMasters.ReservationTimeId = '${reservationTimeDatas[i].ReservationTimeId}' AND ReservationMasters.deletedAt IS NULL`, { type: QueryTypes.SELECT })
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

export async function returnTodayReservations(reservationTimeDatas: any[]) {
    const reTodayReservation = [];

    for (let i = 0; i < reservationTimeDatas.length; i++) {
        // logger.info(i);
        const reReservationContent = [];
        const reservationMasters: any[] = await sequelize.query(
            `SELECT * FROM ReservationMasters 
             JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId 
             WHERE ReservationMasters.ReservationTimeId = '${reservationTimeDatas[i].ReservationTimeId}' 
             AND ReservationMasters.deletedAt IS NULL`, 
            { type: QueryTypes.SELECT }
        );

        // logger.info('reservationMasters: ' + JSON.stringify(reservationMasters));

        for (let x = 0; x < reservationMasters.length; x++) {
            const { reservationTiredata, reservationWheeldata, reservationMasterDataWithUserData } = await returnProductData(reservationMasters[x]);

            reReservationContent.push(returnReservationContent(reservationTiredata, reservationWheeldata, reservationMasterDataWithUserData));

            // logger.info('!!returnReservationContent: ' + JSON.stringify(reReservationContent));

            if (x == reservationMasters.length - 1) {
                reTodayReservation.push(returnTodayReservation(reservationMasters[x], reReservationContent));
            }
        }

        // logger.info('reTodayReservation: ' + JSON.stringify(reTodayReservation));
    }
    return reTodayReservation;
}

export async function returnProductData(reservationMasterData: any) {
    const reservationTiredata: any[] = await sequelize.query(
        `SELECT *, ReservationProducts.PCCD AS ReservationProductsPCCD 
         FROM ReservationProducts 
         JOIN Tires ON ReservationProducts.ProductId = Tires.TireId 
         JOIN Brands ON Tires.BrandId = Brands.BrandId 
         WHERE ReservationMasterId = '${reservationMasterData.ReservationMasterId}' 
         AND ReservationProducts.deletedAt IS NULL 
         AND ReservationProducts.PCCD = 'P0601'`, 
        { type: QueryTypes.SELECT }
    );

    const reservationWheeldata: any[] = await sequelize.query(
        `SELECT *, ReservationProducts.PCCD AS ReservationProductsPCCD 
         FROM ReservationProducts 
         JOIN Wheels ON ReservationProducts.ProductId = Wheels.WheelId 
         JOIN Brands ON Wheels.BrandId = Brands.BrandId 
         WHERE ReservationMasterId = '${reservationMasterData.ReservationMasterId}' 
         AND ReservationProducts.deletedAt IS NULL 
         AND ReservationProducts.PCCD = 'P0602'`, 
        { type: QueryTypes.SELECT }
    );

    const reservationMasterMemberDatabaseQuery = `SELECT * 
                                                  FROM ReservationMasters 
                                                  JOIN Users ON ReservationMasters.UserId = Users.UserId 
                                                  JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId 
                                                  WHERE ReservationMasters.ReservationMasterId = '${reservationMasterData.ReservationMasterId}' 
                                                  AND ReservationMasters.deletedAt IS NULL`;

    const reservationMasterNonMemberDatabaseQuery = `SELECT * 
                                                     FROM ReservationMasters 
                                                     JOIN ReservationTimes ON ReservationMasters.ReservationTimeId = ReservationTimes.ReservationTimeId 
                                                     WHERE ReservationMasters.ReservationMasterId = '${reservationMasterData.ReservationMasterId}' 
                                                     AND ReservationMasters.deletedAt IS NULL`;

    const reservationMasterMemberData = await sequelize.query(reservationMasterMemberDatabaseQuery, { type: QueryTypes.SELECT });
    const reservationMasterNonMemberData = await sequelize.query(reservationMasterNonMemberDatabaseQuery, { type: QueryTypes.SELECT });

    const reservationMasterDataWithUserData = reservationMasterMemberData[0] ?? reservationMasterNonMemberData[0];

    return { reservationTiredata, reservationWheeldata, reservationMasterDataWithUserData };
}

export async function pastMonthData(firstDayOfWeek:any,prevMonthData:any,prevMonthStart:any,todayData:any){
    let date:any = [];
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
            //logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(prevMonthData[prevMonthStart + i -1].CalendarId))
            
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
            CalendarId:prevMonthData[prevMonthStart + i -1].CalendarId,
            OperationTimeId:prevMonthData[prevMonthStart + i -1].OperationTimeId,
            isCurrentMonth:false,
            month: prevMonthData[prevMonthStart + i -1].month,
            day: prevMonthData[prevMonthStart + i -1].day,
            dayOfWeek:prevMonthData[prevMonthStart + i -1].dayOfWeek ?? null,
            isHoliday:prevMonthData[prevMonthStart + i -1].isHoliday ?? null,
            holidayName:prevMonthData[prevMonthStart + i -1].holidayName ?? null,
            reservationPossible:reservationPossible,
        });
    }

    return date
}
export async function thisMonthData(daysInMonth:any,monthData:any,prevMonthStart:any,todayData:any){
    let date:any = [];
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
            //logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(monthData[i].CalendarId))
            
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
            CalendarId:monthData[i].CalendarId,
            OperationTimeId:monthData[i].OperationTimeId,
            isCurrentMonth:true,
            month:monthData[i].month,
            day: monthData[i].day ? monthData[i].day:null,
            dayOfWeek:monthData[i].dayOfWeek ? monthData[i].dayOfWeek:null,
            isHoliday:monthData[i].isHoliday ? monthData[i].isHoliday:null ,
            holidayName:monthData[i].holidayName ? monthData[i].holidayName: null,
            reservationPossible:reservationPossible ? reservationPossible:false, //수정해야함
        });
    }

    return date
}

export async function nextMonthDataArray(daysToAdd:any,nextMonthData:any,prevMonthStart:any,todayData:any){
    let date:any = [];
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
            //logger.info(`prevMonthData[${prevMonthStart + i -1}]: `+JSON.stringify(nextMonthData[i].CalendarId))
            
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

    return date
}

export async function availableTime(data:any){
    let dateData =[];
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
                OperationTimeId: reservationTime[i].OperationTimeId,
                ReservationTimeId:reservationTime[i].ReservationTimeId 
            })
        }
        return dateData;
    } catch (error) {
        logger.error(error)
        
    }
}

export async function reservationTransaction(reservationTimeDataDB:any,calendarDataDB:any,userId:number,name:any,number:any,data:any,product:any) {
    let newReservation:any,newReservationCode:any;
    try {
        await sequelize.transaction(async (transaction)=>{
            //새 예약 생성
            newReservation = await ReservationMaster.create({
                ReservationTimeId: reservationTimeDataDB.ReservationTimeId,
                CalendarId: calendarDataDB.CalendarId,
                OperationTimeId: reservationTimeDataDB.OperationTimeId,
                UserId: userId,
                ReservationCode:String(data.date+'-'+reservationTimeDataDB.startTime),
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
                ReservationCode:String(data.date+'-'+reservationTimeDataDB.startTime+'-'+newReservation.ReservationMasterId)
            },{
                where:{ReservationMasterId:newReservation.ReservationMasterId},
                transaction: transaction
            })
            console.log(JSON.stringify(newReservationCode))
            logger.info('setadsf')
            
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
                return newReservation
    } catch (error) {
        logger.error(error)
    }
}