// src/stores/counter.js
import { defineStore } from 'pinia'
import { ICalendar } from '../util/type/reservation'

export const useReservationStore = defineStore('reservation', {
  // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
  state: () => ({
    ReservationTimeId: null,
    CalendarId: -1,
    OperationTimeId: -1,
    year: -1,
    month: -1,
    day: -1,
    date: '',
    UserId: -1,
    OwnCarId : null,
    reservationCode: null,
    paymentMethod: null,
    request: null,
    totalPrice: null,
    isCancel: null,
    isComplete: null,
    isReceive: null,
    name: null,
    number: null,
    time: null,
    product: []     
  }),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  // 상태값을 바꾸고 싶을 떄! 
  // 여기서 this 쓰는거 유의하기!
  actions: {
    setCalendar(data:ICalendar) {
        console.log(data)
        this.CalendarId = data?.CalendarId ?? -1
        this.OperationTimeId = data?.OperationTimeId ?? -1
        this.year = data?.year ?? -1
        this.month = data?.month ?? -1
        this.day = data?.day ?? -1
        this.date = `${data?.year}${data?.month/10 > 1 ? data?.month+1 : '0'+data?.month+1}${data?.day/10 > 1 ? data?.day : '0'+data?.day}`??''
        

    },
    setReservationTime(){

    },
    setReservationProduct(){

    }
  },
})