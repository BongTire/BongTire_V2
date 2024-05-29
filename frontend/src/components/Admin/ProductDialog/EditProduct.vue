<template>
  <TransitionRoot as="template" :show="props.isOpen">
    <Dialog class="relative z-10" @close="closeDialog">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" @click="closeDialog">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="w-full h-256 overflow-y-auto">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{title}} {{ props.conf ? '편집' : '추가' }}</DialogTitle>
                  <div class="mt-2 ">
                    <!-- 브랜드 선택 -->
                    <div>
                      <!-- 탭 -->
                      <div>
                        <div class="sm:hidden">
                          <label for="tabs" class="sr-only">Select a tab</label>
                          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                          <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                            <option v-for="tab in tabs" :key="tab.name" @click="selectBrandOrigin(tab.origin)" :selected="tab.current">{{ tab.name }}</option>
                          </select>
                        </div>
                        <div class="hidden sm:block">
                          <div class="border-b border-gray-200">
                            <nav class="-mb-px flex" aria-label="Tabs">
                              <p v-for="tab in tabs" :key="tab.name" @click="selectBrandOrigin(tab.origin)" :class="[tab.current ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</p>
                            </nav>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-wrap">
                        <div @click="clickBrand(brand)" v-if="tabs[0].current" v-for="brand in visibleKoreaBrand" :class="`${editProduct.BrandId === brand.BrandId ? 'bg-slate-300' : 'bg-slate-50'} p-2 m-2 rounded-lg hover:bg-slate-200 cursor-pointer flex justify-center items-center`">
                          <img :class="`${props.state === 'tire' ? 'h-6' : null} ${props.state === 'wheel' ? 'w-12' : null}`" :src="brand?.brandLogo ?? defaultLogo">
                        </div>
                        <div @click="clickBrand(brand)" v-else v-for="brand in visibleForeignBrand" :class="`${editProduct.BrandId === brand.BrandId ? 'bg-slate-300' : 'bg-slate-50'} p-2 m-2 rounded-lg hover:bg-slate-200 cursor-pointer flex justify-center items-center`">
                          <img :class="`${props.state === 'tire' ? 'h-6' : null} ${props.state === 'wheel' ? 'w-12' : null}`" :src="brand?.brandLogo ?? defaultLogo">
                        </div>
                      </div>
                    </div>
                    <!-- 상품 -->
                    <div>
                      <p class="text-xl">상품 특징</p>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 mr-5">
                          <label for="productName" class="block text-sm font-medium leading-6 text-gray-900">상품 명</label>
                          <div class="mt-2">
                            <input
                                type="text"
                                name="productName" id="productName"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                placeholder="상품명"
                                :value="editProduct?.productName"
                                @input="changeInputData('productName', $event.target)"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="price" class="block text-sm font-medium leading-6 text-gray-900">공장가</label>
                          <div class="mt-2">
                            <input
                                type="number" name="price" id="price"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                placeholder="공장가"
                                :value="editProduct?.price ?? 0"
                                @input="changeInputData('price', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 mr-5">
                          <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">재고</label>
                          <div class="mt-2">
                            <input
                                type="number" name="amount" id="amount"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                placeholder="재고"
                                :value="editProduct?.amount"
                                @input="changeInputData('amount', $event.target)"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="discountRate" class="block text-sm font-medium leading-6 text-gray-900">할인율</label>
                          <div class="mt-2">
                            <input
                                type="number" name="discountRate" id="discountRate"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                placeholder="할인율"
                                :value="editProduct?.discountRate ?? 0"
                                @input="changeInputData('discountRate', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-full mt-5">
                        <div class="space-y-2 w-1/2 mr-5">
                          <div class="relative flex items-start">
                            <div class="flex h-6 items-center">
                              <input
                                  id="isActive" aria-describedby="comments-description" name="isActive"
                                  type="checkbox"
                                  class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                                  :checked="editProduct?.isActive === 1"
                                  @input="chageInputCheckbox('isActive', $event.target?.checked)"
                              />
                            </div>
                            <div class="ml-3 text-sm leading-6">
                              <label for="isActive" class="font-medium text-gray-900">제품 활성화 여부</label>
                            </div>
                          </div>
                          <div class="relative flex items-start">
                            <div class="flex h-6 items-center">
                              <input id="isSecond" aria-describedby="candidates-description" name="isSecond"
                                     type="checkbox"
                                     class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                                     :checked="editProduct?.isSecond === 1"
                                     @input="chageInputCheckbox('isSecond', $event.target?.checked)"
                              />
                            </div>
                            <div class="ml-3 text-sm leading-6">
                              <label for="isSecond" class="font-medium text-gray-900">중고 여부</label>
                            </div>
                          </div>
                          <div class="relative flex items-start">
                            <div class="flex h-6 items-center">
                              <input id="isRecommanded" aria-describedby="offers-description"
                                     name="isRecommanded" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                                     :checked="editProduct?.isRecommanded === 1"
                                     @input="chageInputCheckbox('isRecommanded', $event.target?.checked)"
                              />
                            </div>
                            <div class="ml-3 text-sm leading-6">
                              <label for="isRecommanded" class="font-medium text-gray-900">추천 여부</label>
                            </div>
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="discountPrice" class="block text-sm font-medium leading-6 text-gray-900">할인가</label>
                          <div class="mt-2">
                            <input type="number" name="discountPrice" id="discountPrice"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="할인가"
                                   :value="editProduct?.discountPrice"
                                   @input="changeInputData('discountPrice', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 특정 상품 특징 -->

                    <!-- 타이어 -->
                    <div class="mt-5" v-if="props.state === 'tire'">
                      <p class="text-xl">타이어 특징</p>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 mr-5">
                          <label for="tireSize" class="block text-sm font-medium leading-6 text-gray-900">타이어 사이즈</label>
                          <div class="mt-2">
                            <input type="text" name="tireSize" id="tireSize"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="타이어 사이즈"
                                   :value="editProduct?.tireSize"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="mCode" class="block text-sm font-medium leading-6 text-gray-900">mCode</label>
                          <div class="mt-2">
                            <input type="text" name="mCode" id="mCode"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="mCode"
                                   :value="editProduct?.mCode"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 mr-5">
                          <label for="patternCode" class="block text-sm font-medium leading-6 text-gray-900">패턴 코드</label>
                          <div class="mt-2">
                            <input type="text" name="patternCode" id="patternCode"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="패턴 코드"
                                   :value="editProduct?.patternCode"
                                   @input="changeInputData('patternCode', $event.target)"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="maxSpeed" class="block text-sm font-medium leading-6 text-gray-900">최대 스피드</label>
                          <div class="mt-2">
                            <input type="text" name="maxSpeed" id="maxSpeed"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="최대 스피드"
                                   :value="editProduct?.maxSpeed"
                                   @input="changeInputData('maxSpeed', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 pr-5">
                          <label for="origin" class="block text-sm font-medium leading-6 text-gray-900">원산지</label>
                          <div class="mt-2">
                            <input type="text" name="origin" id="origin"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="원산지"
                                   :value="editProduct?.origin"
                                   @input="changeInputData('origin', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 휠 -->
                    <div class="mt-5" v-if="props.state === 'wheel'">
                      <p class="text-xl">휠 특징</p>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 mr-5">
                          <label for="wheelSize" class="block text-sm font-medium leading-6 text-gray-900">휠 사이즈</label>
                          <div class="mt-2">
                            <input type="text" name="wheelSize" id="wheelSize"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="휠 사이즈"
                                   :value="editProduct?.wheelSize"
                                   @input="changeInputData('wheelSize', $event.target)"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="productCode" class="block text-sm font-medium leading-6 text-gray-900">상품 코드</label>
                          <div class="mt-2">
                            <input type="text" name="productCode" id="productCode"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="패턴 코드"
                                   :value="editProduct?.productCode"
                                   @input="changeInputData('productCode', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-full mt-5" v-if="enabled">
                        <div class="w-1/2 mr-5">
                          <label for="frontOffset" class="block text-sm font-medium leading-6 text-gray-900">앞 오프셋</label>
                          <div class="mt-2">
                            <input type="text" name="frontOffset" id="frontOffset"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="패턴 코드"
                                   :value="editProduct?.frontOffset"
                                   @input="changeInputData('frontOffset', $event.target)"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="rearOffset" class="block text-sm font-medium leading-6 text-gray-900">뒤 오프셋</label>
                          <div class="mt-2">
                            <input type="text" name="rearOffset" id="rearOffset"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="최대 스피드"
                                   :value="editProduct?.rearOffset"
                                   @input="changeInputData('rearOffset', $event.target)"

                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between items-center w-full mt-5">
                        <div class="flex justify-start items-center w-1/2 mr-10">
                          <Switch v-model="enabled" class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2">
                            <span class="sr-only">Use setting</span>
                            <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                            <span aria-hidden="true" :class="[enabled ? 'bg-orange-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out']" />
                            <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
                          </Switch>
                          <p class="ml-5" v-if="!enabled">통합 오프셋</p>
                          <p class="ml-5" v-if="enabled">앞 / 뒤 오프셋</p>
                        </div>
                        <div class="w-1/2 " v-if="!enabled">
                          <label for="offset" class="block text-sm font-medium leading-6 text-gray-900">앞뒤 오프셋</label>
                          <div class="mt-2">
                            <input type="text" name="offset" id="offset"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="원산지"
                                   :value="editProduct?.frontOffset"
                                   @input="changeInputData('offset', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between w-full mt-5">
                        <div class="w-1/2 mr-5">
                          <label for="hole" class="block text-sm font-medium leading-6 text-gray-900">홀 갯수</label>
                          <div class="mt-2">
                            <input type="text" name="hole" id="hole"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="홀 갯수"
                                   :value="editProduct?.hole"
                                   @input="changeInputData('hole', $event.target)"
                            />
                          </div>
                        </div>
                        <div class="w-1/2 ml-5">
                          <label for="PCD" class="block text-sm font-medium leading-6 text-gray-900">PCD</label>
                          <div class="mt-2">
                            <input type="text" name="PCD" id="PCD"
                                   class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                   placeholder="PCD"
                                   :value="editProduct?.PCD"
                                   @input="changeInputData('PCD', $event.target)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto" @click="postTireData">등록</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeDialog">취소</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {PropType, ref} from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Switch } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { IProduct } from '../../../util/type/product';
