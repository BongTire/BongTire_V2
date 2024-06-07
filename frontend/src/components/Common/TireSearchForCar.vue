<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {  XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import defaultLogo from '../../assets/image/Company/BongTireLogo.png'
import {PropType} from "vue";
import {IBrand} from "@type/brand.ts";
import {FilterService} from "primevue/api";
import filter = FilterService.filter;
import {ICar, ICarTrim} from "@type/car.ts";
import {IProduct} from "@type/product.ts";
import ProductCard from "@component/Product/ProductCard.vue";

const router = useRouter()

const props = defineProps({
  isOpen: Boolean,
  brand:{
    type: Array as PropType<IBrand> | undefined
  },
  car:{
    type: Array as PropType<ICar> | undefined
  },
  carTrim:{
    type: Array as PropType<ICarTrim> | undefined
  },
  product:{
    type: Array as PropType<IProduct> | undefined
  }
})

const emits = defineEmits(['closeSearch', 'clickBrand', 'clickCar', 'clickCarTrim'])
const regulateFirstHeight = ref(true)
const regulateSecondHeight = ref(true)
const regulateThirdHeight = ref(false)

const setOrigin = ref(1)
const visibleBrand = ref()

const selectBrand = ref(-1)
const selectCarYear = ref(0)
const selectCarTrim = ref(0)




const visibleProduct = ref<IProduct[]>()

watch(props,()=>{
  visibleBrand.value = props.brand.filter(x=>x.origin)
  console.log(props.car)
  visibleProduct.value  = props.product
},{deep:true})

const clickBrandOriginTab = (tab:any) =>{
  visibleBrand.value = props.brand.filter(x=>x.origin === tab.origin)

  if(tab.origin){
    setOrigin.value = (1)
    tab.current = true
    tabs.value[1].current = false
  }else{
    setOrigin.value = (0)
    tab.current = true
    tabs.value[0].current = false
  }
}

const clickBrand = (brandId:number, index:number) =>{
  selectBrand.value = index
  emits('clickBrand', brandId)
}

const clickCar = (carId : number) =>{
  regulateFirstHeight.value = false
  emits('clickCar', carId)
}

const selectCarTrimYear = (index:number) =>{
  selectCarYear.value = index
}

const selectCarTrimList = (index:number, frontTire:string, rearTire:string) =>{
  selectCarTrim.value = index
  const tireSize = [frontTire, rearTire]
  regulateSecondHeight.value = false
  regulateThirdHeight.value = true

  emits('clickCarTrim',tireSize )
}

const closeTireSearch = () =>{
  emits('closeSearch')
}

const regulateHeight = (state:number) =>{
  if(state === 1){
    regulateFirstHeight.value = !regulateFirstHeight.value
  }
  if(state === 2){
    regulateSecondHeight.value = !regulateSecondHeight.value
  }
  if(state === 3){
    regulateThirdHeight.value = !regulateThirdHeight.value
  }

}

const moveDetailPage = (id:number) =>{
  router.push(`/product/${id}?pccd=P0601`)
  closeTireSearch()
}

const tabs = ref([
  { name: '국산', origin: true, current: true },
  { name: '수입', origin: false, current: false },
])

</script>

<template>
  <TransitionRoot as="template" :show="props.isOpen">
    <Dialog class="relative z-10" @close="closeTireSearch">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-4xl sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" @click="closeTireSearch">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="overflow-y-auto h-128">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">타이어 차량 검색</DialogTitle>
                  <div class="mt-2 flex flex-col">
                    <!--브랜드 서칭 -->
                    <div :class="`${regulateFirstHeight ? 'h-80' : 'h-6' } flex overflow-y-hidden`">
                      <div class="w-1/3">
                        <p class="text-lg">
                          브랜드 선택
                        </p>
                        <div class="w-full">
                          <div class="sm:hidden">
                            <label for="tabs" class="sr-only">Select a tab</label>
                            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                            <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                              <option class="w-full" v-for="tab in tabs" :key="tab.name" @click="clickBrandOriginTab(tab)" :selected="tab.current">{{ tab.name }}</option>
                            </select>
                          </div>
                          <div class="hidden sm:block">
                            <div class="border-b border-gray-200">
                              <nav class="-mb-px flex" aria-label="Tabs">
                                <p v-for="tab in tabs" :key="tab.name" @click="clickBrandOriginTab(tab)" :class="[tab.current ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</p>
                              </nav>
                            </div>
                          </div>
                        </div>
                        <div class="mt-4 overflow-y-auto h-56 w-full flex flex-wrap justify-evenly">
                          <!-- 브랜드 선택 란 삽입 -->
                          <div v-for="(brand, index) in visibleBrand" @click="clickBrand(brand.BrandId, index)" :class="`hover:bg-slate-100 w-24 h-24 ${selectBrand === index ? 'bg-slate-50' : 'bg-slate-200'} rounded-lg flex flex-col justify-evenly items-center mt-3`">
                            <img :src="brand.brandLogo ? brand.brandLogo : defaultLogo" class="h-10">
                            <p>{{ brand.name }}</p>
                          </div>
                        </div>
                      </div>
                      <!-- 차량 서칭 -->
                      <div class="w-2/3 ml-2 h-72">
                        <div class="flex justify-between items-center">
                          <p class="text-lg">차량 선택</p>
                          <ChevronDownIcon v-if="regulateFirstHeight" class="h-6 hover:bg-slate-100 rounded cursor-pointer" @click="regulateHeight(1)"/>
                          <ChevronUpIcon v-else class="h-6 hover:bg-slate-100 rounded cursor-pointer" @click="regulateHeight(1)"/>
                        </div>
                        <div class="w-full overflow-y-auto h-full">
                          <!-- 차량 선택 란 삽입 -->
                          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            <div v-for="car in props.car" :key="car?.CarId" class="group relative" @click="clickCar(car?.CarId)">
                              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 min-h-30 lg:h-30">
                                <img :src="car?.image ? car?.image : null" :alt="car?.image ? car?.image : null" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                              </div>
                              <div class="mt-4 flex justify-between">
                                <div>
                                  <h3 class="text-sm text-gray-700">
                                    <p >
                                      <span aria-hidden="true" class="absolute inset-0" />
                                      {{ car.name }}
                                    </p>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-5">

                      <!-- 차량 연식 선택-->
                      <div class="flex justify-between items-center ">
                        <p class="text-lg">차량 연식 및 트림 선택</p>
                        <ChevronDownIcon v-if="regulateSecondHeight" class="h-6 hover:bg-slate-100 rounded cursor-pointer" @click="regulateHeight(2)"/>
                        <ChevronUpIcon v-else class="h-6 hover:bg-slate-100 rounded cursor-pointer" @click="regulateHeight(2)"/>
                      </div>
                      <!-- 차량 트림 선택 -->
                      <div class="flex overflow-y-auto h-64" v-if="regulateSecondHeight">
<!--                        year select -->
                        <div class="flex flex-col overflow-y-auto h-full">
                          <div v-for="(year, index) in props.carTrim?.yearList" >
                            <div
                                :class="`${index === selectCarYear ? 'bg-orange-600 text-white' : 'bg-slate-100'} w-24 h-10 flex justify-center items-center hover:bg-orange-500 hover:text-white cursor-pointer` "
                                @click="selectCarTrimYear(index)"
                            >
                              {{ year.year }}
                            </div>
                          </div>
                        </div>

<!--                        trim select-->
                        <div class="overflow-y-auto h-full">
                          <div v-if="props.carTrim" v-for="(trim, index) in props.carTrim?.yearList[selectCarYear].trimList"
                            :class="`${selectCarTrim === index ? 'bg-orange-600 text-white' : 'bg-slate-100'} min-w-48 h-10 px-2 flex justify-center items-center hover:bg-orange-500 hover:text-white cursor-pointer`"
                               @click="selectCarTrimList(index, trim.frontTire, trim.rearTire)"
                          >
                            <div>
                              <p>{{trim.name}}<span>{{ trim.frontTire }}</span> / <span> {{trim.rearTire }}</span> </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between items-center ">
                        <p class="text-lg mt-3">상품 목록</p>
                        <ChevronDownIcon v-if="regulateThirdHeight" class="h-6 hover:bg-slate-100 rounded cursor-pointer" @click="regulateHeight(3)"/>
                        <ChevronUpIcon v-else class="h-6 hover:bg-slate-100 rounded cursor-pointer" @click="regulateHeight(3)"/>
                      </div>
                      <div v-if="regulateThirdHeight">
                        <ProductCard :conf="visibleProduct" @moveDetailPage="moveDetailPage"/>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeTireSearch">닫기</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>

</style>