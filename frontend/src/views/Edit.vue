<template>
    <div class="flex flex-col w-full max-w-7xl m-auto min-h-svh">
        <div class="h-36 flex justify-between mx-5" >
            <div class="flex flex-col">
                <input v-model="title" @input="setTitle" type="text" class="h-16 sm:w-1/2 w-full pl-2 text-2xl" placeholder="제목">
                <div class="flex h-12 items-center border border-orange-600 rounded-lg">
                    <div :class="`cursor-pointer sm:w-44 w-20 text-xs sm:text-md h-full flex-1 flex justify-evenly items-center rounded-md hover:bg-orange-500 hover:text-white ${categoryPCCD === 'C0501' ? 'bg-orange-600 text-white' : ''}`"
                        @click="clickCategory(0)"
                    >
                        <ChatBubbleLeftRightIcon class="h-4 sm:h-6"/>
                        <p>Q&A</p>
                    </div>
                    <div v-if="userInfo?.grade && userInfo?.grade === 0" :class="`cursor-pointer sm:w-44 w-20 text-xs sm:text-md h-full flex justify-evenly items-center rounded-md hover:bg-orange-500 hover:text-white ${categoryPCCD === 'N0401' ? 'bg-orange-600 text-white' : ''}`"
                        @click="clickCategory(1)"
                    >
                        <MegaphoneIcon class="h-4 sm:h-6"/>
                        <p>공지사항</p>
                    </div>
                    <div v-if="userInfo?.grade && userInfo?.grade === 0" :class="`cursor-pointer sm:w-44 w-20 text-xs sm:text-md h-full flex justify-evenly items-center rounded-md hover:bg-orange-500 hover:text-white ${categoryPCCD === 'N0402' ? 'bg-orange-600 text-white' : ''}`"
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
        <div class="w-full min-h-256 mb-10">
            <Edit></Edit>
        </div>
        <div class="flex justify-between mt-10 mx-5">
            <div class="flex">
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

            </div>
            <div class="w-full flex justify-end items-center ">
                <button type="button" class="w-16 mr-5 rounded-md bg-slate-200 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500">취소</button>
                <button type="button" class="w-16 rounded-md bg-orange-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">저장</button>
            </div>
        </div>
        

    </div>
</template>

<script lang="ts" setup>
import Edit from '@component/Post/Edit.vue'
import {
    ChatBubbleLeftRightIcon,
    MegaphoneIcon,
    TagIcon,
    LockClosedIcon,
    LockOpenIcon,
} from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'
import { usePostStore } from '@store/post.ts'
import { exportUserInfo } from '../util/func/common'

const store = usePostStore()
const enabled = ref(false)

const userInfo = exportUserInfo()

const title = ref('')
const userName = ref(userInfo?.user?.name ?? '')
const phoneNumber = ref(userInfo?.phoneNumber ?? '')

const categoryPCCD = computed(()=>store.getPCCD)

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
    }else if(type===1){
        category = {
            PTCD : 'P0202',
            PCCD : 'N0401',
            isAnswer : 0,
            isThumbnail : 1,
            isSecret : 0
        }
      enabled.value = false
    }else if(type===2){
        category = {
            PTCD : 'P0202',
            PCCD : 'N0402',
            isAnswer : 0,
            isThumbnail : 1,
            isSecret : 0
        }
      enabled.value = false
    }else{
        return
    }
    store.setCategory(category)
}

const setTitle = () => {
  store.setTitle(title.value)
}

const setContent = () =>{

}

</script>

<style></style>