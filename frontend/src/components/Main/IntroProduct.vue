<template>
    <div class="relative bg-white rounded-md">
        <div class="relative h-80 overflow-hidden bg-orange-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2 rounded-md">
            <img class="h-full w-full object-cover rounded-md" src="@image/Company/main2.jpeg" alt="">
        </div>
        <div class="relative mx-auto max-w-7xl py-10 sm:py-14 lg:px-8 lg:py-40">
            <div class="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
                <p class="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">최저가</p>
                <p class="mt-6 text-base leading-7 text-gray-600">박리다매를 통한 최저가 달성</p>
                <div class="mt-8">
                <a href="#" class="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">타이어 보러가기</a>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup type="ts">
  import { ref } from 'vue'
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  
  </script>