import { IBrand } from '../../../util/type/brand';
import defaultLogo from '../../../assets/image/Company/BongTireLogo.png'


const props = defineProps({
  conf:{
    type: Object as PropType<IProduct> | undefined
  },
  isOpen:{
    type: Boolean
  },
  state:{
    type: String
  },
  brand:{
    type: Array as PropType<IBrand>
  }
})
const enabled = ref(false)
const title = (()=>{
  if(props.state === 'tire'){
    return '타이어'
  }else if(props.state === 'wheel'){
    return '휠'
  }else if(props.state === 'user'){
    return '유저'
  }
})()
const emit = defineEmits(['closeDialog', 'postTireData'])

const tabs = ref([
  { name: '국산', origin: true, current: true },
  { name: '수입', origin: false, current: false },
])

const visibleKoreaBrand = ref<IBrand[]>()

const visibleForeignBrand =ref<IBrand[]>()




const selectBrandOrigin = (origin:boolean) =>{
  if(origin){
    tabs.value[0].current = true
    tabs.value[1].current = false
  }else{
    tabs.value[0].current = false
    tabs.value[1].current = true
  }
}

const clickBrand = (brand:IBrand)=>{
  console.log(brand)
  editProduct.value.BrandId = brand.BrandId
  editProduct.value.brandName = brand.name
  editProduct.value.brandOrigin = brand.origin
  editProduct.value.brandLogo = brand.brandLogo
  editProduct.value.brandNation = brand.nation
}

