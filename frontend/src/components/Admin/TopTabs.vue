<template>
  <div class="flex w-full overflow-auto">
    <div v-for="(tab,index) in props.conf"
         :class="`${props.select === index ? 'bg-white' : 'bg-slate-50'} min-w-20 h-20 flex justify-center items-center cursor-pointer hover:bg-white cursor-pointer`"
         @click="selectTap(index)"
    >
      <img :src="tab?.icon ? tab?.icon : tab?.brandLogo" alt="" class="w-12">
      <p v-if="tab?.PCCDId">{{ tab?.secondName }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IBrand } from '../../util/type/brand';
import { IPCCD } from '../../util/type/common';


const props = defineProps({
  conf:{
    type: Array as PropType<IBrand> | Array as PropType<IPCCD> | undefined
  },
  select:{
    type: Number
  },
  state:{
    type:String
  }
})

const emits = defineEmits(['selectTap'])

const selectTap = (index:number)=>{
  emits('selectTap', index, props.state)
}


</script>

<style>

</style>