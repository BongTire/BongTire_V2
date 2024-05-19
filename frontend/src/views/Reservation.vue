<template>
  <div class="flex w-full max-w-7xl m-auto">
      <div class="flex flex-col w-1/2">
      <div>
        <Calendar :conf="visibleCalendar" :date="date"/>
      </div>
      <div>
        <Time :conf="visibleTime"/>
      </div>
      <div class="w-full max-w-md">
        <label for="comment" class="block text-sm font-medium leading-6 text-gray-900">요청 사항</label>
        <div class="mt-2">
          <textarea rows="4" name="comment" id="comment" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>

      </div>
    </div>
    <div class="w-1/2">

    </div>
  </div>
  
</template>

<script lang="ts" setup>
import Calendar from '@component/Reservation/Calendar.vue'
import Time from '@component/Reservation/Time.vue'
import ProductInfo from '@component/Reservation/ProductInfo.vue'
import { ICalendar, IReservationTime } from '../util/type/reservation';
import { getCalendar } from '../api/reservation';
import calendarData from '../mocks/api/calendar.json'
import timeData from '../mocks/api/reservation-time.json'

// 캘린더 관련 변수
const originCalendar = ref<ICalendar[]>()
const visibleCalendar = ref<ICalendar[[]]>()
const today = new Date()
const date = {
  year: today.getFullYear(),
  month: today.getMonth()+1,
  day: today.getDate()
}

// 예약 시간 변수
const originTime = ref<IReservationTime[]>()
const visibleTime = ref<IReservationTime[]>()


// await getCalendar('R0401','R0801')
// .then(result=>{
//   originCalendar.value = result.data.data
// })
// .catch(error=>{
//   console.log(error)
// })

onMounted(()=>{
  visibleCalendar.value = [...calendarData.data]
  visibleTime.value = [...timeData.data]
  // console.log(originCalendar)
})


</script>


<style>

</style>