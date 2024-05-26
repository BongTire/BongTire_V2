<template>
  <Loading v-if="tireLoading"/>
  <div>
    <Confirm :conf="popupData" :isOpen="isOpenConfirm" @isCancelPopup="isCancelPopup" @isPostData="isPostTireData"/>
    <EditProduct :conf="editTireData" :state="state" :isOpen="openEditDialog" @postTireData="postTireData" @closeDialog="isCloseEditDialog"/>
    <div class=" flex justify-end items-center mt-5">

      <button @click="isOpenEditDialog" type="button" class="rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">+ 타이어 추가</button>
    </div>
    <DataTable :state="state" :conf="tire" @editData="editData"></DataTable>
  </div>
</template>

<script lang="ts" setup>
import Loading from '@component/Common/Loading.vue';
import { IProduct } from '../../util/type/product';
import  {IFetchType} from '../../util/type/common'
import { fetchGetData } from '@api/common.ts'
import DataTable from '@component/Admin/DataTable.vue'
import EditProduct from '@component/Admin/ProductDialog/EditProduct.vue'
import Confirm from "@component/PopUp/Confirm.vue";

const tireLoading = computed(()=>{
  if(tire) return false
  else return true
})

const tire = ref<IProduct[]>([])
const state = 'tire'
const editTireData = ref<IProduct>()
const isOpenConfirm = ref(false)


const popupData = ref({
  title: '',
  message:""
})

onMounted(async ()=>{
  const tirePromise:Promise<IFetchType> = fetchGetData<IFetchType>('/admin/product/tire','','')
  tire.value = await tirePromise
})

const openEditDialog = ref(false)

const isCloseEditDialog = () =>{
  openEditDialog.value = false
}

const isOpenEditDialog = () =>{
  editTireData.value = ''
  openEditDialog.value = true
}


const editData = (editTire:IProduct) =>{
  editTireData.value = editTire
  openEditDialog.value = true
}

const isPostTireData = () =>{
  // confirm에서 승인 누를때 나오는 함수
  // post 전송
  console.log(editTireData.value)
  isOpenConfirm.value = false
}

const postTireData = (message:any, editData:IProduct) =>{
  // 전송 물어보기
  openEditDialog.value = false
  editTireData.value = editData
  popupData.value = {...message}

  isOpenConfirm.value = true

  console.log(editData)
}
const isCancelPopup = () =>{
  // 전송 취소
  isOpenConfirm.value = false
  editTireData.value = ''
}



</script>

<style>

</style>