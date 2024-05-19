<template>
  <div class="max-w-9xl flex">
  <div class="w-1/2 mr-5 border">
    <TopTaps :conf="visibleKoreanBrand"></TopTaps>
    <div>
      <CardContent :conf="visibleKoreaCar"/>
    </div>
  </div>
    <div class="w-1/2 border">
    <TopTaps :conf="visibleForiginBrand"></TopTaps>
    <div>
      <CardContent :conf="visibleForiginCar"/>
    </div>
  </div>
</div>

</template>

<script lang="ts" setup>
import TopTaps from '@component/Admin/TopTabs.vue'
import CardContent from '@component/Admin/CardContent.vue'
import carBrandData from '../../mocks/api/car-brand.json'
import carData from '../../mocks/api/car.json'
import { IBrand } from '../../util/type/brand';
import { ICar, ICarList } from '../../util/type/car';

// 챠량 브랜드 데이터
const originBrand = ref<IBrand[]>([...carBrandData.data])
const visibleKoreanBrand = ref<IBrand[]>()
const visibleForiginBrand = ref<IBrand[]>()


// 차량 리스트 데이터
const originCar = ref<ICar[]>([...carData.data])
const visibleKoreaCar = ref<ICar[]>()
const visibleForiginCar = ref<ICar[]>()


onMounted(()=>{
  visibleKoreanBrand.value = [...originBrand.value.filter((x)=>x.origin===1)]
  visibleForiginBrand.value = [...originBrand.value.filter((x)=>x.origin===0)]

  visibleKoreaCar.value = [...originCar.value.filter((x=>x.BrandId===1))]
  visibleForiginCar.value = [...originCar.value.filter((x=>x.BrandId===6))]
})

</script>

<style>

</style>