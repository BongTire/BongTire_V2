<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'
import { generatePages, generateDisplayedPages } from '../../util/func/common'


const props = defineProps({
  total:{
    type: Number,
  },
  currentPage:{
    type: Number,
  }
})

const emits = defineEmits(['moveOtherPage'])

const pageTotal:number = ref(Math.floor(props.total/20))
const pageArray:number[] = ref(generatePages(pageTotal.value))
const displayPageArray:number[] = ref(generateDisplayedPages(props.currentPage,pageTotal.value))

watch(() => props, () => {
  initData()
},{ deep: true })

console.log(pageTotal.value)

const initData = () =>{
  pageTotal.value = Math.floor(props.total/20)
  pageArray.value = generatePages(pageTotal.value)
  displayPageArray.value = generateDisplayedPages(props.currentPage,pageTotal.value)
}

const clickPage = (page:number)=>{
  emits('moveOtherPage', page)

}


</script>

<template>
  <nav v-if="pageTotal > 1" class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <a href="#" class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <p v-for="page in displayPageArray" @click="clickPage(page)" :class="`${page === props.currentPage ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium cursor-pointer`">{{ page }}</p>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <p class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </p>
    </div>
  </nav>
</template>

<style scoped>

</style>