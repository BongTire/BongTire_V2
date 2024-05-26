<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {ExclamationTriangleIcon, PhotoIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {IPCCD} from "@type/common.ts";
import {useCommonStore} from "@store/common.ts";

const open = ref(true)

const store = useCommonStore()

const productType = computed(()=>store.getProductType)
const emits = defineEmits(['postData', 'closePopup'])
const props = defineProps({
  isOpen:{
    type: Boolean
  }
})

const editPCCD = ref<IPCCD>({
    PCCDId : null,
    firstName: '상품',
    firstCodeName: 'P06',
    secondName: '',
    secondCodeName: `${(productType.value.length+1) / 10 > 1 ? productType.value.length+1 : '0'+(productType.value.length+1)}`,
    PCCD: `P06${(productType.value.length+1) / 10 > 1 ? productType.value.length+1 : '0'+(productType.value.length+1)}`,
    icon: '',
})

const inputPCCD = (newValue: string | null) =>{
  editPCCD.value.secondName = newValue
}

const clickEditProductType = () =>{
  emits('postData', editPCCD.value)
}

const closePopup = () =>{
  emits('closePopup')
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
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" @click="closePopup">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">상품 타입 추가</DialogTitle>
                  <div class="mt-2">
                    <div class="flex justify-center items-center w-full">
                      <div>
                        <p class="mb-5 block text-sm font-medium text-lg leading-6 text-gray-900">상품 타입 아이콘</p>
                        <div class="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div class="text-center">
                            <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                              </label>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                      <div class="w-1/2 pl-5">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">상품 타입 명</label>
                        <div class="mt-2">
                          <input type="email" name="email" id="email"
                                 class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                 placeholder="예) 오일, 와이퍼"
                                 :value="editPCCD.secondName"
                                 @input="inputPCCD($event.target?.value)"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" @click="clickEditProductType">저장</button>
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