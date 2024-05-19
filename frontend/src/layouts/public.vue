<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-10 w-auto" src="@image/Company/BongTireLogo.png" alt="" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            상품
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in products" :key="item.name" class="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                  <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold text-gray-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                  <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <a href="/board?pccd=P0402" class="text-sm font-semibold leading-6 text-gray-900">이벤트</a>
        <a href="/reservation" class="text-sm font-semibold leading-6 text-gray-900">예약</a>

        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            회사
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
              <a v-for="item in company" :key="item.name" :href="item.href" class="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
            </PopoverPanel>
          </transition>
        </Popover>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">로그인 <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-10 w-auto" src="@image/Company/BongTireLogo.png" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  상품
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in [...products, ...callsToAction]" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</DisclosureButton>
                </DisclosurePanel>
              </Disclosure>

              <a href="/board?pccd=P0402" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">이벤트</a>
              <a href="/reservation" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">예약</a>

              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  회사
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in company" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">로그인</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  <div>
    <slot/>
  </div>
  <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          
            <div v-for="item in navigation.main" className="pb-6">
              <a className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {{item.name}}
              </a>
            </div>
          
        </nav>
        <div  className="mt-10 flex items-center justify-center space-x-10">
          
            <a v-for="item in navigation.social" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <!-- <item.icon className="h-6 w-6" aria-hidden="true" /> -->
              <div v-html="item.icon"></div>
            </a>
          
        </div>
        <p className="mt-5 text-center text-xs leading-5 text-gray-500">제이에이치모터스</p>
           <p className=" text-center text-xs leading-5 text-gray-500">대표 : 이재호</p>
           <p className=" text-center text-xs leading-5 text-gray-500">주소 : 대전광역시 유성구 학하복용서로 89</p>
           <p className=" text-center text-xs leading-5 text-gray-500">사업자등록번호 : 729-08-00209</p>
           <p className=" text-center text-xs leading-5 text-gray-500">통신판매신고번호 : 2016-대전유성-0005</p>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; Copyright 2024 BongTire All right Reserve
        </p>
      </div>
    </footer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  } from '@headlessui/vue'
  import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  import { ChevronDownIcon, PhoneIcon } from '@heroicons/vue/20/solid'

  const products = [
    { name: '타이어', description: '다양한 종류의 타이어', href: '/tire', icon: ShoppingCartIcon },
    { name: '휠', description: '다양한 종류의 저렴한 가격', href: '/wheel', icon: ShoppingCartIcon },
  ]
  const callsToAction = [
    { name: '타이어 검색', href: '#', icon: MagnifyingGlassIcon },
    { name: '전화 예약', href: '#', icon: PhoneIcon },
  ]
  const company = [
    { name: '가게 소개', href: '#' },
    { name: '공지사항', href: '/board?pccd=P0401' },
    { name: '문의사항', href: '/board?pccd=C0501' },
  ]

const mobileMenuOpen = ref(false)

