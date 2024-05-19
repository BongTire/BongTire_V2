<template>
  <div class="w-full max-w-md">
    <div class="my-5 flex justify-between">
      <h1 class="text-xl">예약 날짜</h1>
      <div class="flex">
        <button class="w-6 h-auto hover:bg-slate-100 rounded-xl">
          <ChevronLeftIcon />
        </button>
        <p class="text-lg"> {{ date?.year }} / {{ date?.month }}</p>
        <button class="w-6 h-auto hover:bg-slate-100 rounded-xl">
          <ChevronRightIcon/>
        </button>
      </div>
    </div>
    <div v-for="week in props.conf" class="flex">
      <div v-for="day in week" class="flex">
        <div :class="`w-16 h-14  flex flex-col items-center justify-center hover:bg-slate-50 rounded-lg cursor-pointer`"
          @click="store.setCalendar(day)"
        >
          <p :class="`flex justify-center items-center ${day?.reservationPossible===0 ? 'text-gray-300' : null}
            ${day?.reservationPossible===1 && day?.isHoliday === 1 ? 'text-red-600':null}
          `">{{ day?.day }}</p>
          <p v-if="day?.isHoliday === 1" :class="`text-xs text-center flex 
              justify-center items-center 
              ${day?.reservationPossible===0 ? 'text-gray-300' : 'text-red-600'} 
              `">{{ day?.holidayName??null  }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ICalendar } from '../../util/type/reservation';
import {
    ChevronRightIcon,
    ChevronLeftIcon
  } from '@heroicons/vue/24/outline'
import { useReservationStore } from '@store/reservation.ts'

const store = useReservationStore();
  interface IDate{
    year: number
    month: number
    day: number
  }
  const props = defineProps({
    conf:{
      type: [] as PropType<ICalendar> | undefined
    },
    date:{
      type: Object as PropType<IDate>|undefined
    }
  })

  console.log(props.conf)


</script>

<style>

</style>