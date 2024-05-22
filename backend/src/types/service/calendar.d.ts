export interface ICalendar{
    CalendarId:number | null
    OperationTimeId: number | null
    year: number
    month: number
    day: number
    dayOfWeek: string | null
    isHoliday: number | null
    holidayName: string | null
    reservationPossible: number
}