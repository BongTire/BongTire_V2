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

    <div>
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>
  
          <div class="fixed inset-0 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div class="flex h-16 shrink-0 items-center">
                    <img class="h-10 w-auto" src="@image/Company/BongTireLogo.png" alt="Your Company" />
                  </div>
                  <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" class="-mx-2 space-y-1">
                          <li v-for="(item, index) in navigation" :key="item.name" @click="clickAdminMenu(index)">
                            <router-link :to="item.href" :class="[item.current ? 'bg-gray-50 text-orange-600' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                              <component :is="item.icon" :class="[item.current ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                              {{ item.name }}
                            </router-link>
                          </li>
                        </ul>
                      </li>
                      
                      <li class="mt-auto">
                        <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-orange-600">
                          <Cog6ToothIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-orange-600" aria-hidden="true" />
                          Settings
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Static sidebar for desktop -->
      <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div class="flex h-16 shrink-0 items-center cursor-pointer" @click="moveMainPage">
            <img class="h-12 w-auto" src="@image/Company/BongTireLogo.png" alt="Your Company" />
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li v-for="(item, index) in navigation" :key="item.name" @click="clickAdminMenu(index)">
                    <router-link :to="item.href" :class="[item.current ? 'bg-gray-50 text-orange-600' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                      <component :is="item.icon" :class="[item.current ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                      {{ item.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
              
              <li class="mt-auto">
                <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-orange-600">
                  <Cog6ToothIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-orange-600" aria-hidden="true" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  
      <div class="lg:pl-72">
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
  
          <!-- Separator -->
          <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
  
          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form class="relative flex flex-1" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" aria-hidden="true" />
              <input id="search-field" class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." type="search" name="search" />
            </form>
            <div class="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
  
              <!-- Separator -->
              <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
  
              <!-- Profile dropdown -->
              <Menu as="div" class="relative">
                <MenuButton class="-m-1.5 flex items-center p-1.5">
                  <span class="sr-only">Open user menu</span>
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                    <span class="font-medium leading-none text-white">{{ loginInfo?.name ? loginInfo?.name.slice(0,1) : null  }}</span>
                  </span>
                </MenuButton>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <p @click="clickSubUserMenu(item.href)" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{ item.name }}</p>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
  
        <main class="py-10">
          <div class="px-4 sm:px-6 lg:px-8">
            <!-- Your content -->
            <slot/>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    TruckIcon,
    GlobeAltIcon
  } from '@heroicons/vue/24/outline'
  import {  MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
  import {IFetchType, IPCCD, IPTCD} from "@type/common.js";
  import { fetchGetData, fetchPostData } from "@api/common.js";
  import { useCommonStore } from '@store/common'
  import { exportUserInfo, initSesstionStorage } from '../util/func/common'
  
  const navigation = ref([
    { name: '대시보드', href: '/admin', icon: HomeIcon, current: true },
    { name: '사용자', href: '/admin/user', icon: UsersIcon, current: false },
    { name: '챠량 관리', href: '/admin/car', icon: TruckIcon, current: false },
    { name: '상품 및 브랜드 관리', href: '/admin/product', icon: GlobeAltIcon, current: false },
    { name: '타이어 관리', href: '/admin/tire', icon: DocumentDuplicateIcon, current: false },
    { name: '휠 관리', href: '/admin/wheel', icon: DocumentDuplicateIcon, current: false },
    { name: '예약 관리', href: '/admin/reservation', icon: CalendarIcon, current: false },
  ])

  const router = useRouter()
  const userNavigation = [
    { name: '홈으로', href: '/' },
    { name: '로그아웃', href: '/logout' },
  ]

  const clickAdminMenu = (index:number) =>{
    navigation.value.map((item,i)=>{
      if(index === i) item.current = true
      else item.current = false
    })
  }
  
  const sidebarOpen = ref(false)

  const store = useCommonStore()
  const PTCD = ref<IPTCD>([])
  const PCCD = ref<IPCCD>([])
  const loginInfo = ref(sessionStorage.getItem('loginInfo'))
  loginInfo.value = JSON.parse(loginInfo.value)

  const successMessage = ref('')

  const moveMainPage = () =>{
    router.push('/')
  }

  const clickSubUserMenu = async (url:string)=>{
    if(url === '/logout'){
      const logoutPromise:Promise<IFetchType> = fetchPostData<IFetchType>('/auth/local/logout', {},{data:''})
      const reponse = await logoutPromise

      if(initSesstionStorage(reponse?.status.code)){
        window.location.href = '/'
        return
      }

      if(reponse?.status.code / 1000 === 2){
        successMessage.value = reponse?.status.message
        sessionStorage.setItem('loginInfo',JSON.stringify({}))
        window.location.href = '/'
      }

    }else if(url === '/'){
      router.push('/')
    }
  }

  onMounted(async ()=>{
    const pccdPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/common/pccd', {})
    const pccd = await pccdPromise
    PCCD.value = pccd.data

    const ptcdPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/common/ptcd',{})
    const ptcd = await ptcdPromise
    PTCD.value = ptcd.data

    store.initCommon(PTCD.value, PCCD.value)
  })



  </script>