const navigation = {
        main: [
          { name: '매장소개', href: '#' },
          { name: '제휴문의', href: '#' },
          { name: '각종 문의 및 제안', href: '#' },
          { name: '환불 정책', href: '#' },
          { name: '이메일 무단 수집 거부', href: '#' },
        ],
        social: [
          {
            name: 'Kakao',
            href: '#',
            icon: `<svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M253.722 32C297.607 32 338.196 40.5332 375.489 57.5996C412.782 74.6659 442.265 97.8726 463.936 127.22C485.608 156.567 496.444 188.577 496.444 223.252C496.444 257.926 485.608 289.982 463.936 319.42C442.265 348.857 412.827 372.109 375.625 389.175C338.422 406.241 297.787 414.775 253.722 414.775C239.816 414.775 225.458 413.781 210.65 411.795C146.357 456.402 112.134 478.977 107.98 479.518C105.994 480.241 104.098 480.151 102.292 479.248C101.569 478.706 101.027 477.983 100.666 477.08C100.305 476.177 100.124 475.365 100.124 474.642V473.559C101.208 466.515 109.425 437.169 124.776 385.518C89.9207 368.181 62.2443 345.2 41.7466 316.575C21.2489 287.951 11 256.843 11 223.252C11 188.577 21.8358 156.567 43.5074 127.22C65.179 97.8726 94.6614 74.6659 131.955 57.5996C169.248 40.5332 209.837 32 253.722 32ZM130.736 273.909V190.744H152.136C155.026 190.744 158.051 189.706 161.211 187.629C164.372 185.552 165.952 182.708 165.952 179.096C165.952 175.484 164.507 172.459 161.618 170.021C158.728 167.583 155.929 166.364 153.22 166.364H82.7872C79.717 166.364 76.8275 167.267 74.1185 169.073C71.4096 170.879 70.0551 173.859 70.0551 178.012C70.0551 182.166 71.4999 185.327 74.3894 187.494C77.279 189.661 80.5297 190.744 84.1416 190.744H105.542V273.909C105.542 278.424 106.626 282.126 108.793 285.016C110.96 287.905 114.03 289.35 118.003 289.35C121.977 289.35 125.092 287.725 127.349 284.474C129.607 281.223 130.736 277.702 130.736 273.909ZM248.033 289.35C254.715 286.822 256.792 280.411 254.264 270.117C253.541 267.769 248.439 253.728 238.958 227.992C229.477 202.257 224.014 187.584 222.569 183.972C217.693 172.233 211.011 166.364 202.523 166.364C193.312 166.364 186.179 172.233 181.122 183.972C179.677 187.042 174.169 201.987 164.597 228.805C155.026 255.624 150.059 269.394 149.698 270.117C148.434 271.742 148.118 274.722 148.75 279.056C149.382 283.391 151.324 286.37 154.574 287.996C158.186 289.621 161.708 289.802 165.139 288.538C168.571 287.273 170.918 285.377 172.182 282.849L178.684 264.97H225.82C227.806 271.471 229.251 275.715 230.154 277.702C231.057 279.508 232.05 281.314 233.134 283.12C234.217 284.926 236.204 286.686 239.094 288.402C241.983 290.118 244.963 290.434 248.033 289.35ZM320.904 289.35C324.696 289.35 328.173 288.176 331.333 285.829C334.494 283.481 336.074 280.32 336.074 276.347C336.074 272.374 334.629 269.259 331.74 267.001C328.85 264.744 325.238 263.615 320.904 263.615H290.834V181.805C290.834 178.012 289.706 174.491 287.448 171.24C285.191 167.989 282.076 166.364 278.102 166.364C274.129 166.364 271.059 167.809 268.892 170.698C266.725 173.588 265.641 177.29 265.641 181.805V273.909C265.641 278.424 266.725 282.126 268.892 285.016C271.059 287.905 274.129 289.35 278.102 289.35C278.283 289.35 278.599 289.305 279.051 289.215C279.502 289.124 279.818 289.079 279.999 289.079C280.179 289.079 280.495 289.124 280.947 289.215C281.398 289.305 281.714 289.35 281.895 289.35H320.904ZM427.636 287.454C430.707 284.564 432.242 281.268 432.242 277.566C432.242 273.864 431.068 270.568 428.72 267.679C427.636 266.053 416.259 250.793 394.587 221.897C405.062 211.242 415.627 200.587 426.282 189.932C428.991 187.223 430.661 184.017 431.293 180.315C431.926 176.613 430.887 173.136 428.178 169.886C425.108 166.996 421.812 165.822 418.29 166.364C414.769 166.906 411.473 168.712 408.403 171.782C407.861 172.324 405.513 174.716 401.36 178.96C397.206 183.205 391.833 188.668 385.241 195.35C378.65 202.032 372.825 207.991 367.769 213.229V181.805C367.769 178.012 366.64 174.491 364.382 171.24C362.125 167.989 359.01 166.364 355.037 166.364C351.063 166.364 347.993 167.809 345.826 170.698C343.659 173.588 342.575 177.29 342.575 181.805V273.909C342.575 278.424 343.659 282.126 345.826 285.016C347.993 287.905 351.063 289.35 355.037 289.35C359.01 289.35 362.125 287.725 364.382 284.474C366.64 281.223 367.769 277.702 367.769 273.909V249.258C368.491 248.535 369.845 247.136 371.832 245.059C373.819 242.982 375.444 241.311 376.708 240.047C388.628 256.301 399.283 270.658 408.674 283.12C411.202 286.551 414.137 288.763 417.478 289.757C420.819 290.75 424.205 289.982 427.636 287.454ZM185.998 240.589L202.523 192.099L218.776 240.589H185.998Z"></path></svg>`
            
          },
          {
            name: 'Phone',
            href: '#',
            icon: `<svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>`
            ,
          }
        ],
      }


</script>

<style>

</style>