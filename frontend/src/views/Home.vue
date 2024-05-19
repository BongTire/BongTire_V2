<template>
    <div class="w-full max-w-7xl m-auto">
        <div class="flex justify-between">
            <favWiget v-for="fav in favWigetData"  :conf="fav"/>
        </div>
        <div class="mt-10">
            <IntroService/>
        </div>
        <div class="mt-10">
            <IntroProduct/>
        </div>
    </div>  
</template>

<script lang="ts" setup>
import { getTest } from '@api/test.js';
import IntroService from '@component/Main/IntroService.vue';
import IntroProduct from '@component/Main/IntroProduct.vue';
import favWiget from '@component/Main/FavWiget.vue';

const favWigetData = [
    {
        id: 1,
        isUrl : true,
        url: "/product/tire?pccd=P0601",
        title: "타이어",
        icon: "/src/assets/image/systemIcon/Car/tire-icon.png"
    },
    {
        id: 2,
        isUrl : true,
        url: "/product/tire?pccd=P0601&isSecond=1",
        title: "중고 타이어",
        icon: `/src/assets/image/systemIcon/Car/tire-test-icon.png`
    },
    {
        id: 2,
        isUrl : true,
        url: "/product/wheel?pccd=P0602",
        title: "휠",
        icon: `/src/assets/image/systemIcon/Car/wheel-icon.png`
    },
    {
        id: 3,
        isUrl : false,
        url: "/product/wheel?pccd=P0602&isSecond=1",
        title: "중고 휠",
        icon: `/src/assets/image/systemIcon/Car/wheel-icon 1.png`
    },
    {
        id: 4,
        isUrl : true,
        url: "/reservation?pccd=R0801",
        title: "예약",
        icon: `/src/assets/image/systemIcon/Car/car-repair-icon.png`
    },
    {
        id: 4,
        isUrl : false,
        url: '',
        title: "예약 조회",
        icon: `/src/assets/image/systemIcon/Car/car-repair-icon.png`
    },
]







</script>

<style>

</style>