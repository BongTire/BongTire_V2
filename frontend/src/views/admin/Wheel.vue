<template>
  <Loading v-if="wheelLoading"/>
  <div v-else>
    <Confirm :conf="popupData" :isOpen="isOpenConfirm" @isCancelPopup="isCancelPopup" @isPostData="isPostWheelData"/>
    <EditProduct :conf="editWheelData" :state="state" :brand="productBrand" :isOpen="openEditDialog" @postTireData="postWheelData" @closeDialog="isCloseEditDialog"/>
    <div class="flex justify-end items-center mt-5">
      <button @click="isOpenEditDialog" type="button"
              class="rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
        + 휠 추가
      </button>
    </div>
    <DataTable :state="state" :conf="wheel" @editData="editData"></DataTable>
  </div>
</template>

<script lang="ts" setup>
import Loading from '@component/Common/Loading';
import {IProduct} from "@type/product";
import {IBrand} from '@type/brand'
import {IFetchType} from "@type/common";
import {fetchGetData, fetchPostData} from "@api/common";
import DataTable from "@component/Admin/DataTable";
import Confirm from "@component/PopUp/Confirm";
import EditProduct from "@component/Admin/ProductDialog/EditProduct";
import { isAuthenticatedAdmin } from '../../util/func/common'


const wheelLoading = computed(()=>{
  if(wheel) return false
  else return true
})

const wheel = ref<IProduct[]>([])
const state = 'wheel'
const editWheelData = ref<IProduct>()
const isOpenConfirm = ref(false)
const popupData = ref({
  title: '',
  message:""
})
const openEditDialog = ref(false)
const productBrand = ref<IBrand[]>()

onMounted(async ()=>{
  const wheelPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/admin/product/wheel','','',0)
  const wheelFetch = await wheelPromise

  const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', 'P0301', 'F0902',0)
  const filterState= await filterPromise
  productBrand.value = filterState.data[0].value

  isAuthenticatedAdmin(wheelFetch.status.code)
  wheel.value = wheelFetch.data
})

const isCloseEditDialog = () =>{
  openEditDialog.value = false
}

const isOpenEditDialog = () =>{
  editWheelData.value = ''
  openEditDialog.value = true
}


const editData = (editTire:IProduct) =>{
  console.log(editTire)
  editWheelData.value = editTire
  openEditDialog.value = true
}

const isPostWheelData = () =>{
  // confirm에서 승인 누를때 나오는 함수
  // post 전송
  console.log(editWheelData.value)
  isOpenConfirm.value = false
}

const postWheelData = (message:any, editData:IProduct) =>{
  // 전송 물어보기
  openEditDialog.value = false
  editWheelData.value = editData
  popupData.value = {...message}

  isOpenConfirm.value = true

  const response = fetchPostData('/admin/product/wheel','','',0,editData)
  console.log(response)
}
const isCancelPopup = () =>{
  // 전송 취소
  isOpenConfirm.value = false
  editWheelData.value = ''
}

</script>

<style>

</style>