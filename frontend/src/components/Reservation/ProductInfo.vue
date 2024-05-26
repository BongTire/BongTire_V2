<template>
  <div class="w-full max-w-md">
    <h2 class="text-xl">예약 물품</h2>
    <div v-for="(type, index) in productType" class="flex">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@store/common.ts'
import { useReservationStore } from '@store/reservation.ts'
import { IPCCD,  IFetchType} from '@type/common'
import ReservationProductCard from '@component/Reservation/ReservationProductCard.vue'

const store = useCommonStore()
const ReStore = useReservationStore()

const productType = computed(()=>store.getProductType)
console.log(productType.value)

const productList = computed(()=>ReStore.getReservationProduct)



</script>

<style>

</style>