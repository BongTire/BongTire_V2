<template>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="post in props.conf" :key="post.PostId" class="relative py-5 hover:bg-gray-50 cursor-pointer">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mx-auto flex max-w-4xl justify-between gap-x-6">
            <div class="flex min-w-0 gap-x-4">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                <span class="font-medium leading-none text-white">{{post?.WriterName.slice(0,1)}}</span>
              </span>
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ post.title }}
                </p>
                <p class="mt-1 flex text-xs leading-5 text-gray-500">
                  <a :href="`mailto:${post.WriterEmail}`" class="relative truncate hover:underline">{{ post?.WriterName ?? '' }}</a>
                </p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <p class="mt-1 text-xs leading-5 text-gray-500">
                  <time :datetime="post.updatedAt">{{ post.updatedAt }}</time>
                </p>

                <div v-if="post.answer" class="mt-1 flex items-center gap-x-1.5">
                  <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p class="text-xs leading-5 text-gray-500">답변 완료</p>
                </div>

                <div v-else class="mt-1 flex items-center gap-x-1.5">
                  <div class="flex-none rounded-full bg-red-500/20 p-1">
                    <div class="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <p class="text-xs leading-5 text-gray-500">미답변</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </template>
  
  <script setup lang="ts">
  import { ChevronRightIcon } from '@heroicons/vue/20/solid'

  const props = defineProps({
    conf:{
      type: Array as PropType<IPost> | undefined
    }
  })
  

  </script>

<style>

</style>