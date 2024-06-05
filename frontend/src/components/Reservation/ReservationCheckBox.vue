<script setup lang="ts">
import {PropType, ref} from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {  XMarkIcon } from '@heroicons/vue/24/outline'
import { IReservationMaster } from "@type/reservation.ts";
import ReservationProductCard from '../Reservation/ReservationProductCard'
import {removeSpaces, validationPhoneNumber} from "../../util/func/edit.ts";

const props = defineProps({
  isOpen: Boolean,
  conf:{
    type: Array as PropType<IReservationMaster> | undefined
  },
  isResult: Boolean,
})

const name = ref('')
const number = ref('')

const nameValidation = ref(false)
const numberValidation = ref(false)

const emits = defineEmits(['closeDialog', 'confirmDialog'])

const closeDialog=()=>{
  emits('closeDialog')
}

const confirmCheckReservation = () =>{

  if(!name.value){
    nameValidation.value = true
    return
  }else{
    nameValidation.value = false
  }

  name.value = removeSpaces(name.value)
  numberValidation.value = validationPhoneNumber(number.value)
  if(numberValidation.value) return

  const user = {
    name: name.value,
    number: number.value
  }

  emits('confirmDialog', user)
}

const checkResult = ref<IReservationMaster[]>(props.conf ?? [])

watch(() => props.conf, () => {
  initData()
},{ deep: true })

const initData = () =>{
  checkResult.value = props.conf ?? []
  console.log(props.conf)
}


</script>

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
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeDialog">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">예약 조회</DialogTitle>
                  <div v-if="!props.isResult" class="mt-2">
                    <div class="isolate -space-y-px rounded-md shadow-sm">
                      <div :class="`relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ${nameValidation ? 'ring-red-600' :'ring-gray-300'} focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600`">
                        <label for="name" class="block text-xs font-medium text-gray-900">예약자 성함 <span v-if="nameValidation" class="text-red-600">성함을 입력해주세요</span></label>
                        <input type="text" name="name" id="name"
                               class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                               placeholder="예약자 성함"
                               v-model="name"
                        />
                      </div>
                      <div :class="`relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ${numberValidation ? 'ring-red-600' : 'ring-gray-300'} focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600`">
                        <label for="job-title" class="block text-xs font-medium text-gray-900">예약자 전화번호 <span v-if="numberValidation" class="text-red-600"> 전화 번호 형식에 맞게 작성해주세요 </span></label>
                        <input type="text" name="number" id="number"
                               class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                               placeholder="예약자 전화번호"
                               v-model="number"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-if="props.isResult" class="mt-2 w-full overflow-x-auto flex flex-col justify-center items-center">
                    <div v-for="reserve in checkResult" class="bg-slate-50 rounded-xl sm:w-128 w-80 mb-5">
                      <div class="flex justify-between items-center gap-x-1.5 p-2 ">
                        <p class="text-xl">{{ reserve?.name ?? '' }} 님</p>
                        <p class="text-xl">{{ (reserve?.date ?? '00000000').slice(0,4) }}년 {{ (reserve?.date ?? '00000000').slice(4,6) }}월 {{ (reserve?.date ?? '00000000').slice(6,8) }}일 </p>
                      </div>
                      <div class="w-full flex justify-end items-center p-2">
                        <p class="text-xl"> {{ (reserve?.time ?? 100)/100 }}시</p>
                      </div>
                      <div class="flex w-full  overflow-auto ">
                        <div v-for="product in reserve.product" class="mt-5 w-full h-100 min-w-96">
                          <ReservationProductCard :conf="product" :state="reserve"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto" @click="confirmCheckReservation">조회</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeDialog">취소</button>
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