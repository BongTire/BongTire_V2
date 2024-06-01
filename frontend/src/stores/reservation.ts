// src/stores/counter.js
import { defineStore } from 'pinia'
import { ICalendar, IReservationTime } from '../util/type/reservation'
import { IProduct } from '../util/type/product'
import {IUser} from "../util/type/user.ts";

export const useReservationStore = defineStore('reservation', {
  // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
  state: () => ({
    ReservationTimeId: -1,
    CalendarId: -1,
    OperationTimeId: -1,
    year: -1,
    month: -1,
    day: -1,
    date: '',
    UserId: -1,
    OwnCarId : -1,
    reservationCode: '',
    paymentMethod: false,
    request: '',
    totalPrice: 0,
    reservationPossible: -1,
    isCancel: -1,
    isComplete: -1,
    isReceive: -1,
    name: '',
    number: '',
    time: -1,
    product: []     
  }),
  getters: {
    getCalendar: state => {
      return state.CalendarId
    },
    getReservationTime: state=>{return state.ReservationTimeId},
    getReservationAdmin: state=>{
      const data = {
        ReservationTimeId: state.ReservationTimeId,
        reservationPossible:state.reservationPossible
      }
      return data
    },
    getReservationProduct: state=>{return state.product},
    getReservationInfo: state=>{
      const data = {
        ReservationTimeId: state.ReservationTimeId,
        CalendarId: state.CalendarId,
        OperationTimeId: state.OperationTimeId,
        year: state.year,
        month: state.month,
        day: state.day,
        date: state.date,
        UserId: state.UserId,
        OwnCarId : state.OwnCarId,
        reservationCode: state.reservationCode,
        paymentMethod: state.paymentMethod,
        request: state.request,
        totalPrice: state.totalPrice,
        isCancel: state.isCancel,
        isComplete: state.isComplete,
        isReceive: state.isReceive,
        name: state.name,
        number: state.number,
        time: state.time,
        product: state.product
      }
      return data

    }
  },
  // 상태값을 바꾸고 싶을 떄! 
  // 여기서 this 쓰는거 유의하기!
  actions: {
    setCalendar(data:ICalendar) {
        this.CalendarId = data?.CalendarId ?? -1
        this.OperationTimeId = data?.OperationTimeId ?? -1
        this.year = data?.year ?? -1
        this.month = data?.month ?? -1
        this.day = data?.day ?? -1
        this.date = `${data?.year}${data?.month/10 > 1 ? data?.month : '0'+data?.month}${data?.day/10 > 1 ? data?.day : '0'+data?.day}`??''
        this.ReservationTimeId =  -1
        this.time = -1
    },
    setReservationTime(time:IReservationTime){
      this.ReservationTimeId = time?.ReservationTimeId ?? -1
      this.time = time?.startTime ?? -1
      this.reservationPossible = time?.reservationPossible ?? -1
    },
    setReservationProduct(product:IProduct){
      const productData = {
        ReservationProductId: null,
        ProductId: product.id,
        PCCD: product.PCCD,
        amount: product.amount,
        price: product.price,
        tireLocation: product.tireLocation,
        laborCost: product.laborCost,
        brandName: product.brandName,
        brandLogo: product.brandLogo,
        image: product.image,
        productName: product.productName,
        tireSize: product?.tireSize,
        wheelSize: product?.wheelSize,
        isRecommanded : product.isRecommanded,
        isActive: product.isActive,
        isSecond: product.isSecond,
        isVisible: product.isVisible ?? 1,
      }

      this.product.push(productData)
    },
    setReservationUser(user:IUser, payment:boolean ){
      console.log(user)
      this.name = user?.name ?? ''
      this.number = user?.number ?? ''
      this.UserId = user?.UserId ?? -1
      this.paymentMethod = payment ?? false
    },
    setDeleteProduct(ProductId:number){
      const index = this.product.findIndex(x=>x.ProductId === ProductId)
      this.product.splice(index,1)
    }
  },
})