<template>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 ">
        <ul role="list" class="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
          <li v-for="car in props.conf" :key="car?.CarId" class="cursor-pointer rounded-lg hover:bg-slate-200">
            <div class="min-h-20 flex justify-center items-center">
              <img v-if="car?.image" class="w-full rounded-2xl object-cover " :src="car?.image??defaultImage" alt="" />
              <img v-else class="w-11/12 object-cover " :src="car?.brandLogo ?? defaultImage" alt="" />
            </div>
            <h3 class="mt-5 ml-5 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ car.name }}</h3>
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { IBrand } from '../../util/type/brand';
import { ICar} from '../../util/type/car';
import defaultImage from '@image/Company/BongTireLogo.png'


  const props = defineProps({
    conf:{
      type: Array as PropType<ICar> | Array as PropType<IBrand> | undefined
    }
  })

  console.log(props.conf)

  const people = [
    {
      name: 'Lindsay Walton',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      xUrl: '#',
      linkedinUrl: '#',
    },
    // More people...
  ]
  </script>