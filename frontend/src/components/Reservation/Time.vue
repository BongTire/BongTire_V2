<template>
  <div class="my-5 flex justify-between items-center w-full max-w-md">
    <h1 class="text-xl">예약 시간</h1>
  </div>
  <div class="flex w-full max-w-md flex-wrap justify-between">
    <div v-for="time in props.conf" class="w-20 h-16 bg-slate-50 mt-5 flex justify-center items-center rounded-xl hover:text-white hover:bg-orange-500 cursor-pointer">
      <p>
        {{ time?.startTime/100?? '' }}시
      </p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { IReservationTime } from '../../util/type/reservation';


const props = defineProps({
  conf:{
    type: Array as PropType<IReservationTime>
  }
})

</script>

<style>

</style>