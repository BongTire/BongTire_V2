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
import { IFetchType } from  '@type/common'
import { fetchGetData } from '../../api/common'
import { isAuthenticatedAdmin } from '../../util/func/common'

// 챠량 브랜드 데이터
const originBrand = ref<IBrand[]>()
const visibleKoreanBrand = ref<IBrand[]>()
const visibleForeignBrand = ref<IBrand[]>()


// 차량 리스트 데이터
const originCar = ref<ICar[]>()
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


onMounted(async ()=>{

  const carPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/admin/car','','',0)
  const carState = await carPromise
  isAuthenticatedAdmin(carState?.status.code ?? 4001)
  originCar.value = carState.data
  console.log(originCar.value)


  const carBrandPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/admin/brand/car','','',0)
  const brandState = await carBrandPromise
  isAuthenticatedAdmin(brandState?.status.code ?? 4001)

  originBrand.value = brandState.data
  console.log(originBrand.value)

  visibleKoreanBrand.value = [...originBrand.value.filter((x)=>x.origin)]
  visibleForeignBrand.value = [...originBrand.value.filter((x)=>!x.origin)]



  visibleKoreaCar.value = originCar.value[0].carList.filter((x=>x.BrandId===1))
  visibleForeignCar.value = originCar.value[1].carList.filter((x=>x.BrandId===6))


})

</script>

<style>

</style>