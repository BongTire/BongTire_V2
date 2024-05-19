<template>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl lg:max-w-7xl ">
        <h2 class="sr-only">Products</h2>
  
        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          <div v-for="product in props.conf" :key="product.id" class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div class="h-96 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-80 flex justify-center items-center">
              <img :src="product.image ? product.image : defaultImage" :alt="product.imageAlt" :class="`${product.image ? 'h-3/4 sm:h-3/4' : 'w-3/4 sm:w-3/4' }  object-cover object-center`" />
            </div>
            <div class="flex flex-1 flex-col space-y-2 p-4">
              <h2 class="text-l font-medium text-gray-900">
                <a :href="product.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.productName }}
                </a>
              </h2>
              <p class="text-sm text-gray-500">{{ product.description }}</p>
              <div class="flex flex-1 flex-col justify-end">
                <p class="text-sm text-gray-500">{{ product.tireSize ? product.tireSize : product.wheelSize }}</p>
                <div class="flex justify-end">
                    <p class="text-sm text-gray-500 mr-5">{{ product?.frontOffset }}</p>
                    <p class="text-sm text-gray-500">{{ product?.rearOffset }}</p>
                </div>
                <div class="flex w-full justify-end">
                    <p v-if="product.discountRate!==0" class="text-base font-medium text-orange-600 mr-5">{{ product.discountRate }}%</p>
                    <p v-if="product.discountRate!==0" class="text-base font-medium text-gray-300 line-through">{{ product.price }}</p>
                        
                </div>
                <p class="text-base w-full flex justify-end font-medium text-gray-900">{{ product.discountPrice===0 ? '가격문의' : product.discountPrice }}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  const defaultImage = 'src/assets/image/Company/BongTireLogo.png'

    const props = defineProps({
        conf:{
            type: Array as PropType<IProduct> | undefined,
        }
    })


  </script>