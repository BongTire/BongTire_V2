<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CreditCardIcon, XMarkIcon, BuildingStorefrontIcon } from '@heroicons/vue/24/outline'
import {removeSpaces, validationPhoneNumber} from "../../util/func/edit.ts";

const open = ref(true)

const props = defineProps({
  isOpen: Boolean,
})

const emits = defineEmits(['closePopup', 'confirm'])

const checkPersonalInfo = ref(false)
const name = ref('')
const isNameInput = ref(true)

const number = ref('')
const isNumberInput = ref(true)

const paymentMethod = ref(false)

const closePopup = (): void => {
  emits('closePopup')
}

const clickPaymentMehod = (newValue:boolean) =>{
  paymentMethod.value = newValue
}



const comfirmReservation = ()=>{
  if(!checkPersonalInfo.value){
    alert('개인 정보 수집에 동의 해주세요')
  }


  if(name.value===''){
    isNameInput.value = false
  }else{
    isNameInput.value = true
  }
  if(number.value===''){
    isNumberInput.value = false
  }else if(validationPhoneNumber(number.value)){
    isNumberInput.value = false
  }else{
    isNumberInput.value = true
  }
  if(isNameInput.value && isNumberInput.value){

    name.value = removeSpaces(name.value)

    emits('confirm', {name: name.value, number:number.value}, paymentMethod.value)
  }

}
</script>

<template>
  <TransitionRoot as="template" :show="props.isOpen">
    <Dialog class="relative z-10" @close="closePopup">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="open = false">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                    얘약 정보 입력
                  </DialogTitle>
                  <div class="mt-2 flex">
                    <div class="isolate -space-y-px rounded-md shadow-sm">
                      <div class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                        <label for="name" :class="`block text-xs font-medium  ${isNameInput ? 'text-gray-900' : 'text-red-600'}`">{{ isNameInput ? '성함' : '성함을 입력해주세요'}}</label>
                        <input type="text" name="name" id="name"
                               class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                               placeholder="성함"
                               v-model="name"
                        />
                      </div>
                      <div class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                        <label for="job-title" :class="`block text-xs font-medium ${isNumberInput ? 'text-gray-900' : 'text-red-600'}`">{{ isNumberInput ? '전화번호' : '전화번호를 입력해주세요'}}</label>
                        <input type="text" name="job-title" id="job-title"
                               class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                               placeholder="전화번호"
                               v-model="number"
                        />
                      </div>
                    </div>
                    <div class="w-1/2 m-auto">
                      <p>결제 방법</p>
                      <div class="flex w-full justify-center items-center">
                        <div :class="`${paymentMethod ? 'bg-orange-600 text-white' : 'bg-slate-50'} rounded-l-lg hover:bg-orange-500 hover:text-white w-24 h-24 flex flex-col justify-center items-center cursor-pointer`"
                             @click="clickPaymentMehod(1)"
                        >
                          <CreditCardIcon class="w-14"/>
                          <p>온라인 결제</p>
                        </div>
                        <div :class="`${!paymentMethod ? 'bg-orange-600 text-white' : 'bg-slate-50'}  rounded-r-lg hover:bg-orange-500 hover:text-white w-24 h-24 flex flex-col justify-center items-center cursor-pointer`"
                             @click="clickPaymentMehod(0)"
                        >
                          <BuildingStorefrontIcon class="w-14"/>
                          <p>현장 결제</p>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="flex">
                    <div class="flex h-6 items-center">
                      <input id="comments" aria-describedby="comments-description" v-model="checkPersonalInfo" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                      <label for="comments" class="font-medium text-gray-900">봉타이어의 개인 정보 수집에 동의 합니다.</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" @click="comfirmReservation">예약</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closePopup">취소</button>
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