const closeDialog = () =>{
  emit('closeDialog')
}

const editProduct = ref<IProduct>()


watch(()=>props.conf,(newValue)=>{
  initData()
  if(props.brand){
    visibleKoreaBrand.value = props?.brand.filter(x=>x.origin)
    visibleForeignBrand.value = props?.brand.filter(x=>!x.origin)
  }
},{ deep: true })

const initData = () =>{
  editProduct.value = {
    WheelId: props.conf?.WheelId ?? null,
    TireId: props.conf?.TireId ?? null,
    // 상품 공통
    BrandId: props.conf?.BrandId ?? null,
    brandName: props.conf?.brandName ?? '',
    brandOrigin: props.conf?.brandOrigin ?? 0,
    brandNation: props.conf?.brandNation ?? '',
    brandLogo: props.conf?.brandLogo ?? '',
    PCCD: props.conf?.PCCD ?? '',
    drivingMethodPCCD: props.conf?.drivingMethodPCCD ?? [],
    productName: props.conf?.productName ?? '',
    price: props.conf?.price ?? 0,
    amount: props.conf?.amount ?? 0,
    discountRate: props.conf?.discountRate ?? 0,
    discountPrice: props.conf?.discountPrice ?? 0,
    image: props.conf?.image ?? '',
    viewers: props.conf?.viewers ?? 0,
    isSecond: props.conf?.isSecond ?? 0,
    content: props.conf?.content ?? '',
    feature: props.conf?.feature ?? '',
    isActive: props.conf?.isActive ?? 1,
    isRecommanded: props.conf?.isRecommanded ?? 0,
    isVisible: props.conf?.isVisible ?? 1,
    numberOfDataUpadate: props.conf?.numberOfDataUpadate ?? 0,
    // 타이어 옵션
    tireSize: props.conf?.tireSize ?? '',
    mCode: props.conf?.mCode ?? '',
    patternCode: props.conf?.patternCode ?? '',
    maxSpeed: props.conf?.maxSpeed ?? '',
    origin: props.conf?.origin ?? '',
    xl: props.conf?.xl ?? null,
    ply: props.conf?.ply ?? null,
    // 휠 option
    productCode: props.conf?.productCode ?? '',
    wheelSize: props.conf?.wheelSize ?? '',
    frontOffset: props.conf?.frontOffset ?? '',
    rearOffset: props.conf?.rearOffset ?? '',
    PCD: props.conf?.PCD ?? '',
    hole: props.conf?.hole ?? 0,

    numberOfDataUpdate: props.conf?.TireId ?? null,
    sales: props.conf?.sales ?? null,
  }
}

