<template>
  <ConfirmUser :isOpen="isOpenUserConfirm" @closeDialog="closeUserConfirmDialog" @confirm="confirmUserInfo"/>
  <Loading v-if="postLoading"/>
  <div v-else class="mx-auto max-w-2xl lg:max-w-7xl">
    <div class="relative border-b border-gray-200 pb-5 sm:pb-0">
        <div class="md:flex md:items-center md:justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900">공지사항</h3>
          <div class="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
              <button v-if="userInfo?.grade === 0 || isList" type="button" class="ml-3 inline-flex items-center rounded-md bg-orange-600 pl-2 pr-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                <RouterLink to="/edit" >
                  <PencilSquareIcon class="h-6 w-6" aria-hidden="true" />
                </RouterLink>

              </button>
          </div>
        </div>
        <div class="mt-4">
          <div class="sm:hidden">
              <label for="current-tab" class="sr-only">Select a tab</label>
              <select id="current-tab" name="current-tab" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600">
                <option v-for="tab in tabs" :key="tab.name" >{{ tab.name }}</option>
              </select>
          </div>
        <div class="hidden sm:block">
            <nav class="-mb-px flex space-x-8">
              <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.PCCD ===pccd ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
            </nav>
        </div>
        </div>
    </div>
    <PostList :conf="originBoard" v-if="isList" @movePostDetail="movePostDetail"/>
    <PostCard :conf="originBoard" v-else @movePostDetail="movePostDetail"/>
  </div>
</template>

<script lang="ts" setup>
import PostList from '@component/Post/List.vue'
import PostCard from '@component/Post/Card.vue'
import {
    PencilSquareIcon
  } from '@heroicons/vue/24/outline'
import { IPost } from '../util/type/post';
import { IFetchType } from '../util/type/common'
import { fetchGetData, fetchPostData } from '@api/common'
import {exportUserInfo } from '../util/func/common'
import Loading from '../components/Common/Loading'
import {usePageStore} from "@store/page.ts";
import ConfirmUser from "@component/Post/ConfrimUser.vue";


const route = useRoute()
const router = useRouter()

const userInfo = exportUserInfo()
const pageStore = usePageStore()

console.log(userInfo)

const pccd = computed(()=>route.query.pccd ?? 'N0401')

const CardTabs = [
  { name: '공지사항', href: '/board?pccd=N0401', PCCD: 'N0401' },
  { name: '이벤트', href: '/board?pccd=N0402', PCCD: 'N0402' },
]

const ListTabs = [
  { name: '문의 사항', href: '/board?pccd=C0501', PCCD: 'C0501' },
]

const tabs = computed(()=>{
  return pccd.value.includes('C05') ? ListTabs : CardTabs
})

const isList = computed(()=>{
  return pccd.value==='C0501' || pccd.value==='C0502' ?  true : false
})

const originBoard = ref<IPost[]>()

// 유저 확인용 dialog
const isOpenUserConfirm = ref(false)
const postId = ref<number | null>()
const closeUserConfirmDialog = () =>{
  isOpenUserConfirm.value = false
}

watch(()=>pccd.value,async ()=>{
  if(isList.value){
    postLoading.value = true
    const postPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/post',{ ptcd:'P0203', pccd: pccd.value})
    const boardState = await postPromise
    originBoard.value = boardState.data
  }else{
    const postPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/post', {ptcd:'P0202',pccd: pccd.value})
    const boardState = await postPromise
    originBoard.value = boardState.data
  }
  if(originBoard.value) postLoading.value = false
},{ deep: true })

const postLoading = computed(()=>{
  if(originBoard.value) return false
  else return true
})

onMounted(async ()=>{
  
  if(isList.value){
    const postPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/post', {ptcd:'P0203',pccd: pccd.value})
    const boardState = await postPromise
    originBoard.value = boardState.data
  }else{
    const postPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/post', {ptcd:'P0202',pccd: pccd.value})
    const boardState = await postPromise
    originBoard.value = boardState.data
  }

  console.log(originBoard.value)

   if(originBoard.value) postLoading.value = false
    else postLoading.value = false
})

const movePostDetail = async (post:IPost) =>{
  postId.value = post?.PostId
  const isSecret = post?.isSecret ?? 0
  if(isSecret === 1 && userInfo?.grade !== 0){
    isOpenUserConfirm.value = true
  }else{
    if(isList.value){
      router.push(`/board/${postId.value}?ptcd=P0203&pccd=${pccd.value}`)
    }else{
      router.push(`/board/${postId.value}?ptcd=P0202&pccd=${pccd.value}`)
    }
  }
}

const confirmUserInfo = async (name:string, number:string) =>{

  const postData = {
    data:{
      name: name,
      number: number,
    }
  }

  const detailPromise: Promise<IFetchType> = await fetchPostData<IFetchType>(`/post/${postId.value}`, {ptcd:'P0203',pccd: pccd.value} ,postData)
  const detailState = await detailPromise
  const detail = detailState.data[0]

  pageStore.setPostDetail(detail)

  if(isList.value){
    router.push(`/board/${postId.value}?ptcd=P0203&pccd=${pccd.value}`)
  }else{
    router.push(`/board/${postId.value}?ptcd=P0202&pccd=${pccd.value}`)
  }
}


</script>

<style>

</style>