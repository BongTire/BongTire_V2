<template>
  <div class="flex w-full overflow-auto">
    <div v-for="tab in props.conf" class="min-w-20 h-20 bg-slate-50 flex justify-center items-center cursor-pointer hover:bg-white">
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
  }
})



</script>

<style>

</style>