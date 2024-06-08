<template>
  <ReservationCheckBox :conf="checkReservationResult" :isOpen="isCheckReservation" @closeDialog="closeCheckReservation" @confirmDialog="checkReservation" :isResult="isResultReservation"/>
    <Loading v-if="homeLoading" class=""/>
    <div v-else class="w-full max-w-7xl m-auto">
      <div class="card m-auto min-h-100">
        <Galleria :value="event"
                  :responsiveOptions="responsiveOptions"
                  :numVisible="5"
                  :circular="true"
                  containerStyle="max-width: 1100px; margin: auto"
                  :showItemNavigators="true"
                  :showThumbnails="false"
                  :showItemNavigatorsOnHover="true"
                  :showIndicators="true"
        >
          <template #item="slotProps">
            <img :src="slotProps.item.thumbnail" style="width: 100%; display: block;" @click="clickEvent(slotProps.item.url)" />
          </template>
        </Galleria>
      </div>
        <div class="flex justify-between overflow-auto min-h-32">
            <favWiget v-for="fav in favWigetData"  :conf="fav" @clickBox="clickFavBox"/>
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
import {IEvent, IFetchType} from "@type/common.ts";
import {fetchGetData,fetchPostData } from "@api/common.ts";
import ReservationCheckBox from "@component/Reservation/ReservationCheckBox.vue";
import {IUser} from "@type/user.ts";
import {IReservationMaster} from "@type/reservation.ts";

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

const favWigetData = [
    {
        id: 1,
        isUrl : true,
        url: "/tire?pccd=P0601",
        title: "타이어",
        icon: "http://www.test-devdubu.com/images/systemIcon/Car/tire-icon.png"
    },
    {
        id: 2,
        isUrl : true,
        url: "/tire?pccd=P0601&isSecond=1",
        title: "중고 타이어",
        icon: `http://www.test-devdubu.com/images/systemIcon/Car/tire-test-icon.png`
    },
    {
        id: 2,
        isUrl : true,
        url: "/wheel?pccd=P0602",
        title: "휠",
        icon: `http://www.test-devdubu.com/images/systemIcon/Car/wheel-icon.png`
    },
    {
        id: 3,
        isUrl : true,
        url: "/wheel?pccd=P0602&isSecond=1",
        title: "중고 휠",
        icon: `http://www.test-devdubu.com/images/systemIcon/Car/wheel-icon 1.png`
    },
    {
        id: 4,
        isUrl : true,
        url: "/reservation?pccd=R0801",
        title: "예약",
        icon: `http://www.test-devdubu.com/images/systemIcon/Car/car-repair-icon.png`
    },
    {
        id: 4,
        isUrl : false,
        url: '',
        title: "예약 조회",
        icon: `http://www.test-devdubu.com/images/systemIcon/Car/car-repair-icon.png`
    },
]
const router = useRouter()
const homeLoading = ref(true)
const event = ref<IEvent>()

onMounted( async()=>{
  const eventPromise:Promise<IFetchType> = fetchGetData('/post/event', {})
  const eventState = await eventPromise
  event.value = eventState.data

  if(event.value){
    homeLoading.value = false
  }

})

const clickEvent = (url:string) =>{
  router.push(url)
}

const isCheckReservation = ref(false)
const checkReservationResult = ref<IReservationMaster>()
const isResultReservation = ref(false)

const clickFavBox = () =>{
  isCheckReservation.value = true
}
const closeCheckReservation = () =>{
  isCheckReservation.value = false
  isResultReservation.value = false
}

const checkReservation = async (user:IUser) =>{
  console.log(user)
  const checkProise:Promise<IFetchType> = fetchPostData('/reservation/inquiry',{}, {data:user})
  const checkStatus = await checkProise

  checkReservationResult.value = checkStatus.data
  isResultReservation.value = true
  console.log(checkReservationResult.value)

}








</script>

<style>

</style>