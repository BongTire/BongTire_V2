<template>
  <div class="w-80 h-100 relative border ml-5">
    <div>
        <img class="h-12" :src="props.conf.brandLogo" >
    </div>
    <!-- 이미지 -->
    <div class="h-48 bg-white">
        <img class="h-full m-auto " :src="props.conf.image" >
    </div>
    <div class="flex justify-between m-5">
        <!-- 타이어 로케이션 -->
        <div class="relative w-40">
            <div class="w-20 h-10 bg-orange-600 absolute opacity-50 rounded-tl-lg"></div>
            <div class="w-20 h-10 bg-orange-600 absolute opacity-50 rounded-tr-lg right-0"></div>
            <div class="w-20 h-10 bg-orange-600 absolute opacity-50 rounded-bl-lg top-10"></div>
            <div class="w-20 h-10 bg-orange-600 absolute opacity-50 rounded-br-lg top-10 right-0"></div>
            <img class="h-20 ml-1" src="@image/systemIcon/Car/top-car-view.png">
            
        </div>
        <!-- 가격, 이름, 사이즈 -->
        <div class="flex flex-col justify-end items-end ">
            <p>{{ props.conf.productName }}</p>
            <p>{{ props.conf?.tireSize ? props.conf?.tireSize : null }}</p>
            <p> {{props.conf?.wheelSize ? props.conf?.wheelSize : null}} </p>
        </div>
    </div>
    <div class="flex justify-end ">
        <p > <span class="text-xl text-orange-600"> {{ props.conf.price }} </span> 원</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IReservationProduct} from '@type/reservation'

const props = defineProps({
    conf:{
        type :Object as PropType<IReservationProduct> | undefined   
    }
})


</script>

<style>

</style>