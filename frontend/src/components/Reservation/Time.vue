<template>
  <div class="my-5 flex justify-between items-center w-full max-w-md">
    <h1 class="text-xl">예약 시간</h1>
  </div>
  <div class="flex w-full max-w-md flex-wrap justify-between">
    <div v-for="time in props.conf" 
      :class="`w-20 h-16  mt-5 flex flex-col justify-center items-center rounded-xl 
        ${selectTime === time?.ReservationTimeId ? 'bg-orange-600 text-white' : 'bg-slate-50'}
        ${time.reservationPossible === 1 ? 'hover:text-white hover:bg-orange-500 ' : 'bg-white text-gray-300'}  
        cursor-pointer`" 
      @click="clickTime(time)"
      >
      <p>
        {{ time?.startTime/100?? '' }}시
      </p>
      <p v-if="time?.availableNumberOfReservation > 0">
        {{ time?.availableNumberOfReservation === 0 || time.reservationPossible === 0 ? null : time?.availableNumberOfReservation +' 자리'   }} 
      </p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { IReservationTime } from '../../util/type/reservation';
import { useReservationStore } from '@store/reservation.ts'

const store = useReservationStore();


const props = defineProps({
  conf:{
    type: Array as PropType<IReservationTime>
  }
})

const emits = defineEmits(['clickAdmin'])

const clickTime = (time) =>{
  if(time?.reservationPossible === 0 || !time?.reservationPossible){
    // TODO 경고 메시지 띄우기
    return 
  }
  console.log(time)
  store.setReservationTime(time)

  emits('clickAdmin')
}

const selectTime = computed(()=>store.getReservationTime)




</script>

<style>

</style>