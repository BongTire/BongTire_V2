<template>
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-orange-600/20 rounded-md">
      <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-orange-600/10 ring-1 ring-orange-50 sm:-mr-80 lg:-mr-96" aria-hidden="true" />
      <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h2 class="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">고품질 서비스</h2>
          <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p class="text-lg leading-8 text-gray-600">봉타이어는 최고의 첨단 장비와 최고의 기술 인력을 통해 고객 분들에게 최상의 서비스를 제공하고 있습니다.</p>
            <div class="mt-10 flex items-center gap-x-6">
              <a href="#" class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">문의사항</a>
            </div>
          </div>
          <img src="@image/Company/main.jpeg" alt="" class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  </template>
  
  <script setup type="ts">
  import { ref } from 'vue'
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

  
  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]
  
  const mobileMenuOpen = ref(false)
  </script>