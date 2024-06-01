<template>
  <div class="w-full max-w-xl overflow-x-auto scrollbar">
    <h2 class="text-xl">예약 물품</h2>
    <div v-for="type in productType" class="flex">
      <div class="h-128 min-w-24 flex flex-col justify-center items-center bg-slate-50">
        <img :src="type.icon" class="h-24">
        <p>{{ type.secondName }}</p>
      </div>
      <div class="overflow-auto flex justify-start items-center" >
        <div v-for="product in productList" >
          <div v-if="product.PCCD === type.PCCD" >
            <ReservationProductCard :conf="product"/>
          </div>
        </div>
        <div
            class="min-w-40 h-40 ml-10 flex flex-col justify-center items-center rounded-md bg-slate-100 hover:bg-slate-50 cursor-pointer"
            @click="moveProductPage(type)"
        >
          <img :src="type.icon" class="h-24">
          <p>상품 더보기</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@store/common.ts'
import { useReservationStore } from '@store/reservation.ts'
import { IPCCD } from '@type/common'
import ReservationProductCard from '@component/Reservation/ReservationProductCard.vue'

const store = useCommonStore()
const ReStore = useReservationStore()
const router = useRouter()

const productType = computed(()=>store.getProductType)
console.log(productType.value)

const productList = computed(()=>ReStore.getReservationProduct)

const moveProductPage = (type:IPCCD) =>{
  router.push(`/${type.secondCodeName}?pccd=${type.PCCD}`)
}


</script>

<style>

</style>