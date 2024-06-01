<script setup lang="ts">
import {computed, PropType, ref} from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ChevronRightIcon, UsersIcon } from '@heroicons/vue/24/outline'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {IProduct} from "@type/product.ts";
import ProductCard from "@component/Product/ProductCard.vue";

const props = defineProps({
  isOpen:{
    type: Boolean
  },
  conf:{
    type: Array as PropType<IProduct> | undefined
  },
})

const emits = defineEmits(['closeSearch', 'searchProduct'])

const closeSearch = ()=>{
  emits('closeSearch')
}

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
const router = useRouter()

const query = ref('')
const filteredPeople = computed(() =>
    query.value === ''
        ? []
        : people.filter((person) => {
          return person.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

function onSelect(person) {
  window.location = person.url
}

const moveDetailPage = (id:number) =>{
  router.push(`/product/${id}?pccd=P0601`)
}

const inputSearchBox = (target:any) =>{
  query.value = target?.value
  emits('searchProduct', query.value)
}

</script>

<template>
  <TransitionRoot :show="props.isOpen" as="template" @after-leave="query = ''" appear>
    <Dialog class="relative z-10" @close="closeSearch">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <DialogPanel class="mx-auto max-w-4xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <Combobox @update:modelValue="onSelect">
              <ComboboxInput class="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm" placeholder="Search..." @change="inputSearchBox($event.target)" @blur="query = ''" />

              <ComboboxOptions v-if="props.conf.length > 0" static class="-mb-2 max-h-96 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                <ProductCard :conf="props.conf" @moveDetailPage="moveDetailPage" />
              </ComboboxOptions>

              <div v-if="query !== '' && props.conf.length === 0" class="px-4 py-14 text-center sm:px-14">
                <UsersIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p class="mt-4 text-sm text-gray-900">상품을 찾을 수가 없습니다</p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>

</style>