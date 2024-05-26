<template>
  <div class="w-80 h-96 relative border ml-5 rounded-md border-gray-200">
    <div class="flex items-center justify-between">
        <img class="h-6" :src="props.conf.brandLogo" >
        <XMarkIcon v-if="productState==='reserve'" @click="clickDeleteProductList" class="w-8 h-8 mt-2 mr-2 rounded-lg hover:bg-slate-100 cursor-pointer "/>
    </div>
    <!-- 이미지 -->
    <div class="h-48 bg-white">
        <img class="h-full m-auto " :src="props.conf.image" >
    </div>
    <div class="flex justify-between m-5">
        <!-- 타이어 로케이션 -->
        <div class="relative w-40">
            <div :class="`${props.conf.tireLocation[0] === 1 ? 'bg-orange-600': ''} w-20 h-10 absolute opacity-50 rounded-tl-lg`"></div>
            <div :class="`${props.conf.tireLocation[1] === 1 ? 'bg-orange-600': ''} w-20 h-10 absolute opacity-50 rounded-tr-lg right-0`"></div>
            <div :class="`${props.conf.tireLocation[2] === 1 ? 'bg-orange-600': ''} w-20 h-10 absolute opacity-50 rounded-bl-lg top-10`"></div>
            <div :class="`${props.conf.tireLocation[3] === 1 ? 'bg-orange-600': ''} w-20 h-10 absolute opacity-50 rounded-br-lg top-10 right-0`"></div>
            <img class="h-20 ml-1" src="@image/systemIcon/Car/top-car-view.png">
            
        </div>
        <!-- 가격, 이름, 사이즈 -->
        <div class="flex flex-col justify-end items-end ">
            <p>{{ props.conf.productName }}</p>
            <p>{{ props.conf?.tireSize ? props.conf?.tireSize : null }}</p>
            <p> {{props.conf?.wheelSize ? props.conf?.wheelSize : null}} </p>
        </div>
    </div>
    <div class="flex justify-end mr-5 ">
        <p ><span class="text-xl text-orange-600 pb-5"> {{ props.conf.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }} </span> 원</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IReservationProduct} from '@type/reservation'
import {
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
import {useReservationStore} from '@store/reservation.ts'

const props = defineProps({
    conf:{
        type :Object as PropType<IReservationProduct> | undefined   
    },
    state:{
        default: 'reserve'
    }
})

const store = useReservationStore()
const productState = props?.state ?? 'reserve'

const clickDeleteProductList = () =>{
    store.setDeleteProduct(props.conf.id)
}


</script>

<style>

</style>