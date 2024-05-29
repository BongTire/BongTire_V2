<template>
    <Loading v-if="homeLoading" class=""/>
    <div v-else class="w-full max-w-7xl m-auto">
      <div class="card m-auto min-h-100">
      </div>
        <div class="mt-10">
            <Introduction/>
        </div>
       
    </div>  
</template>

<script lang="ts" setup>

import Introduction from '../components/Introduction/Introduction';
import Loading from '../components/Common/Loading'



const homeLoading = ref(false)











</script>

<style>

</style>