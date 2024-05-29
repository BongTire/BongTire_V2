<template>
  <div class="my-3 pr-5 flex w-full justify-end items-center ">
    <div class="mr-5">
      <button
          type="button"
          class="rounded bg-teal-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="openProductType"
      >
        + 상품 타입
      </button>
    </div>
    <div>
      <button
          type="button"
          class="rounded bg-orange-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="openBrandBox"
      >
        + 브랜드 추가
      </button>
    </div>
  </div>
  <div class="max-w-9xl flex">
    <product-type :isOpen="isOpenProductType" @postData="postProductType" @closePopup="closeProductType"/>
    <EditBrand :conf="selectedBrandData" :isOpen="isOpenBrandPopup" @closePopup="closeBrandPopup"/>
    <div class="w-1/2 mr-5 border pb-20">
      <TopTaps :conf="visibleProductType" :state="`k`" :select="selectKoreaProductTypeIndex" @selectTap="selectProductType"/>
      <div>
        <CardContent :state="`k`" :conf="visibleKoreaBrand" @selectCard="selectProductBrand"/>
      </div>
    </div>
    <div class="w-1/2 border pb-20">
      <TopTaps :conf="visibleProductType" :state="`f`" :select="selectForeignProductTypeIndex" @selectTap="selectProductType"/>
      <div>
        <CardContent :state="`f`" :conf="visibleForeignBrand" @selectCard="selectProductBrand"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopTaps from '../../components/Admin/TopTabs'
import CardContent from '../../components/Admin/CardContent'
import { IProductType } from '../../util/type/product';
import { IBrand } from '../../util/type/brand';

import EditBrand from "../../components/Admin/Brand/EditBrand";
import ProductType from "../../components/Admin/Brand/productType";
import {IFetchType, IPCCD} from "../../util/type/common";
import { useCommonStore } from '../../stores/common'
import { fetchGetAdmin } from '../../api/common'

const store = useCommonStore()

// productType 
const originProductType = ref<IProductType[]>()

// PCCD 관련 변수
const visibleProductType = ref<IProductType[]>()
// 브랜드 관련 변수
const visibleKoreaBrand = ref<IBrand[]>()
const visibleForeignBrand = ref<IBrand[]>()

// 선택 변수
const selectKoreaProductTypeIndex = ref(0)
const selectForeignProductTypeIndex = ref(0)

// 브랜드 팝업에 띄울 변수
const isOpenBrandPopup = ref(false)
const selectedBrandData = ref<IBrand>()

// 상품 타입 팝업 띄울 변수
const isOpenProductType = ref(false)

onMounted( async ()=>{
  const productTypePromise:Promise<IFetchType> = fetchGetAdmin('/admin/producttype','')
  const producttype = await productTypePromise

  originProductType.value = producttype.data

  visibleProductType.value = originProductType.value

  console.log(originProductType.value)
  visibleKoreaBrand.value = originProductType.value[selectKoreaProductTypeIndex.value].brand?.filter(x=>x.origin) ?? []
  visibleForeignBrand.value = originProductType.value[selectForeignProductTypeIndex.value].brand.filter(x=>!x.origin) ?? []
})

const selectProductType = (index:number, state:string) =>{
  if(state==='k'){
    selectKoreaProductTypeIndex.value = index
    visibleKoreaBrand.value = originProductType.value[index].brand?.filter(x=>x.origin) ?? []
  }
  if(state === 'f'){
    selectForeignProductTypeIndex.value = index
    visibleForeignBrand.value = originProductType.value[index].brand.filter(x=>!x.origin) ?? []
  }
}

// BrandPop 관련 함수

const openBrandBox = () =>{
  selectedBrandData.value = null
  isOpenBrandPopup.value = true
}

const selectProductBrand = (index:number, state:string) =>{
  if(state==='k'){
    selectedBrandData.value = visibleKoreaBrand.value[index]
  }else if(state === 'f'){
    selectedBrandData.value = visibleForeignBrand.value[index]
  }
  isOpenBrandPopup.value = true
}

const closeBrandPopup = () =>{
  isOpenBrandPopup.value = false
}

// productType 추가 로직
const openProductType = () =>{
  isOpenProductType.value = true
}
const closeProductType = () =>{
  isOpenProductType.value = false
}

const postProductType = (editPCCD:IPCCD) =>{
  console.log(editPCCD)
}

</script>

<style>

</style>