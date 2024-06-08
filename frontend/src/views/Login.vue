<template>
    <div class="absolute top-20 left-20" v-if="errorMessage" >
      <Error :message="errorMessage"/>
    </div>
    <div class="flex min-h-full flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-10 w-auto" src="@image/Company/BongTireLogo.png" alt="Your Company" />
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">로그인</h2>
            
          </div>
  
          <div class="mt-10">
            <div>
              <form @submit.prevent="submitLogin" class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">이메일</label>
                  <div class="mt-2">
                    <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <div>
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                  <div class="mt-2">
                    <input id="password" v-model="password" name="password" type="password" autocomplete="current-password"
                           :required="true" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <!-- <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600" />
                    <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">아이디 저장하기</label>
                  </div>
  
                  <div class="text-sm leading-6">
                    <a href="#" class="font-semibold text-orange-600 hover:text-orange-500">비밀번호 찾기</a>
                  </div>
                </div> -->
  
                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">로그인</button>
                </div>
              </form>
            </div>
  
            <div class="mt-10">
              <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-200" />
                </div>
                <div class="relative flex justify-center text-sm font-medium leading-6">
                  <span class="bg-white px-6 text-gray-900">또는</span>
                </div>
              </div>
  
              <div class="mt-6 grid grid-cols-2 gap-4 ">
                <p @click="clickAuth2" class="flex w-full items-center bg-green-500 justify-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                  <img src="../assets/image/systemIcon/Common/naver-logo.png"/>
                  <span class="text-sm font-semibold leading-6 text-white">Naver</span>
                </p>
  
                <p @click="clickAuth2" class="flex w-full items-center justify-center gap-3 rounded-md bg-yellow-300  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                  <img src="../assets/image/systemIcon/Common/kakao-icon.png" class="h-6"/>
                  <span class="text-sm font-semibold text-white leading-6">KaKao</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="@image/Company/main.jpeg" alt="" />
      </div>
    </div>
  </template>
<script setup lang="ts">
import { IFetchType } from '../util/type/common'
import { fetchPostData } from '../api/common'
import { useUserStore } from '../stores/user'
import Error from '../components/Alert/Error'


const errorMessage = ref('')
const email = ref('')
const password = ref('')
const store = useUserStore()


const submitLogin = async () =>{

  const postLoginData = {
    data:{
      email: email.value,
      password: password.value,
    }
  }

  const LoginPromise:Promise<IFetchType> = fetchPostData<IFetchType>('/auth/local/login',{} ,postLoginData)
  const response = await LoginPromise

  if(!response?.status || response?.status?.code/1000 === 4){
    errorMessage.value = response?.status?.message ?? '로그인 시 오류가 발생했습니다 관리자에 문의 바랍니다'
  }else{
    store.setUserInfo(response)
    sessionStorage.setItem('loginInfo',JSON.stringify(response.data))
    errorMessage.value = ''
    window.location.href = '/'
  }


}

const clickAuth2 = () =>{

}


</script>