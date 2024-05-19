<template>
  <div class="w-full h-256">
    <QuillEditor theme="snow"  placeholder="글을 작성해주세요"/>
  </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

</script>

<style>

</style>