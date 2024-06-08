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
              <h2 class="text-lg font-medium text-gray-900">필터</h2>
              <button type="button"
                class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                @click="mobileFiltersOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Filters -->
            <form class="mt-4">
              <Disclosure as="div" v-for="filter in productFilters" :key="filter.BrandId"
                class="border-t border-gray-200 pb-4 pt-4" v-slot="{ open }">
                <fieldset>
                  <legend class="w-full px-2">
                    <DisclosureButton
                      class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                      <span class="text-sm font-medium text-gray-900">{{ filter.name }}</span>
                      <span class="ml-6 flex h-7 items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                          aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel class="px-4 pb-2 pt-4">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in filter.value" :key="option.value" class="flex items-center">
                        <input :id="`${optionIdx}-mobile`" :name="`${optionIdx}`" 
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          @click="selectFilterFunc(option)"
                        />
                        <label :for="`${optionIdx}-mobile`" class="ml-3 text-sm text-gray-500">{{
                          option.name }}</label>
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
  <Loading v-if="productLoading && filterLoading"/>
  <main v-else class="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="border-b border-gray-200 pb-10">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{ productTitle[0].secondName }}</h1>
    </div>

    <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <aside>
        <h2 class="sr-only">필터</h2>

        <button type="button" class="inline-flex items-center lg:hidden" @click="mobileFiltersOpen = true">
          <span class="text-sm font-medium text-gray-700">필터</span>
          <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        </button>

        <div class="hidden lg:block">
          <form class="space-y-10 divide-y divide-gray-200">
            <div v-for="(filter, filterIdx) in productFilters" :key="filterIdx"
              :class="filterIdx === 0 ? null : 'pt-10'">
              <fieldset>
                <legend class="block text-sm font-medium text-gray-900">{{ filter.name }}</legend>
                <div class="space-y-3 pt-6">
                  <div v-for="(option, optionIdx) in filter.value" :key="optionIdx" class="flex items-center">
                    <input :id="`${optionIdx}`" :name="`${optionIdx}[]`"
                            type="checkbox"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                           @click="selectFilterFunc(option)"
                    />
                    <label :for="`${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.name
                      }}</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </aside>

      <!-- Product grid -->
      <!-- 상품 박스 -->
      <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <ProductCard :conf="products" @moveDetailPage="moveDetailPage" />
      </div>

    </div>
    <PageNation class="mt-10" :total="totalProduct" :currentPage="currentPage" @moveOtherPage="moveOtherPage" />
  </main>

</template>

<script lang="ts" setup >
import ProductCard from '@component/Product/ProductCard'
import Loading from '@component/Common/Loading'
import PageNation from '@component/Common/PageNation'
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
import { IFetchType } from '../util/type/common'
import { fetchGetData, fetchPostData } from '@api/common'
import {IBrand} from "@type/brand.ts";
import {useCommonStore} from "@store/common.ts";

const store = useCommonStore()
const route = useRoute();
const router = useRouter()

const PCCD = computed(()=>{return route.query.pccd})
const isSecond = computed(()=> {
  return route.query?.isSecond ?? 0
})

const PCCDArray = store.getProductType
console.log(PCCDArray)

const productTitle = ref(PCCDArray.filter(x=>x.PCCD===PCCD.value))


const mobileFiltersOpen = ref(false)

const products = ref<IProduct[]>()
const productFilters = ref<IFilter | null>(null)

const filterLoading = ref(true)

const productLoading = ref(true)

// pageNation할 때 필요한 변수
const totalProduct = ref(-1)
const currentPage = ref(1)

// 필터 관련 변수
const selectFilter = ref<number[]>([])

const selectFilterFunc = async (filter:IBrand) =>{

  let productState:any
  if(selectFilter.value.includes(filter.BrandId)){
    const brandArray:number[] = selectFilter.value.filter(item=>item!=filter.BrandId)
    selectFilter.value = brandArray
  }else{
    const brandArray:number[] = [...selectFilter.value, filter.BrandId]
    selectFilter.value = brandArray
  }

  console.log(selectFilter.value)
  if(selectFilter.value.length >= 1){
    const productPromise:Promise<IFetchType> = fetchPostData<IFetchType>('/product/filter', {
      ptcd:'P0301',
      pccd:PCCD.value,
      page:currentPage.value
    }, {
      data:selectFilter.value
    })
    productState = await productPromise;
  }else{
    const productPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301',pccd: PCCD.value, page:1, isSecond:isSecond.value})
    productState = await productPromise;
  }

  products.value = productState.data
}


onMounted(async () => {

  const productPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301',pccd: PCCD.value, page:1, isSecond:isSecond.value})
  const productState = await productPromise;
  products.value = productState.data

  totalProduct.value = productState.total ?? -1

  if(PCCD.value==='P0601'){
    const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301', pccd:'F0901', isSecond:isSecond.value})
    const filterState= await filterPromise
    productFilters.value = filterState.data
  }
  
  if(PCCD.value==='P0602'){
    const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301',pccd: 'F0902', isSecond:isSecond.value})
    const filterState= await filterPromise
    productFilters.value = filterState.data
  }

  if(productFilters?.value){
    filterLoading.value = false
  }else {
    filterLoading.value = false
  }

  if(products?.value){
    productLoading.value = false
  }else {
    productLoading.value = true
  }

})

watch(()=>PCCD.value,async ()=>{

  filterLoading.value = true
  productLoading.value = true
  productTitle.value = PCCDArray.filter(x=>x.PCCD===PCCD.value)

  const productPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301',pccd: PCCD.value, page:1})
  const productState = await productPromise;
  products.value = productState.data

  totalProduct.value = productState.total ?? -1

  if(PCCD.value==='P0601'){
    const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301', pccd:'F0901'})
    const filterState= await filterPromise
    productFilters.value = filterState.data
  }

  if(PCCD.value==='P0602'){
    const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301', pccd:'F0902'})
    const filterState= await filterPromise
    productFilters.value = filterState.data
  }

  if(productFilters?.value){
    filterLoading.value = false
  }else {
    filterLoading.value = false
  }

  if(products?.value){
    productLoading.value = false
  }else {
    productLoading.value = true
  }

},{ deep: true })

const moveOtherPage = async (pageNumber:number) =>{
  console.log(pageNumber)
  currentPage.value = pageNumber
  const productPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', {ptcd:'P0301',pccd: PCCD.value,page: pageNumber})
  const productState = await productPromise;
  products.value = productState.data
}

const moveDetailPage = (id:number) =>{
  router.push(`/product/${id}?pccd=${PCCD.value}`)
}

</script>