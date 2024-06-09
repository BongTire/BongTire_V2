<script setup lang="ts">
import {IProduct} from "@/util/type/product.ts";


const router = useRouter()

const props = defineProps({
  products: Array as IProduct[]
})

const clickProductListPage = () =>{

}

const clickProductPage = () =>{

}


</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="flex items-center justify-between space-x-4">
        <h2 class="text-lg font-medium text-gray-900">봉타이어 추천 타이어</h2>
        <p @click="clickProductListPage" class="whitespace-nowrap text-sm font-medium text-orange-600 hover:text-orange-500">
          타이어 더보기
          <span aria-hidden="true"> &rarr;</span>
        </p>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 overflow-y-auto h-256">
        <div v-for="product in props.products" :key="product.id" class="group relative">
          <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
            <img :src="product.image" :alt="product.image" class="h-full w-auto m-auto " />
            <div class="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
              <div @click="clickProductPage" class="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">상품 더 보기</div>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
            <h3>
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.productName }}
              </a>
            </h3>
            <p>{{ product.discountPrice }}</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">{{ product.tireSize }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>