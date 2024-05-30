<template>
  <CheckUser :isOpen="isOpenCheckUser" @closePopup="closeCheckUser"/>
  <div class="flex w-full max-w-7xl m-auto">
      <div class="flex flex-col w-1/2">
      <div>
        <Calendar :conf="visibleCalendar" :date="date" @selectDate="selectDate"/>
      </div>
      <div>
        <Time :conf="visibleTime"/>
      </div>
      <div class="w-full max-w-md ">
        <label for="comment" class="block mt-10 text-xl font-medium leading-6 text-gray-900">요청 사항</label>
        <div class="mt-2">
          <textarea rows="4" name="comment" id="comment" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>

      </div>
    </div>
    <div class="w-1/2 overflow-y-auto h-screen w-1/2 scrollbar scrollbar-thumb:hover">
      <ProductInfo/>
    </div>
  </div>
  <div class="w-full flex justify-end items-center pr-10">
    <button
        type="button"
        class="w-20 mr-5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      취소
    </button>
    <button
        type="button"
        class="w-20 rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="openCheckUser"
    >
      예약
    </button>
  </div>
  
</template>

<script lang="ts" setup>
import Calendar from '../components/Reservation/Calendar'
import Time from '../components/Reservation/Time'
import CheckUser from '../components/PopUp/CheckUser'
import ProductInfo from '../components/Reservation/ProductInfo'
import { ICalendar, IReservationTime } from '../util/type/reservation';
import { IFetchType } from '../util/type/common'
import { fetchGetData, fetchPostData } from '../api/common'

// 캘린더 관련 변수
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

// 예약 시간 변수
const originTime = ref<IReservationTime[]>()
const visibleTime = ref<IReservationTime[]>()

const isOpenCheckUser = ref(false)

const closeCheckUser = ( ) =>{
  isOpenCheckUser.value = false
}

const openCheckUser = ( ) =>{
  isOpenCheckUser.value = true
}

onMounted(async ()=>{
  // 캘린더
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
  console.log(postData)
  // 시간
  const timePromise:Promise<IFetchType> = fetchPostData<IFetchType>('/reservation/time','R0401','R0801', postData)
  const time = await timePromise
  visibleTime.value = time.data

  const calendarLoading = computed(()=>{
    if(visibleCalendar.value) false
    else true
  })

  const timeLoading = computed(()=>{
    if(visibleTime.value) false
    else true
  })
})

const selectDate = async (day:ICalendar) =>{
  console.log(day)

  date.value={
    ...date.value,
    month: day.month,
    day: day.day
  }

  const postData = {
    data: date.value
  }

  const timePromise:Promise<IFetchType> = fetchPostData<IFetchType>('/reservation/time','R0401','R0801', postData)
   const time = await timePromise
  visibleTime.value = time.data
}

</script>


<style>

</style>