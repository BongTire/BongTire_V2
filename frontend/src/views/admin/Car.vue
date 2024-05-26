<template>
  <div class="max-w-9xl flex">
  <div class="w-1/2 mr-5 border">
    <TopTaps :conf="visibleKoreanBrand" :state="`k`" :select="selectKoreanBrand" @selectTap="selectBrand"/>
    <div>
      <CardContent :conf="visibleKoreaCar"  />
    </div>
  </div>
    <div class="w-1/2 border">
    <TopTaps :conf="visibleForeignBrand" :state="`f`" :select="selectForeignBrand" @selectTap="selectBrand"/>
    <div>
      <CardContent :conf="visibleForeignCar" />
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
const visibleForeignBrand = ref<IBrand[]>()


// 차량 리스트 데이터
const originCar = ref<ICar[]>([...carData.data])
const visibleKoreaCar = ref<ICar[]>()
const visibleForeignCar = ref<ICar[]>()

// 브랜드 선택 데이터 - index 데이터
const selectKoreanBrand = ref(0)
const selectForeignBrand = ref(0)

const selectBrand = (index: number, state:string) => {
  if(state==='k'){
    selectKoreanBrand.value = index
    const brandId = visibleKoreanBrand.value[index].BrandId
    // TODO : Post 차량 api 호출

  }
  if(state==='f'){
    selectForeignBrand.value = index
    const brandId = visibleForeignBrand.value[index].BrandId
    // TODO : Post 차량 api 호출

  }
}


onMounted(()=>{
  visibleKoreanBrand.value = [...originBrand.value.filter((x)=>x.origin===1)]
  visibleForeignBrand.value = [...originBrand.value.filter((x)=>x.origin===0)]

  visibleKoreaCar.value = [...originCar.value.filter((x=>x.BrandId===1))]
  visibleForeignCar.value = [...originCar.value.filter((x=>x.BrandId===6))]
})

</script>

<style>

</style>