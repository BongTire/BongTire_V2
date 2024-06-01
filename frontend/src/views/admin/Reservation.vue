<template>
  <div>
    <div class="flex">
      <div class="w-1/2">
        <Calendar :conf="visibleCalendar" :date="date" @selectDate="selectDate" />
      </div>
      <div class="w-100 flex flex-col">
        <Time :conf="visibleTime" @clickAdmin="clickAdminTime"/>
        <div class="flex justify-end items-center mt-5">
          <span class="mr-5">시간 활성화 여부</span>
          <Switch v-model="enabled" :class="[enabled ? 'bg-orange-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2']">
            <span class="sr-only">Use setting</span>
            <span :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
              <span :class="[enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                  <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span :class="[enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                <svg class="h-3 w-3 text-orange-600" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
        </div>
        <div class="flex justify-end items-center mt-5">
          <button type="button" class="rounded mr-5 bg-gray-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">취소</button>
          <button type="button" class="rounded bg-orange-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">저장</button>
        </div>
      </div>
    </div>
    <div>
      <ReservationResult :conf="reserve" :date="date"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ICalendar, IReservationMaster, IReservationTime} from "@type/reservation.ts";
import {IFetchType} from "@type/common.ts";
import {fetchGetAdmin, fetchGetData, fetchPostData} from "@api/common.ts";
import Calendar from '../../components/Reservation/Calendar.vue'
import Time from "@component/Reservation/Time.vue";
import ReservationResult from "@component/Admin/ReservationResult.vue";
import { Switch } from '@headlessui/vue'
import {useReservationStore} from "@store/reservation.ts";


const visibleCalendar = ref<ICalendar[][]>()
const today = new Date()
const presentYear = ref(today.getFullYear())
const presentMonth = ref(today.getMonth() + 1)
const presentDay = ref(today.getDate())
const date = ref({
  year: presentYear.value,
  month: presentMonth.value,
  day: presentDay.value
})

const store = useReservationStore()

const calendarLoading = ref(true)
const timeLoading = ref(true)
const reserveLoading = ref(true)
const enabled = ref(false)


const visibleTime = ref<IReservationTime[]>()

const reserve = ref<IReservationMaster[]>([])
const selectTime = computed(()=>store.getReservationAdmin)

const clickAdminTime = () =>{
  if(selectTime.value.reservationPossible === 1){
    enabled.value = true
  }else{
    enabled.value = false
  }
}

const clickChangeTimePossible = async () =>{
  if(enabled.value){
    selectTime.value.reservationPossible = 1
  }else{
    selectTime.value.reservationPossible = 0
  }

  const data = {
    ReservationTimeId: selectTime.value.ReservationTimeId,
    reservationPossible: selectTime.value.reservationPossible
  }

  // TODO 데이터 쏴주는거 넣기
  const responsePromise = fetchPostData('/admin/reservation/time','','',0,data)
  const responseState = await responsePromise

  console.log(responseState)

}

onMounted(async ()=>{
  const calendarPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/reservation/calendar','R0401','R0801')
  const calendarData = await calendarPromise
  visibleCalendar.value = calendarData.data.date

  date.value = {
    year: calendarData.data.year,
    month: calendarData.data.today.month,
    day: calendarData.data.today.day,
  }

  const postData = {
    data: date.value
  }
  // 시간
  const timePromise:Promise<IFetchType> = fetchPostData<IFetchType>('/reservation/time','R0401','R0801',-1, postData)
  const time = await timePromise
  visibleTime.value = time.data

  const paramsDate = `${date.value.year}${parseInt(date.value.month)/10 < 1 ? '0'+date.value.month : date.value.month}${parseInt(date.value.day)/10 < 1 ? '0'+date.value.day : date.value.day}`
  const reservePromise:Promise<IFetchType> = fetchGetAdmin('/admin/reservation/reservedata', paramsDate)
  const reserveState = await reservePromise
  reserve.value = reserveState.data

  if(visibleCalendar.value){
    calendarLoading.value = false
  }

  if(visibleTime.value){
    timeLoading.value = false
  }

})

const selectDate = async (day:ICalendar) =>{

  date.value = {
    ...date.value,
    month: day.month,
    day: day.day
  }

  const postData = {
    data: date.value
  }

  const timePromise:Promise<IFetchType> = fetchPostData<IFetchType>('/admin/reservation/time','R0401','R0801',-1, postData)
  const time = await timePromise
  visibleTime.value = time.data

  const paramsDate = `${date.value.year}${parseInt(date.value.month)/10 < 1 ? '0'+date.value.month : date.value.month}${parseInt(date.value.day)/10 < 1 ? '0'+date.value.day : date.value.day}`
  const reservePromise:Promise<IFetchType> = fetchGetAdmin('/admin/reservation/reservedata', paramsDate)
  const reserveState = await reservePromise

  reserve.value = reserveState.data


}


</script>

<style>

</style>