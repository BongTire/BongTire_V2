<template>
    <div class="bg-white ">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in props.conf" :key="post.id" @click="clickPost(post)" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 cursor-pointer">
            <img :src="post?.thumbnail" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
  
            <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <time :datetime="post.updatedAt" class="mr-8">{{ post?.updatedAt ? post?.updatedAt.slice(0,10) : null}}</time>
              <div class="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div class="flex gap-x-2.5">
                  <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                    <span class="text-xs font-medium leading-none text-white">{{ post?.writerName ? post?.writerName.slice(0,1) : null }}</span>
                  </span>
                  {{ post.WriterName }}
                </div>
              </div>
            </div>
            <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
              <a :href="post.href">
                <span class="absolute inset-0" />
                {{ post?.title }}
              </a>
            </h3>
          </article>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import{IPost}from'../../util/type/post'

  const props = defineProps({
    conf:{
      type: Array as PropType<IPost> | undefined
    }
  })

  const emits = defineEmits(['movePostDetail'])

  const clickPost = (post: IPost) =>{
    emits('movePostDetail',post)
  }
  


  </script>