const changeInputData = (key:string, target:any) =>{
  if(!target.value) return

  const newValue = target.value

  if(key === 'offset' && newValue !== null){
  const value = newValue.toString()

    editProduct.value = {
      ...editProduct.value,
      frontOffset: value,
      rearOffset: value,
    }
    return
  }

  if(key === 'price'){
    editProduct.value.price = newValue

    if(editProduct.value.discountRate === 0){
      editProduct.value.discountPrice = newValue * 1
    }else{
      editProduct.value.discountPrice = newValue * editProduct.value.discountRate
    }
    return;
  }
  if(key === 'discountPrice'){
    editProduct.value.discountPrice = newValue

    if(editProduct.value.price !== 0){
      editProduct.value.discountRate = Math.floor((newValue / editProduct.value.price)*100)
      console.log(editProduct.value.discountRate)
    }
    return;
  }

  if(key === 'discountRate'){
    editProduct.value.discountRate = newValue
    if(editProduct.value.price !== 0){
      editProduct.value.discountPrice = Math.floor(editProduct.value.price - ((newValue/100) * editProduct.value.price))
    }
  }

  editProduct.value = {
    ...editProduct.value,
    [key]: newValue
  }
}

const chageInputCheckbox = (key:string, newValue:boolean | number | null) =>{
    editProduct.value = {
      ...editProduct.value,
      [key]: newValue? 1 : 0,
    }
}

const postTireData = () =>{
  console.log(editProduct.value)
  let sendMessage = {
    title:'',
    message: ''
  }
  if(props.conf){
    if(props.state==='tire'){
      sendMessage = {
        title: '타이어 변경',
        message: '타이어 데이터를 변경 하시겠습니까?'
      }
    }
    if(props.state==='wheel') {
      sendMessage = {
        title: '휠 변경',
        message: '휠 데이터를 변경 하시겠습니까?'
      }
    }

  }else{
    sendMessage = {
      title: '타이어 추가',
      message: '타이어 데이터를 추가 하시겠습니까?'
    }
  }

  emit('postTireData', sendMessage,editProduct.value)
}

</script>

<style>

</style>