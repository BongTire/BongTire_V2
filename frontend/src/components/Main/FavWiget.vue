<template>
    <div class="lg:w-44 lg:h-20 md:w-24 md:40 md:flex-col lg:flex-row border rounded-md border-solid border-gray-300 flex justify-around items-center">
        <div class="">
            <img class="lg:h-16 md:h-12" :src="FavWigetIcon"  />
        </div>
        
            <p class="font-medium text-l text-center">{{FavWigetTitle}}</p>
        
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