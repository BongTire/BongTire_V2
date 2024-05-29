<template>
    <Loading v-if="homeLoading" class=""/>
    <div v-else class="w-full max-w-7xl m-auto">
      <div class="card m-auto min-h-100">
        <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 1100px; margin: auto"
                  :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
          <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
          </template>
        </Galleria>
      </div>
        <div class="flex justify-between overflow-auto min-h-32">
            <favWiget v-for="fav in favWigetData"  :conf="fav"/>
        </div>
        <div class="mt-10">
            <IntroService/>
        </div>
        <div class="mt-10">
            <IntroProduct/>
        </div>
    </div>  
</template>

<script lang="ts" setup>
import IntroService from '../components/Main/IntroService';
import IntroProduct from '../components/Main/IntroProduct';
import favWiget from '../components/Main/FavWiget';
import Loading from '../components/Common/Loading'
import Galleria from 'primevue/galleria';
const responsiveOptions=  [
  {
    breakpoint: '991px',
    numVisible: 4
  },
  {
    breakpoint: '767px',
    numVisible: 3
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]
const images=[
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
    alt: 'Description for Image 2',
    title: 'Title 2'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
    alt: 'Description for Image 3',
    title: 'Title 3'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4s.jpg',
    alt: 'Description for Image 4',
    title: 'Title 4'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5s.jpg',
    alt: 'Description for Image 5',
    title: 'Title 5'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6s.jpg',
    alt: 'Description for Image 6',
    title: 'Title 6'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria7s.jpg',
    alt: 'Description for Image 7',
    title: 'Title 7'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria8.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria8s.jpg',
    alt: 'Description for Image 8',
    title: 'Title 8'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria9.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria9s.jpg',
    alt: 'Description for Image 9',
    title: 'Title 9'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10s.jpg',
    alt: 'Description for Image 10',
    title: 'Title 10'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria11s.jpg',
    alt: 'Description for Image 11',
    title: 'Title 11'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria12.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria12s.jpg',
    alt: 'Description for Image 12',
    title: 'Title 12'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria13.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria13s.jpg',
    alt: 'Description for Image 13',
    title: 'Title 13'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria14.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria14s.jpg',
    alt: 'Description for Image 14',
    title: 'Title 14'
  },
  {
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria15.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria15s.jpg',
    alt: 'Description for Image 15',
    title: 'Title 15'
  }
];

const favWigetData = [
    {
        id: 1,
        isUrl : true,
        url: "/tire?pccd=P0601",
        title: "타이어",
        icon: "/src/assets/image/systemIcon/Car/tire-icon.png"
    },
    {
        id: 2,
        isUrl : true,
        url: "/tire?pccd=P0601&isSecond=1",
        title: "중고 타이어",
        icon: `/src/assets/image/systemIcon/Car/tire-test-icon.png`
    },
    {
        id: 2,
        isUrl : true,
        url: "/wheel?pccd=P0602",
        title: "휠",
        icon: `/src/assets/image/systemIcon/Car/wheel-icon.png`
    },
    {
        id: 3,
        isUrl : false,
        url: "/wheel?pccd=P0602&isSecond=1",
        title: "중고 휠",
        icon: `/src/assets/image/systemIcon/Car/wheel-icon 1.png`
    },
    {
        id: 4,
        isUrl : true,
        url: "/reservation?pccd=R0801",
        title: "예약",
        icon: `/src/assets/image/systemIcon/Car/car-repair-icon.png`
    },
    {
        id: 4,
        isUrl : false,
        url: '',
        title: "예약 조회",
        icon: `/src/assets/image/systemIcon/Car/car-repair-icon.png`
    },
]

const homeLoading = ref(false)











</script>

<style>

</style>