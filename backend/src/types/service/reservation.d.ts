export interface IReservationTime{
    ReservationTimeId : number | null
    OperationTimeId: number | null
    startTime: number
    endTime: number
    numberOfReservation: number
    availableNumberOfReservation: number | null
    reservationPossible: number | null
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
    ReservationProductId: number
    ProductId: number | null
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