<template>
  <Warning :isOpen="isOpenWarning" :message="warningMessage" @closeNoti="closeNotification"/>
    <div class="bg-white">
      <main class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <!-- Product -->
          <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <!-- Image gallery -->
            <TabGroup as="div" class="flex flex-col-reverse">
              <!-- Image selector -->
              <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList class="grid grid-cols-4 gap-6">
                  <Tab class="relative flex h-36 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
                    <span class="sr-only"></span>
                    <span class="absolute left-2 inset-0 overflow-hidden rounded-md">
                      <img :src="productDetail?.image ?? ''" alt="" class="h-36 object-cover object-center" />
                    </span>
                    <span :class="[selected ? 'ring-orange-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
                  </Tab>
                </TabList>
              </div>
  
              <TabPanels class="flex justify-center items-center aspect-h-1 aspect-w-1 w-full ">
                <TabPanel  class="flex justify-center items-center border rounded-lg">
                  <img :src="productDetail?.brandLogo ?? ''" class="absolute top-1 left-2 h-12">
                  <img :src="productDetail?.image ?? ''" class="h-96 w-auto sm:rounded-lg" />
                </TabPanel>
              </TabPanels>
            </TabGroup>
  
            <!-- Product info -->
            <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ productDetail?.productName }}</h1>
  
              <div class="mt-3">
                <h2 class="sr-only">Product information</h2>
                <p class="text-3xl tracking-tight text-gray-900">{{ productDetail?.discountPrice === 0 ? '가격 문의' : productDetail?.discountPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }}</p>
              </div>
  
              <!-- Reviews -->
              <!-- <div class="mt-3">
                <h3 class="sr-only">Reviews</h3>
                <div class="flex items-center">
                  <div class="flex items-center">
                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-orange-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                  </div>
                  <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                </div>
              </div>
   -->
              <div class="mt-6 h-40">
                <h3 class="sr-only">특징</h3>
                <div>
                  <p>{{ productDetail?.feature ?? '' }}</p>
                </div>

              </div>
  
              
  
                <div class="mt-10 flex">
                  <button 
                    class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    @click="clickReservationBtn"
                  >
                    예약하기
                  </button>
  
                  <!-- <button type="button" class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span class="sr-only">Add to favorites</span>
                  </button> -->
                </div>
              
  
              <section aria-labelledby="details-heading" class="mt-12">
                <h2 id="details-heading" class="sr-only">Additional details</h2>
                    
                <div class="divide divide-gray-200 border-t">
                    <h2 class="text-xl mt-5">차량 수리 위치</h2>
                    <div class="w-72 relative">
                        <button @click="clickSetTireLocation(0)" :class="`${tireLocation[0] === 1 ? 'bg-orange-600' : null} w-36 h-20 absolute rounded-tl-lg opacity-50` "></button>
                        <button @click="clickSetTireLocation(1)" :class="`${tireLocation[1] === 1 ? 'bg-orange-600' : null} w-36 h-20 absolute rounded-tr-lg opacity-50  right-0`"></button>
                        <button @click="clickSetTireLocation(2)" :class="`${tireLocation[2] === 1 ? 'bg-orange-600' : null} w-36 h-20 absolute rounded-bl-lg opacity-50 top-20`"></button>
                        <button @click="clickSetTireLocation(3)" :class="`${tireLocation[3] === 1 ? 'bg-orange-600' : null} w-36 h-20 absolute rounded-br-lg opacity-50 top-20 right-0`"></button>
                        <img src="@image/systemIcon/Car/top-car-view.png" class="w-72">
                        
                    </div>
                    
                    <p v-if="amount !== 0" class="mt-5 text-lg">총 금액 : <span class="text-orange-600 text-xl"> {{ (productDetail.discountPrice*amount ?? 0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }} </span> 원</p>
                </div>
              </section>
            </div>
          </div>
  
          <section aria-labelledby="related-heading" class="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
            <h2 id="related-heading" class="text-xl font-bold text-gray-900">세부사항</h2>
  
            <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              <div class="space-y-6 text-base text-gray-700" v-html="productDetail?.content ?? ''" />
            </div>
          </section>
        </div>
      </main>
  
      
    </div>
  </template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@headlessui/vue'
  import {IProduct} from '../util/type/product'
  import  {IFetchType} from '../util/type/common'
import { fetchGetData } from '@api/common'
import { useReservationStore } from '../stores/reservation'
  import Warning from "@component/Notification/Warning.vue";

const store  = useReservationStore()
const productDetail = ref<IProduct>()
const tireLocation = ref([0,0,0,0])
const amount = ref(0)


const router = useRouter();
const route = useRoute()

const ProductId = route.params.id
const pccd = route.query.pccd
const pageInfo = computed(()=>{
  if(pccd === 'P0601') return 'tire'
  else if(pccd === 'P0602') return 'wheel'
})

const isOpenWarning = ref(false)
const warningMessage = ref({
  title: '',
  message: ''
})

const closeNotification = () =>{
  isOpenWarning.value = false
}

const clickSetTireLocation = (index:number) =>{
  if(tireLocation.value[index] === 1){
    tireLocation.value[index] = 0
  }else{
    tireLocation.value[index] = 1
  }
}

const tireNWheelCalAmount = () =>{
    let amount = 0
    tireLocation.value.map(data=>{
      if(data===1) amount++;
    })
    return amount
}

watch(() => tireLocation, () => {
  amount.value = tireNWheelCalAmount()
},{ deep: true })

const clickReservationBtn = () =>{
  console.log(amount.value)
  if(amount.value === 0){
    warningMessage.value = {
      title: '예약 실패',
      message: '수량을 선택해주세요'
    }
    isOpenWarning.value = true

  }else{
    const setProductStore = {
      ...productDetail.value,
      amount: amount.value,
      tireLocation: tireLocation.value,
      laborCost: 0,
      price: (productDetail.value?.discountPrice ?? productDetail.value?.price ?? 0 )*amount.value
    }
    store.setReservationProduct(setProductStore)
    router.push('/reservation')
  }
}

onMounted(async ()=>{

  const productDetailPromise:Promise<IFetchType> = fetchGetData<IFetchType>(`/product/${pageInfo.value}/detail/${ProductId}`, {
    ptcd:'P0301',
    pccd: pccd
  })
  const productDetailState = await productDetailPromise
  productDetail.value = productDetailState.data
  console.log(productDetail.value)
})


</script>