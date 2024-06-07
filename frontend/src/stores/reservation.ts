// src/stores/counter.js
import { defineStore } from 'pinia'
import {ICalendar, IReservationProduct, IReservationTime} from '../util/type/reservation'
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
    UserId: null,
    OwnCarId : -1,
    reservationCode: '',
    paymentMethod: 0,
    request: '',
    totalPrice: 0,
    reservationPossible: -1,
    isCancel: 0,
    isComplete: 0,
    isReceive: 0,
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
    setReservationProduct(product:IReservationProduct){
      const productData = {
        ReservationProductId: null,
        ProductId: product.id,
        PCCD: product.PCCD,
        amount: product.amount,
        price: product.price,
        tireLocation: product?.tireLocation ?? [0,0,0,0],
        laborCost: product?.laborCost ?? 0,
        brandName: product.brandName,
        brandLogo: product.brandLogo,
        image: product.image,
        productName: product.productName,
        tireSize: product?.tireSize,
        wheelSize: product?.wheelSize,
        isRecommanded : product.isRecommanded,
        isActive: product.isActive,
        isSecond: product.isSecond,
        isVisible: product?.isVisible ?? 1,
      }
      this.totalPrice += product.price
      this.product.push(productData)
    },
    setReservationUser(user:IUser, payment:number ){
      console.log(user)
      this.name = user?.name ?? ''
      this.number = user?.number ?? ''
      this.UserId = user?.UserId ?? -1
      this.paymentMethod = payment ?? 0
    },
    setDeleteProduct(ProductId:number){
      const index = this.product.findIndex((x:IReservationProduct)=>x.ProductId === ProductId)

      this.totalPrice -= this.product[index].price
      this.product.splice(index,1)
    }
  },
})