<template>
  <div class="h-screen ">
    <div>
        <p>{{ `${month}월 ${day}일 예약 현황` }}</p>
    </div>
    <div class="flex w-full \">
      <div >
        <div @click="selectTimeFunc(time.time)" v-for="time in reservationTime" :class="`${selectTime === time.time ? 'bg-orange-600 text-white': 'bg-slate-50'}  h-24 w-24 flex justify-center items-center cursor-pointer hover:bg-orange-400 hover:text-white`">
          <p class="text-lg">{{ `${time.time/100} : 00 시` }}</p>
        </div>
      </div>
      <div class="w-full border">
        <div v-if="isReserveData" class="flex overflow-auto">
          <!-- <ReservationProductCard :conf="visibleReservation"/> -->
          <div v-for="reserve in visibleReservation" class="m-5 w-100">
            <div class="w-full flex px-5 justify-between items-center h-24 bg-slate-50 rounded-t-lg">
              <p class="text-lg">{{ reserve.name }}님</p>
              <div>
                <span v-if="reserve.isCancel === 1" class="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  <svg class="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                  예약 취소
                </span>
                <span v-if="reserve.isReceive === 1" class="inline-flex items-center gap-x-1.5 rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                  <svg class="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                  예약 접수
                </span>
                <span v-if="reserve.isComplete === 1" class="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                  <svg class="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                  정비 완료
                </span>
              </div>
              
            </div>
            <div v-for="product in reserve.product" class="py-5 bg-slate-50">
              <ReservationProductCard :conf="product" :state="`admin`"/>
            </div>
            <div class="bg-slate-50 flex px-5 justify-between items-center pb-5 ">
              <p>총 금액 : {{ reserve.totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }}</p>
              <div>
                <button v-if="reserve.isCancel===0&& reserve.isReceive === 1 && reserve.isComplete === 0 " type="button" class="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ml-5">정비 완료</button>
                <button v-if="reserve.isCancel===0 && reserve.isComplete === 0" type="button" class="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ml-5">예약 취소</button>
                <button v-if="reserve.isCancel===0 && reserve.isReceive === 0 && reserve.isComplete === 0" type="button" class="rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ml-5">예약 접수</button>  
              </div>
            </div>
          </div>
        </div>
        <div class="h-full flex justify-center mt-10" v-else>
          <p class="text-2xl">{{ `${month}월 ${day}일 예약이 없습니다.` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";

const date = new Date()
import {IDate, IReservationMaster} from '../../util/type/reservation'
import ReservationProductCard from '@component/Reservation/ReservationProductCard.vue'



const selectTime = ref(date.getHours());


const props = defineProps({
  conf:{
    type: Array as  PropType<IReservationMaster> | undefined
  },
  date:{
    type: Object as PropType<IDate> | undefined
  }
})

const month = ref(date.getMonth()+1)
const day = ref(date.getDate())
const visibleReservation = ref<IReservationMaster[]>()


const uniqueTime:number[] = () =>{
  const uniqueTimes = new Set();
  const result = [];

  props.conf.forEach(item => {
    if (!uniqueTimes.has(item.time)) {
      uniqueTimes.add(item.time);
      result.push(item);
    }
  })

  return result;
}

const reservationTime = ref(uniqueTime())
const isReserveData = ref(false)


watch(() => props.date, () => {
  month.value = props.date?.month ?? date.getMonth()+1
  day.value = props.date?.day ?? date.getDate();

  console.log(props.conf)

  visibleReservation.value = props.conf.filter((item => item?.time === selectTime.value))
  reservationTime.value = uniqueTime()
},{ deep: true })


const selectTimeFunc = (time:number) =>{
  selectTime.value = time
  visibleReservation.value = props.conf.filter(item => item.time === time);
  if(visibleReservation.value.length >= 1){
    isReserveData.value = true
  }else{
    isReserveData.value = false
  } 
  console.log(visibleReservation.value.length)
}



</script>

<style>

</style>