<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!-- Mobile filter dialog -->
  <TransitionRoot as="template" :show="mobileFiltersOpen">
    <Dialog class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0" leave-to="translate-x-full">
          <DialogPanel
            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">Filters</h2>
              <button type="button"
                class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                @click="mobileFiltersOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Filters -->
            <form class="mt-4">
              <Disclosure as="div" v-for="section in filters" :key="section.name"
                class="border-t border-gray-200 pb-4 pt-4" v-slot="{ open }">
                <fieldset>
                  <legend class="w-full px-2">
                    <DisclosureButton
                      class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                      <span class="text-sm font-medium text-gray-900">{{ section.name }}</span>
                      <span class="ml-6 flex h-7 items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                          aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel class="px-4 pb-2 pt-4">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                        <input :id="`${section.id}-${optionIdx}-mobile`" :name="`${section.id}[]`" :value="option.value"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`${section.id}-${optionIdx}-mobile`" class="ml-3 text-sm text-gray-500">{{
                          option.label }}</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </fieldset>
              </Disclosure>
            </form>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <main class="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="border-b border-gray-200 pb-10">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">상품</h1>
    </div>

    <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <aside>
        <h2 class="sr-only">필터</h2>

        <button type="button" class="inline-flex items-center lg:hidden" @click="mobileFiltersOpen = true">
          <span class="text-sm font-medium text-gray-700">Filters</span>
          <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        </button>

        <div class="hidden lg:block">
          <form class="space-y-10 divide-y divide-gray-200">
            <div v-for="(section, sectionIdx) in filters" :key="section.name"
              :class="sectionIdx === 0 ? null : 'pt-10'">
              <fieldset>
                <legend class="block text-sm font-medium text-gray-900">{{ section.name }}</legend>
                <div class="space-y-3 pt-6">
                  <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                    <input :id="`${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value"
                      type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label :for="`${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label
                      }}</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </aside>

      <!-- Product grid -->
      <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <ProductCard :conf="wheelProduct" />
      </div>
    </div>
  </main>
</template>

<script setup>
import ProductCard from '@component/Product/ProductCard.vue'
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/vue/20/solid'

const filters = [
  {
    id: 'brand',
    name: '브랜드',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  }
]

