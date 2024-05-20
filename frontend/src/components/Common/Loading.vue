<template>
    <div class="min-h-screen relative">
    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
      </TransitionChild>
  
    <div class="absolute left-1/2 top-1/3 flex flex-col justify-center items-center ">
        <img class="h-28" src="@image/systemIcon/Common/Loading.gif" alt="">
        <p>로딩 중...</p>
    </div>
    
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>