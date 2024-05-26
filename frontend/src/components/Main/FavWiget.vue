<template>
    <div class="overflow-auto sm:mr-5 mr-5 min-w-24 sm:w-44 w-24 h-24 border rounded-md border-solid border-gray-300 flex justify-around items-center">
      <router-link :to="FavWigetUrl">
        <div class="flex items-center justify-center">
            <img class="h-14 sm:h-10 sm:h-14" :src="FavWigetIcon"  />
        </div>
        <p class="font-medium sm:text-l text-s text-center">{{FavWigetTitle}}</p>
      </router-link>
    </div>

</template>

<script lang="ts" setup>
interface IFavWiget{
    id: number | null
    isUrl?: boolean | null
    url?: string | null
    title: string
    icon?: string | null
}

const props = defineProps({    
    conf: {
        type: Object as PropType<IFavWiget> | undefined,
        default: () => {
            isUrl: false
        },
    },
})
const confProps = props.conf
const FavWigetTitle = confProps?.title ?? ''
const FavWigetIsUrl = confProps?.isUrl
const FavWigetUrl = confProps?.url ?? ''
const FavWigetIcon = confProps?.icon ?? ''


</script>

<style>

</style>