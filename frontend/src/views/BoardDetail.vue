<template>
    <div class="bg-white px-6 py-32 lg:px-8">
      <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <!-- 현재 페이지 명 -->
        <p class="text-base font-semibold leading-7 text-orange-600">Introducing</p>
        <!-- 해당 게시물에 대한 제목 -->
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">JavaScript for Beginners</h1>
        <!-- 작성자 -->
        <div v-html="content">

        </div>
        <!-- 댓글 시작 -->
    <div class="flex items-start space-x-4 mt-10">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
            <!-- username -->
            <span class="font-medium leading-none text-white">관</span>
        </span>
        <div class="min-w-0 flex-1">
            <form action="#">
                <div class="border-b border-gray-200 focus-within:border-orange-600">
                    <label for="comment" class="sr-only">Add your comment</label>
                    <!-- 관리자가 아니라면 disable -->
                        <textarea rows="3" name="comment" id="comment" class="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-600 focus:ring-0 sm:text-sm sm:leading-6" placeholder="답변" />
                </div>
                <div class="flex justify-between pt-2">
                    <div class="flex items-center space-x-5">    
                    </div>
                    <div class="flex-shrink-0">
                        <button type="submit" class="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">등록</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
      </div>
      
    </div>

    

  </template>
  
  <script setup>
  import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'
  import { ref } from 'vue'
import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid'

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIconMini, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

const selected = ref(moods[5])

  const content = `<p class="text-base font-medium leading-7 text-gray-600">Introducing</p>
        <p class="mt-6 text-xl leading-8">Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.</p>
        <div class="mt-10 max-w-2xl">
          <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.</p>
          <p class="mt-8">Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.</p>
          <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">From beginner to expert in 3 hours</h2>
          <p class="mt-6">Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.</p>
          <p class="mt-10">Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
        </div>
        <div class="mt-16 max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Everything you need to get up and running</h2>
          <p class="mt-6">Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.</p>
          <p class="mt-8">Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
        </div>`


  </script>