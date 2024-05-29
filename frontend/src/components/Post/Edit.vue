<template>
  <div class="w-full h-256">
    <QuillEditor :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const options = {
  debug: 'info',
  modules: {
    toolbar: [
      ['header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',],
    ],
  },
  placeholder: '내용을 입력해주세요',
  theme: 'snow'
}

</script>

<style>

</style>