<template>
  <Warning :message="dialogMessage" :isOpen="isOpenWarning"/>
  <Confirm :conf="dialogMessage" :isOpen="isOpenConfirm" @isCancelPopup="closeConfirmDialog" @isPostData="sendPostData"/>
  <ResultDialog :message="dialogMessage" :isOpen="isOpenResult" @closeDialog="closeResult"/>
    <div class="flex flex-col w-full max-w-7xl m-auto min-h-svh">
        <div class="h-36 flex justify-between mx-5" >
            <div class="flex flex-col min-w-96">
                <input v-model="title" @input="setTitle" type="text" class="h-16 w-full pl-2 text-2xl" placeholder="제목">
                <div :class="`mt-2 flex ${userInfo?.grade === 0 ? null : 'w-44' } h-12 items-center border border-orange-600 rounded-lg`">
                    <div :class="`cursor-pointer sm:w-44 w-20 text-xs sm:text-md h-full flex justify-evenly items-center rounded-md hover:bg-orange-500 hover:text-white ${categoryPCCD === 'C0501' ? 'bg-orange-600 text-white' : ''}`"
                        @click="clickCategory(0)"
                    >
                        <ChatBubbleLeftRightIcon class="h-4 sm:h-6"/>
                        <p>Q&A</p>
                    </div>
                    <div v-if="userInfo?.grade === 0" :class="`cursor-pointer sm:w-44 w-20 text-xs sm:text-md h-full flex justify-evenly items-center rounded-md hover:bg-orange-500 hover:text-white ${categoryPCCD === 'N0401' ? 'bg-orange-600 text-white' : ''}`"
                        @click="clickCategory(1)"
                    >
                        <MegaphoneIcon class="h-4 sm:h-6"/>
                        <p>공지사항</p>
                    </div>
                    <div v-if="userInfo?.grade === 0" :class="` cursor-pointer sm:w-44 w-20 text-xs sm:text-md h-full flex justify-evenly items-center rounded-md hover:bg-orange-500 hover:text-white ${categoryPCCD === 'N0402' ? 'bg-orange-600 text-white' : ''}`"
                        @click="clickCategory(2)"
                    >
                        <TagIcon  class="h-4 sm:h-6"/>
                        <p>이벤트</p>
                    </div>
                </div>
            </div>
            
            <div class="md:w-64 sm:w-44">
                <div class="isolate -space-y-px rounded-md shadow-sm">
                    <div
                        class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
                        <label for="name" class="block text-xs font-medium text-gray-900">성함</label>
                        <input type="text" name="name" id="name"
                            class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="성함"
                               v-model="userName"
                        />
                    </div>
                    <div
                        class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
                        <label for="job-title" class="block text-xs font-medium text-gray-900">전화번호</label>
                        <input type="text" name="job-title" id="job-title"
                            class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="전화번호"
                               v-model="phoneNumber"
                        />
                    </div>
                </div>
            </div>
        </div>
      <div v-if="isThumb">
        <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">표지 이미지</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500">
                  <span>메인 이미지 업로드</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="uploadThumbnail" />
                </label>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
        <div class="w-full min-h-256 mb-10 mt-10">
            <Edit ></Edit>
        </div>
        <div class="flex justify-between mt-10 mx-5">
            <div class="flex w-128 justify-around">
                <Switch v-model="enabled" :class="[enabled ? 'bg-orange-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2']">
                    <span class="sr-only">잠금 여부</span>
                    <span :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                    <span :class="[enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span :class="[enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                        <svg class="h-3 w-3 text-orange-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                    </span>
                    </span>
                    
                </Switch>
                
                <LockClosedIcon v-if="enabled" class="h-6 ml-2"/>
                <LockOpenIcon v-else class="h-6 ml-2"/>

                <div class="relative flex items-start" v-if="categoryPCCD === 'N0402'">
                  <div class="flex h-6 items-center">
                    <input id="comments" aria-describedby="comments-description" name="comments"  :checked="mainPostBoolean" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600" @click="clickMainPost" />
                  </div>
                  <div class="ml-3 text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-900" >메인 페이지에 게시</label>
                  </div>
                </div>
            </div>
            <div class="w-full flex justify-end items-center ">
                <button
                    type="button"
                    class="w-16 mr-5 rounded-md bg-slate-200 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  취소
                </button>
                <button
                    type="button"
                    class="w-16 rounded-md bg-orange-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    @click="clickSavePost"
                >저장
                </button>
            </div>
        </div>
        

    </div>
</template>

<script lang="ts" setup>
import Edit from '../components/Post/Edit'
import {
    ChatBubbleLeftRightIcon,
    MegaphoneIcon,
    TagIcon,
    LockClosedIcon,
    LockOpenIcon,
} from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'
import { usePostStore } from '../stores/post'
import { exportUserInfo } from '../util/func/common'
import { IPostCategory } from '../util/type/post'
import Warning from "@component/Notification/Warning.vue";
import Confirm from "@component/PopUp/Confirm.vue";
import ResultDialog from "@component/Notification/ResultDialog.vue";
import {fetchPostData} from "@api/common.ts";
import {removeSpaces, validationPhoneNumber} from "../util/func/edit.ts";
import {usePageStore} from "@store/page.ts";
import {IFetchType} from "@/util/type/common.ts";


const store = usePostStore()
const pageStore = usePageStore()
const router= useRouter()

const editData = pageStore.getPostDetail

const enabled = ref(false)

const userInfo = exportUserInfo()
store.setUserId(userInfo?.UserId ?? -1)

const isThumb = ref(false)

const mainPostBoolean = computed(()=>{
  const boolean = store.getIsMainPost

  if(boolean === 1){
    return true
  }else{
    return false
  }
})

const mainPost = ref(false)

const title = ref('')
const userName = ref(userInfo?.name ?? '')
const phoneNumber = ref('')

const categoryPCCD = computed(()=>store.getPCCD)

// 경고용 변수
const isOpenWarning = ref(false)

// 확인 용 dialog 변수
const isOpenConfirm = ref(false)

// 결과 용 dialog 변수
const isOpenResult = ref(false)

const dialogMessage = ref({
  title: '',
  message : '',
  status: ''
})

if(editData){
  const category = {
    PTCD: editData?.PTCD,
    PCCD: editData?.PCCD,
    isAnswer: editData?.isAnswer,
    isThumbnail: editData?.isThumbnail,
    isSecret: editData?.isSecret
  }

  store.setCategory(category)
  title.value = editData?.title
  store.setContent(editData?.content)

}


const clickCategory = (type: number) =>{
    let category:IPostCategory

    if(type===0){
        category = {
            PTCD: 'P0203',
            PCCD : 'C0501',
            isAnswer : 1,
            isThumbnail : 0,
            isSecret : 1
        }
        enabled.value = true
      isThumb.value = false
    }else if(type===1){
        category = {
            PTCD : 'P0202',
            PCCD : 'N0401',
            isAnswer : 0,
            isThumbnail : 1,
            isSecret : 0
        }
      enabled.value = false
      isThumb.value = true
    }else if(type===2){
        category = {
            PTCD : 'P0202',
            PCCD : 'N0402',
            isAnswer : 0,
            isThumbnail : 1,
            isSecret : 0
        }
      enabled.value = false
      isThumb.value = true
    }else{
        return
    }
    store.setCategory(category)
}

const setTitle = () => {
  store.setTitle(title.value)
}


const closeConfirmDialog = () =>{
  isOpenConfirm.value = false
}

watch(() => enabled.value, () => {
  if(enabled.value){
    store.setPostSecret(1)
  }else{
    store.setPostSecret(0)
  }

})


const clickSavePost = () =>{
  const postData = store.getPostData
  if(!postData.title){
    isOpenWarning.value = true
    dialogMessage.value = {
      title: '주의',
      message:'제목을 입력해주세요',
      status: ''
    }
  }

  if(!postData.content){
    isOpenWarning.value = true
    dialogMessage.value = {
      title: '주의',
      message:'내용을 입력해주세요',
      status: ''
    }
  }

  if(postData.isSecret === -1 ){
    isOpenWarning.value = true
    dialogMessage.value = {
      title: '주의',
      message:'카테고리를 선택해주세요',
      status: ''
    }
  }

  if(!userName.value ){
    isOpenWarning.value = true
    dialogMessage.value = {
      title: '주의',
      message:'성함을 입력해주세요',
      status: ''
    }
  }

  if(!phoneNumber.value){
    if(userInfo?.grade !== 0){
      isOpenWarning.value = true
      dialogMessage.value = {
        title: '주의',
        message:'전화번호를 입력해주세요',
        status: ''
      }
    }
  }
  isOpenWarning.value = false
  dialogMessage.value = {
    title: '저장',
    message:'글을 저장하시겠습니까?',
    status: ''
  }
  isOpenConfirm.value = true

}

const sendPostData = async () =>{

  userName.value = removeSpaces(userName.value)
  const isNumber = validationPhoneNumber(phoneNumber.value)

  if(isNumber){
    if(userInfo?.grade !== 0){
      isOpenConfirm.value = false

      isOpenWarning.value = true
      dialogMessage.value = {
        title: '주의',
        message:'전화번호 형식에 맞게 작성해주세요',
        status: ''
      }
      return
    }
  }

  const post = store.getPostData
  const data = {
    data: {
        ...post,
        name: userName.value,
        number: phoneNumber.value
      }
    }

  const response = fetchPostData('/post', {},data)
  const responseState = await response

  if(responseState.status.code === 2000){
    dialogMessage.value = {
      title: '등록 성공',
      message:'글 등록에 성공하였습니다.',
      status: 'success'
    }

  }else{
    dialogMessage.value = {
      title: '등록 실패',
      message:'글 등록에 실패했습니다 관리자에게 문의 부탁드립니다.',
      status: 'error'
    }
  }

  isOpenResult.value = true


}

const closeResult = () =>{
  isOpenResult.value = false
  router.push('/')
}

const uploadThumbnail = async (event) =>{
  const formData = new FormData()

  const file = event.target.files[0]

  formData.append('image', file)

  const imagePromise:Promise<IFetchType> = await fetchPostData('/file-upload/post',{}, formData)
  const imageState = await imagePromise

  console.log(imageState)

  if(imageState?.status.code === 2000){
    store.setThumbnail(imageState.data.imageUrl)
  }else{
    alert(imageState?.status.message ?? '이미지 업로드에 실패했습니다.')
  }

}


const clickMainPost = (event:any) =>{
  mainPost.value = event.target.checked

  console.log(mainPost.value)

  if(mainPost.value){
    store.setIsMainPost(1)
  }else{
    store.setIsMainPost(0)
  }
}


</script>

<style></style>