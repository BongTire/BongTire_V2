<template>
  <div class="max-w-9xl flex">
    <div class="w-1/2 mr-5 border pb-20">
      <TopTaps :conf="visibleProductType"/>
      <div>
        <CardContent :conf="visibleKoreaBrand"/>
      </div>
    </div>
    <div class="w-1/2 border pb-20">
      <TopTaps :conf="visibleProductType"/>
      <div>
        <CardContent :conf="visibleForiginBrand"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopTaps from '@component/Admin/TopTabs.vue'
import CardContent from '@component/Admin/CardContent.vue'
import { IProductType } from '../../util/type/product';
import { IBrand } from '../../util/type/brand';
import productTypeData from '../../mocks/api/product-type.json'

// productType 
const originProductType = ref<IProductType[]>([...productTypeData.data])

// PCCD 관련 변수
const visibleProductType = ref<IProductType[]>()
// 브랜드 관련 변수
const visibleKoreaBrand = ref<IBrand[]>()
const visibleForiginBrand = ref<IBrand[]>()

// 선택 변수
const selectKoreaProductTypeIndex = ref(0)
const selectForiginProductTypeIndex = ref(0)

onMounted(()=>{
  visibleProductType.value = JSON.parse(JSON.stringify(originProductType.value))

  visibleKoreaBrand.value = originProductType.value[selectKoreaProductTypeIndex.value].brand?.filter(x=>x.origin===1) ?? []
  visibleForiginBrand.value = originProductType.value[selectForiginProductTypeIndex.value].brand.filter(x=>x.origin===0) ?? []

})


</script>

<style>

</style>