const tireProducts = [
  {
    id: 1,
    BrandId: 34,
    PCCD: "P0601",
    drivingMethodPCCD: null,
    mCode: null,
    productName: "ROADIAN GTX",
    tireSize: "245/45R19V",
    price: 172150,
    amount: 0,
    discountRate: 20,
    discountPrice: 137720,
    image: "http://61.80.5.166/images/PCCD/Product/Tire/m/45.jpg",
    patternCode: null,
    maxSpeed: null,
    origin: null,
    xl: null,
    ply: null,
    numberOfDataUpdate: 0,
    sales: 0,
    viewers: 0,
    isSecond: 0,
    content: "국내 최고 수준의 마일리지 성능을 가진 사계절용 타이어",
    feature: null,
    isActive: 1,
    isRecommanded: 0,
    createdAt: "2024-05-03T00:00:00.000Z",
    updatedAt: "2024-05-14T14:46:34.000Z",
    brandName: "넥센 타이어",
    brandOrigin: 1,
    brandNation: "한국",
    brandLogo: "http://61.80.5.166/images/PCCD/Product/Tire/Nexen/Logo.png"
  },
  {
    id: 2,
    BrandId: 33,
    PCCD: "P0601",
    drivingMethodPCCD: null,
    mCode: null,
    productName: "크루젠 프리미엄 ",
    tireSize: "235/70R16",
    price: 120890,
    amount: 0,
    discountRate: 27,
    discountPrice: 88000,
    image: "http://61.80.5.166/images/PCCD/Product/Tire/m/28.jpg",
    patternCode: null,
    maxSpeed: null,
    origin: null,
    xl: null,
    ply: null,
    numberOfDataUpdate: 0,
    sales: 0,
    viewers: 0,
    isSecond: 0,
    content: "탁월한 승차감과저소음 -우수한 마모성능 및 제동력 -빗길 주행성능 향상 프로미엄 SUV 타이어의 새 장을 열다",
    feature: "http://61.80.5.166/images/PCCD/Product/Tire/m/28.jpg",
    isActive: 1,
    isRecommanded: 0,
    createdAt: "2024-05-03T00:00:00.000Z",
    updatedAt: "2024-05-03T00:00:00.000Z",
    brandName: "금호 타이어",
    brandOrigin: 1,
    brandNation: "한국",
    brandLogo: "http://61.80.5.166/images/PCCD/Product/Tire/Kumho/Logo.png"
  },
  {
    id: 3,
    BrandId: 32,
    PCCD: "P0601",
    drivingMethodPCCD: null,
    mCode: null,
    productName: "OE 타이어 (SUV/RV 출고용) ",
    tireSize: "215/70R16",
    price: 91300,
    amount: 0,
    discountRate: 10,
    discountPrice: 82000,
    image: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    patternCode: null,
    maxSpeed: null,
    origin: null,
    xl: null,
    ply: null,
    numberOfDataUpdate: 0,
    sales: 0,
    viewers: 0,
    isSecond: 0,
    content: "내구성 위주의 출고용 OE타이어 입니다.",
    feature: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    isActive: 1,
    isRecommanded: 0,
    createdAt: "2024-05-03T00:00:00.000Z",
    updatedAt: "2024-05-03T00:00:00.000Z",
    brandName: "한국 타이어",
    brandOrigin: 1,
    brandNation: "한국",
    brandLogo: "http://61.80.5.166/images/PCCD/Product/Tire/Hankook/Logo.png"
  },
  {
    id: 4,
    BrandId: 32,
    PCCD: "P0601",
    drivingMethodPCCD: null,
    mCode: null,
    productName: "OE 타이어 (SUV/RV 출고용) ",
    tireSize: "215/70R15H",
    price: 100320,
    amount: 0,
    discountRate: 10,
    discountPrice: 90000,
    image: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    patternCode: null,
    maxSpeed: null,
    origin: null,
    xl: null,
    ply: null,
    numberOfDataUpdate: 0,
    sales: 0,
    viewers: 0,
    isSecond: 0,
    content: "내구성 위주의 출고용 OE타이어 입니다.",
    feature: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    isActive: 1,
    isRecommanded: 0,
    createdAt: "2024-05-03T00:00:00.000Z",
    updatedAt: "2024-05-03T00:00:00.000Z",
    brandName: "한국 타이어",
    brandOrigin: 1,
    brandNation: "한국",
    brandLogo: "http://61.80.5.166/images/PCCD/Product/Tire/Hankook/Logo.png"
  },
  {
    id: 5,
    BrandId: 32,
    PCCD: "P0601",
    drivingMethodPCCD: null,
    mCode: null,
    productName: "OE 타이어 (SUV/RV 출고용) ",
    tireSize: "235/75R15H",
    price: 102300,
    amount: 0,
    discountRate: 10,
    discountPrice: 92000,
    image: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    patternCode: null,
    maxSpeed: null,
    origin: null,
    xl: null,
    ply: null,
    numberOfDataUpdate: 0,
    sales: 0,
    viewers: 0,
    isSecond: 0,
    content: "내구성 위주의 출고용 OE타이어 입니다.",
    feature: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    isActive: 1,
    isRecommanded: 0,
    createdAt: "2024-05-03T00:00:00.000Z",
    updatedAt: "2024-05-03T00:00:00.000Z",
    brandName: "한국 타이어",
    brandOrigin: 1,
    brandNation: "한국",
    brandLogo: "http://61.80.5.166/images/PCCD/Product/Tire/Hankook/Logo.png"
  },
  {
    id: 6,
    BrandId: 32,
    PCCD: "P0601",
    drivingMethodPCCD: null,
    mCode: null,
    productName: "OE 타이어 (SUV/RV 출고용) ",
    tireSize: "255/70R15H",
    price: 133540,
    amount: 0,
    discountRate: 10,
    discountPrice: 120000,
    image: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    patternCode: null,
    maxSpeed: null,
    origin: null,
    xl: null,
    ply: null,
    numberOfDataUpdate: 0,
    sales: 0,
    viewers: 0,
    isSecond: 0,
    content: "내구성 위주의 출고용 OE타이어 입니다.",
    feature: "http://61.80.5.166/images/PCCD/Product/Tire/m/2.jpg",
    isActive: 1,
    isRecommanded: 0,
    createdAt: "2024-05-03T00:00:00.000Z",
    updatedAt: "2024-05-03T00:00:00.000Z",
    brandName: "한국 타이어",
    brandOrigin: 1,
    brandNation: "한국",
    brandLogo: "http://61.80.5.166/images/PCCD/Product/Tire/Hankook/Logo.png"
  },
]

