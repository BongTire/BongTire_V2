<script setup lang="ts">
import {PropType, ref} from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import {IBrand} from "@type/brand.ts";
import { IPCCD } from '@type/common.ts'
import MultiSelect from 'primevue/multiselect';
import { useCommonStore } from '@store/common.ts'
import defaultLogo from '@image/Company/BongTireLogo.png'

const emits = defineEmits(['closePopup'])
const props = defineProps({
  conf:{
    type: Object as PropType<IBrand>
  },
  isOpen:{
    type: Boolean
  }
})
const store = useCommonStore()
const PCCD = computed(()=>store.getPCCD)

const brandFeature = ref(PCCD.value.filter((item:IPCCD) => item?.PCCD.startsWith('T10') || item?.PCCD.startsWith('C07') || item?.PCCD.startsWith('P06')))

const closeDialog = () =>{
  emits('closePopup')
  editMode.value = false
}
const editBrand = ref<IBrand>()

watch(()=>props.conf, ()=>{
  initData()
})

const selectBrandFeature = ref([]);

const editMode = ref(false)
const initData = () =>{
  if(props.conf){
    editBrand.value = {
      BrandId: props.conf?.BrandId ?? null,
      name: props.conf?.name ?? '',
      codeName: props.conf?.codeName ?? '',
      PCCD: props.conf?.PCCD ?? [],
      brandLogo: props.conf?.brandLogo ?? '',
      origin: props.conf?.origin ?? 0,
      nation: props.conf?.nation ?? ''
    }
    selectBrandFeature.value = PCCD.value.filter((item:IPCCD) => editBrand.value?.PCCD.some((pccd:IBrand) => item.PCCD.startsWith(pccd)));
  }else{
    editBrand.value = {
      BrandId:  null,
      name: '',
      codeName: '',
      PCCD: [],
      brandLogo: '',
      origin:  0,
      nation: ''
    }
    selectBrandFeature.value = []
    editMode.value = true
  }

  console.log(selectBrandFeature.value);
}

const clickEditMode = () =>{
  if(editMode.value){
    // emit으로 보내기
    selectBrandFeature.value.map((item:IBrand) =>{
      if(!editBrand.value?.PCCD.includes(item?.PCCD)){
        if(item?.PCCD){
          editBrand.value?.PCCD.push((item?.PCCD))
        }
      }
    })
    console.log(editBrand.value)
  }else{
    editMode.value = true
  }
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
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeDialog">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">브랜드 수정</DialogTitle>
                  <div class="mt-2">
                    <div class="sm:items-start sm:gap-4 sm:py-6">
                      <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">브랜드 로고</label>
                      <div class="mt-2 sm:col-span-2 sm:mt-0">
                      <!-- 브랜드 로고 수정 부분 -->
                        <div v-if="!editMode" class="flex justify-center items-center w-full">
                          <img :src="editBrand?.brandLogo ?? defaultLogo" class="w-1/2" />
                        </div>
                        <div v-else class="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div class="text-center">
                            <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                              </label>
                              <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="flex w-full">
                      <div class="w-1/2 mr-5">
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">브랜드 명</label>
                        <div class="mt-2">
                          <input type="text" name="name" id="name"
                                 class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 placeholder="브랜드명"
                                 :value="editBrand?.name"
                                 :disabled="!editMode"
                          />
                        </div>
                      </div>
                      <div class="w-1/2 mr-5">
                        <label for="codeName" class="block text-sm font-medium leading-6 text-gray-900">브랜드 영문 명</label>
                        <div class="mt-2">
                          <input type="text" name="codeName" id="codeName"
                                 class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 placeholder="브랜드 영문 명"
                                 :value="editBrand?.codeName"
                                 :disabled="!editMode"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="w-full mt-5 justify-start">
                      <p class="mb-5">브랜드 특징</p>
                      <div class="card flex justify-start">
                        <MultiSelect v-model="selectBrandFeature" display="chip" :options="brandFeature" optionLabel="secondName"
                                     placeholder="브랜드 특징"
                                     :maxSelectedLabels="5" class="w-full flex items-center h-10 md:w-[20rem] "
                                     :disabled="!editMode"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button v-if="!editMode" type="button" class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto" @click="clickEditMode">편집</button>
                <button v-else type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" @click="clickEditMode">저장</button>
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