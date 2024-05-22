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
                      <span class="text-sm font-medium text-gray-900">{{ filter.filters.name }}</span>
                      <span class="ml-6 flex h-7 items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                          aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel class="px-4 pb-2 pt-4">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in filter.filters.value" :key="option.value" class="flex items-center">
                        <input :id="`${optionIdx}-mobile`" :name="`${optionIdx}`" 
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
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

  <main class="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="border-b border-gray-200 pb-10">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">상품</h1>
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
                <legend class="block text-sm font-medium text-gray-900">{{ filter.filters.name }}</legend>
                <div class="space-y-3 pt-6">
                  <div v-for="(option, optionIdx) in filter.filters.value" :key="optionIdx" class="flex items-center">
                    <input :id="`${optionIdx}`" :name="`${optionIdx}[]`"
                      type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
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
      <Loading v-if="productLoading && filterLoading"/>
      <!-- 상품 박스 -->
      <div v-else class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <ProductCard :conf="product" @moveDetailPage="moveDetailPage" />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup >
import ProductCard from '@component/Product/ProductCard.vue'
import Loading from '@component/Common/Loading.vue'
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
import { fetchGetData } from '../api/reservation'
import{ IProduct } from '../util/type/product'

const route = useRoute();
const router = useRouter()

const PCCD = computed(()=>{return route.query.pccd})  
const mobileFiltersOpen = ref(false)
const product:IProduct[] = ref([])
const productFilters:IFilter | null = ref(null)



onMounted(async () => {

  const productPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', 'P0301', PCCD.value)
  product.value = await productPromise;

  if(PCCD.value==='P0601'){
    const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', 'P0301', 'F0901')
      productFilters.value = await filterPromise
  }
  
  if(PCCD.value==='P0602'){
    const filterPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/product', 'P0301', 'F0902')
      productFilters.value = await filterPromise
  }
  
  console.log(productFilters.value[0].filters.value)

  const filterLoading = computed(()=>{
    if(filters.value) return false
    else true
  })

  const productLoading = computed(()=>{
    if(product.value.length === 0) return true
    else false
  })
})

const moveDetailPage = (id:number) =>{
  router.push(`/product/${id}`)
}










</script>