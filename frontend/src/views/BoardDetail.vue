<template>
  <Success :isOpen="isOpenSuccess" :message="notiMessage"/>
  <Error :isOpen="isOpenError" :message="notiMessage" />
    <div class="bg-white px-6 py-32 lg:px-8">
      <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <!-- 현재 페이지 명 -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-base font-semibold leading-7 text-orange-600">
              {{ category }}
            </p>
            <!-- 해당 게시물에 대한 제목 -->
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {{ detail?.title ?? '' }}
            </h1>
            <!-- 작성자 -->
            <p class="text-base font-semibold leading-7 text-gray-600">
              {{ detail?.writerName ?? '' }}
            </p>
          </div>
          <div v-if="userInfo?.grade === 0 || pccd==='C0501'" class="flex">
            <TrashIcon class="h-6 w-6 hover:bg-slate-100 rounded-lg text-gray-400 mr-2" @click="clickTrash(detail?.PostId)"/>
            <PencilIcon class="h-6 hover:bg-slate-100 rounded-lg text-gray-400" @click="clickEdit" />
          </div>
        </div>
        <div v-if="detail?.thumbnail">
          <img :src="detail?.thumbnail ?? ''" alt="" />
        </div>

        <div v-html="detail?.content" class="min-h-screen"></div>
        <!-- 댓글 시작 -->
      <div v-if="detail?.isAnswer === 1" class="flex items-start space-x-4 mt-10">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
            <!-- username -->
            <span class="font-medium leading-none text-white">관</span>
        </span>
        <div class="min-w-0 flex-1">
            <form @submit.prevent="postComment">
                <div class="border-b border-gray-200 focus-within:border-orange-600">
                    <label for="comment" class="sr-only">Add your comment</label>
                    <!-- 관리자가 아니라면 disable -->
                        <textarea
                            rows="3"
                            name="comment"
                            id="comment"
                            class="block w-full pl-2 resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-600 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="답변"
                            v-model="comment"
                            :disabled="detail?.answer ? true : false"
                        />
                </div>
                <div class="flex justify-between pt-2">
                    <div class="flex items-center space-x-5">    
                    </div>
                    <div class="flex-shrink-0">
                        <button
                            type="submit"
                            class="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            :disabled="userInfo?.grade !== 0 || detail?.answer ? true : false"
                        >
                          등록
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </div>
      </div>
      
    </div>
</template>
  
<script setup lang="ts">

import { IPost } from '../util/type/post';
import {
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import {IFetchType, IPCCD} from '../util/type/common'
import { useCommonStore } from '../stores/common'
import { fetchPostData } from '@api/common.ts'
import {usePageStore} from "@store/page.ts";
import {exportUserInfo } from '../util/func/common'
import Success from "@component/Notification/Success";
import Error from "@component/Notification/Error";



const pccd = computed(()=>route.query.pccd ?? 'N0401')
const ptcd = computed(()=>route.query.ptcd ?? 'C0202')

const route = useRoute()
const router = useRouter()

const detail = ref<IPost>()
const store = useCommonStore()
const pageStore = usePageStore()

const PCCDArray = store.getPCCD

const userInfo = exportUserInfo()
const postDetailInfo = pageStore.getPostDetail


const comment = ref('')

const categoryInfo = ref<IPCCD[]>()
const category = ref('')

// 댓글 등록 성공 여부
// 성공
const isOpenSuccess = ref(false)
const isOpenError = ref(false)

const notiMessage = ref({
  title: '',
  message: ''
})


onMounted( async ()=>{

  if(postDetailInfo && postDetailInfo?.PostId === Number(route.params.id)){
    detail.value = postDetailInfo
    categoryFunc(detail.value?.PCCD)
    comment.value = detail.value?.answer ?? ''

  }else{
    getApiData()
  }

})


const getApiData = async () =>{
  const detailPromise: Promise<IFetchType> = await fetchPostData<IFetchType>(`/post/${route.params.id}`,{ptcd:ptcd.value,pccd: pccd.value} ,{data:null})
  const detailState = await detailPromise

  if(Math.floor(detailState.status.code/1000) === 4){
    return
  }

  detail.value = detailState.data[0]
  categoryFunc(detail.value?.PCCD)
  comment.value = detail.value?.answer ?? ''
}

const postComment = async () =>{

  if(userInfo?.grade === 0){
    const commentPromise:Promise<IFetchType> = await fetchPostData<IFetchType>(`/post/comment/${route.params.id}`, {ptcd:ptcd.value,pccd: pccd.value} ,{answer: comment.value})
    const commentState = await commentPromise
    if(commentState.status.code/1000 === 2) {
      notiMessage.value= {
        title: '성공',
        message: '댓글 등록에 성공 했습니다.'
      }
      isOpenSuccess.value = true

    }else if(commentState.status.code/1000 === 4){
      notiMessage.value= {
        title: '실패',
        message: '댓글 등록에 실패 했습니다.'
      }
      isOpenError.value = true
    }

    // router.push('/board?pccd=C0501')
  }
  else{

  }
}

const categoryFunc = (pagePCCD:string = '') =>{

  categoryInfo.value = PCCDArray.filter(x=>x.PCCD===pagePCCD ?? '') ?? []
  if(categoryInfo.value?.length >= 1){
    category.value = categoryInfo.value[0]?.secondName ?? ''
  }
}

const clickEdit = () =>{
  pageStore.setPostDetail(detail.value)
  router.push(`/edit`)
}

const clickTrash = async (id:number) =>{


  const postData = {
    data: {
      PostId : id
    }
  }

  const removePostPromise:Promise<IFetchType> = await fetchPostData('/post/delete', {}, postData)
  const removeState = await removePostPromise

  if(removeState.status.code === 2000){
    router.push(`/board?pccd=${pccd.value}`)
  }else{
    notiMessage.value= {
      title: '실패',
      message: removeState.status.message
    }
    isOpenError.value = true
  }

}


  </script>