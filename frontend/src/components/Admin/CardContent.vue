<template>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 ">
        <ul role="list" class="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
          <li v-for="(car, index) in props.conf" @click="selectCard(index, car)" :key="car?.CarId" class="cursor-pointer rounded-lg bg-slate-100 hover:bg-slate-200">
            <div class="min-h-20 flex justify-center items-center">
              <img v-if="car?.image!=='' && car?.image" class="w-full rounded-2xl object-cover " :src="car?.image??defaultImage" alt="" />
              <img v-else class="w-7/12 object-cover " :src="car.brandLogo ?? defaultImage" alt="" />
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

const emits = defineEmits(['selectCard'])
  const props = defineProps({
    conf:{
      type: Array as PropType<ICar> | Array as PropType<IBrand> | undefined
    },
    state:{
      type: String
    }
  })

const selectCard = (index:number, car:IBrand | ICar)=>{
  emits('selectCard', index, props.state, car)
}

</script>