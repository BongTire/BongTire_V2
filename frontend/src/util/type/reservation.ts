export interface ICalendar{
    CalendarId:number | null
    OperationTimeId: number | null
    year: number
    month: number
    day: number
    dayOfWeek: string | null
    isHoliday: number | null | boolean
    holidayName: string | null
    isCurrentMonth : number | null | boolean
    reservationPossible: number | boolean
}

// 기존에 줬던 api 명세와는 다르게 아래와 같은 명세로 진행한다.

/**
 * 
 * {
 *  status:{
 *      code: 2000,
 *      message: ""
 *  },
 *  data:[
 *      {
 *          ICalendarInterface 형식의 데이터
 *       }
 * 
 *  ]
 * }
 * 
 */

export interface IReservationTime{
    ReservationTimeId : number | null
    OperationTimeId: number | null
    startTime: number
    endTime: number
    numberOfReservation: number
    availableNumberOfReservation: number | null
    reservationPossible: number | boolean | null
}

export interface IReservationMaster{
    ReservationMasterId?: number | null
    ReservationTimeId: number
    CalendarId: number | null
    OperationTimeId: number | null
    UserId : number | null
    OwnCarId ?: number | null
    reservationCode?: string|null
    paymentMethod: number | null
    request: string | null
    totalPrice: number
    isCancel: number
    isReceive: number
    isComplete: number
    name: string
    number: string
    time:number
    product: IReservationProduct[]
}

export interface IReservationProduct{
    ReservationProductId?: number | null
    ProductId: number | null
    id?: number | null
    PCCD: string
    amount: number
    price: number
    tireLocation: number[]
    laborCost: number
    brandName?: string
    brandLogo?: string
    image?:string | null
    productName?:string | null
    tireSize?:string | null
    wheelSize?:string | null
    isRecommanded? : number
    isActive?: number
    isSecond?: number
    isVisible?: number
}

export interface IDate{
    year: number
    month: number
    day: number
}

export interface IPaymentParams {
    site_cd?: string | null
    ordr_idxx: string | null
    pay_method?: string | number
    good_name: string
    good_mny: string
    currency: string
    buyr_name: string
    buyr_tel1: string
    buyr_mail: string
    enc_info?: string | null
    enc_data?: string | null
    tran_cd?: string | null
}