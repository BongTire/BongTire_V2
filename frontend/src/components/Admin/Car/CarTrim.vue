<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {  XMarkIcon } from '@heroicons/vue/24/outline'
import { ICarTrim } from '../../../util/type/car'
import defaultImage from '../../../assets/image/Company/BongTireLogo.png'

const open = ref(true)
const props = defineProps({
  conf: {
    type: Object as PropType<ICarTrim>
  },
  isOpen:{
    type: Boolean,
  },
  selectYear:{
    type: Number,
  },
  selectTrim:{
    type: Number,
  }
})

const emits = defineEmits(['closeTrim', 'selectTrim', 'postTrim'])
const editCarTrim = ref<ICarTrim>()
const editMode = ref(false)

const closeTrim = () =>{
  changeEditMode()
  emits('closeTrim')
}

watch(()=>props.conf,(newValue)=>{
  initData()
},{ deep: true })

const initData = () =>{
  editCarTrim.value = {
    ...props.conf
  }

  console.log(editCarTrim.value)
}

const selectYearData = (index:number) =>{
  emits('selectTrim',index, 'year')
}

const selectTrim = (index:number) =>{
  emits('selectTrim',index, 'trim')
}

initData()

const changeEditMode = () =>{
  editMode.value = !editMode.value
}

const editCarYearData = (target:any) =>{
  const newValue = target?.value ?? ''

  if(newValue / 2000 >= 1){
    editCarTrim.value.yearList[props.selectYear].year = newValue
  }
}

const editCarTrimData = (key: string, target:any) =>{
  const newValue = target?.value ?? ''

  console.log(newValue)
  editCarTrim.value.yearList[props.selectYear].trimList[props.selectTrim][key] = newValue
  console.log(editCarTrim.value)


}

const editTrimPostData = () =>{
  emits('postTrim', editCarTrim.value)
}
</script>

<template>
  <TransitionRoot as="template" :show="props.isOpen">
    <Dialog class="relative z-10" @close="closeTrim">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeTrim">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                    <div class="flex w-full justify-start items-center">
                      <img :src="editCarTrim.brand.brandLogo" class="w-20">
                      <p class="ml-5"> {{ editCarTrim.brand.name }} {{ editCarTrim.name }} </p>
                    </div>
                  </DialogTitle>

                    <div class="mt-2 flex">
                      <!-- 연식 -->
                      <div class="flex flex-col w-28 h-full">
                        <div>
                          <p class="text-xl mb-5">연식</p>
                        </div>
                        <div :class="`w-full h-10 ${props.selectYear === index ? 'bg-slate-200' :'bg-slate-50'} flex justify-start items-center cursor-pointer hover:bg-slate-100`"
                             v-for="(year, index) in editCarTrim.yearList"
                             @click="selectYearData(index)"
                        >
                          <input v-if="editMode" type="text" :class="`px-2 my-2 w-full`" :value="year.year" @input="editCarYearData($event.target)"/>
                          <p class="p-2 my-2" v-else>{{ year.year}}</p>
                        </div>
                      </div>
                      <!-- 차량 연식 정보-->
                      <div class="w-full">
                        <div class="w-full h-32 flex justify-center items-center">
                          <img class="h-full" v-if="editCarTrim.yearList.length >= 1" :src="editCarTrim.yearList[props.selectYear].image ?? defaultImage">
                        </div>
                        <div class="flex w-full h-full ">
                          <div class="flex flex-col justify-center w-52 max-h-64 overflow-auto items-center">
                            <div @click="selectTrim(index)" :class="`${props.selectTrim === index ? 'bg-slate-200' : 'bg-slate-50'} hover:bg-slate-100 min-h-8 px-2 w-full flex justify-start items-center cursor-pointer truncate `"
                                 v-for="(trim,index) in editCarTrim.yearList[props.selectYear].trimList">
                              <p  class="w-full flex justify-start px-2">{{trim.name}}</p>
                            </div>
                          </div>
                          <div class="w-full max-h-64 overflow-y-auto  rounded-r-lg flex flex-col justify-start items-end border">
                            <input class="w-11/12 min-h-12 px-2 text-lg"
                                   type="text"
                                   :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].name"
                                   :disabled="!editMode"
                            />
                            <div class="w-full flex justify-end items-center border-t border-b">
                              <label>
                                차량 가격
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="number"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].price ?? 0"
                                       :disabled="!editMode"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                앞 타이어
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].frontTire ?? ''"
                                       :disabled="!editMode"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                뒷 타이어
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].rearTire ?? ''"
                                       :disabled="!editMode"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                앞 브레이크
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].frontBrake ?? ''"
                                       :disabled="!editMode"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                뒷 브레이크
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].rearBrake ?? ''"
                                       :disabled="!editMode"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                구동 방식
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].traction ?? ''"
                                       :disabled="!editMode"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                공차 중량(Kg)
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].curbWeight ?? ''"
                                       :disabled="!editMode"
                                       @input="editCarTrimData('curbWeight', $event.target)"
                                />
                              </label>
                            </div>
                            <div class="w-full flex justify-end items-center border-b">
                              <label>
                                복합 연비 (kg/l)
                                <input class="h-8 px-2 text-md text-end bg-slate-50 rounded" type="text"
                                       :value="editCarTrim.yearList[props.selectYear].trimList[props.selectTrim].combinedEfficiency ?? ''"
                                       :disabled="!editMode"
                                       @input="editCarTrimData('combinedEfficiency', $event.target)"
                                />
                              </label>
                            </div>
                          </div>

                          <div>

                          </div>
                        </div>

                      </div>
                    <div>


                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button v-if="!editMode" type="button" class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto" @click="changeEditMode">편집</button>
                <button v-else type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" @click="editTrimPostData">저장</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeTrim">닫기</button>
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