const wheelProduct = [
{
            "WheelId": 1,
            "BrandId": 60,
            "PCCD": "P0602",
            "drivingMethodPCCD": null,
            "productName": "재규어 XF 17인치 순정휠 (하이퍼 블랙 도색)",
            "productCode": null,
            "wheelSize": "17인치",
            "frontOffset": null,
            "rearOffset": null,
            "price": 620000,
            "amount": 4,
            "discountRate": 0,
            "discountPrice": 620000,
            "image": null,
            "sales": null,
            "viewers": 994,
            "feature": "TPMS 밸브 및 휠 캡은 포함되지 않습니다.",
            "content": null,
            "isSecond": 0,
            "isVisible": 1,
            "isActivate": 1,
            "isContinue": 1,
            "PCD": null,
            "hole": null,
            "createdAt": "2024-04-14T10:27:54.000Z",
            "updatedAt": "2024-04-14T10:27:54.000Z",
            "deletedAt": null,
            "name": "재규어",
            "codeName": "Jaguar",
            "brandLogo": "http://61.80.5.166/images/PCCD/Car/Jaguar/Logo.png",
            "origin": 0,
            "nation": "영국",
            "id": 1,
            "brandName": "재규어",
            "brandOrigin": 0,
            "brandNation": "영국"
        },
        {
            "WheelId": 2,
            "BrandId": 8,
            "PCCD": "P0602",
            "drivingMethodPCCD": null,
            "productName": "아우디 A5 18인치 정품휠",
            "productCode": null,
            "wheelSize": "18인치",
            "frontOffset": null,
            "rearOffset": null,
            "price": 720000,
            "amount": 4,
            "discountRate": 0,
            "discountPrice": 720000,
            "image": null,
            "sales": null,
            "viewers": 2042,
            "feature": null,
            "content": null,
            "isSecond": 0,
            "isVisible": 1,
            "isActivate": 1,
            "isContinue": 1,
            "PCD": null,
            "hole": null,
            "createdAt": "2024-04-14T10:27:54.000Z",
            "updatedAt": "2024-04-14T10:27:54.000Z",
            "deletedAt": null,
            "name": "아우디",
            "codeName": "Audi",
            "brandLogo": "http://61.80.5.166/images/PCCD/Car/Audi/Logo.png",
            "origin": 0,
            "nation": "독일",
            "id": 2,
            "brandName": "아우디",
            "brandOrigin": 0,
            "brandNation": "독일"
        },
        {
            "WheelId": 3,
            "BrandId": 8,
            "PCCD": "P0602",
            "drivingMethodPCCD": null,
            "productName": "아우디 SQ5 21인치 정품 휠 (낱개 보유중)",
            "productCode": null,
            "wheelSize": "21인치 이상",
            "frontOffset": '8.5+j',
            "rearOffset": '8.5+j',
            "price": 450000,
            "amount": 4,
            "discountRate": 0,
            "discountPrice": 450000,
            "image": null,
            "sales": null,
            "viewers": 382,
            "feature": null,
            "content": null,
            "isSecond": 0,
            "isVisible": 1,
            "isActivate": 1,
            "isContinue": 1,
            "PCD": null,
            "hole": null,
            "createdAt": "2024-04-14T10:27:54.000Z",
            "updatedAt": "2024-04-14T10:27:54.000Z",
            "deletedAt": null,
            "name": "아우디",
            "codeName": "Audi",
            "brandLogo": "http://61.80.5.166/images/PCCD/Car/Audi/Logo.png",
            "origin": 0,
            "nation": "독일",
            "id": 3,
            "brandName": "아우디",
            "brandOrigin": 0,
            "brandNation": "독일"
        },
        {
            "WheelId": 4,
            "BrandId": 18,
            "PCCD": "P0602",
            "drivingMethodPCCD": null,
            "productName": "지프 루비콘 랭글러 중고 임판 휠타이어 17인치 칸 정품 쿠퍼타이어 265-65-17 1세트",
            "productCode": null,
            "wheelSize": "17인치",
            "frontOffset": null,
            "rearOffset": null,
            "price": 0,
            "amount": 4,
            "discountRate": 0,
            "discountPrice": 0,
            "image": null,
            "sales": null,
            "viewers": 2234,
            "feature": "가격문의",
            "content": null,
            "isSecond": 0,
            "isVisible": 1,
            "isActivate": 1,
            "isContinue": 1,
            "PCD": null,
            "hole": null,
            "createdAt": "2024-04-14T10:27:54.000Z",
            "updatedAt": "2024-04-14T10:27:54.000Z",
            "deletedAt": null,
            "name": "지프",
            "codeName": "Jeep",
            "brandLogo": "http://61.80.5.166/images/PCCD/Car/Jeep/Logo.png",
            "origin": 0,
            "nation": "미국",
            "id": 4,
            "brandName": "지프",
            "brandOrigin": 0,
            "brandNation": "미국"
        },
        {
            "WheelId": 5,
            "BrandId": 22,
            "PCCD": "P0602",
            "drivingMethodPCCD": null,
            "productName": "링컨 MKS 19인치 휠 (pcd 114.3)",
            "productCode": null,
            "wheelSize": "19인치",
            "frontOffset": null,
            "rearOffset": null,
            "price": 1150000,
            "amount": 4,
            "discountRate": 0,
            "discountPrice": 1150000,
            "image": null,
            "sales": null,
            "viewers": 2862,
            "feature": "TPMS 밸브 및 휠 캡은 포함되지 않습니다.",
            "content": null,
            "isSecond": 0,
            "isVisible": 1,
            "isActivate": 1,
            "isContinue": 1,
            "PCD": null,
            "hole": null,
            "createdAt": "2024-04-14T10:27:54.000Z",
            "updatedAt": "2024-04-14T10:27:54.000Z",
            "deletedAt": null,
            "name": "링컨",
            "codeName": "Lincoln",
            "brandLogo": "http://61.80.5.166/images/PCCD/Car/Lincoln/Logo.png",
            "origin": 0,
            "nation": "미국",
            "id": 5,
            "brandName": "링컨",
            "brandOrigin": 0,
            "brandNation": "미국"
        },
]



const mobileFiltersOpen = ref(false)
</script>