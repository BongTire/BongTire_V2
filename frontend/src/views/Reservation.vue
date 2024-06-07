<template>
  <CheckUser :isOpen="isOpenCheckUser" @closePopup="closeCheckUser" @confirm="confirmReservation" />
  <Warning :isOpen="isOpenWarning" :message="warnMessage" @closeNoti="closeNotification"/>
  <ResultDialog :isOpen="isOpenResultReserve" :message="isReserveResultMessage" @closeDialog="closeResultDialog"/>
  <div class="flex w-full max-w-7xl m-auto">
      <div class="flex flex-col w-1/2">
      <div>
        <Calendar :conf="visibleCalendar" :date="date" @selectDate="selectDate"/>
      </div>
      <div>
        <Time :conf="visibleTime"/>
      </div>
      <div class="w-full max-w-md ">
        <label for="comment" class="block mt-10 text-xl font-medium leading-6 text-gray-900">요청 사항</label>
        <div class="mt-2">
          <textarea rows="4" name="comment" id="comment" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>

      </div>
    </div>
    <div class="w-1/2 overflow-y-auto h-screen w-1/2 scrollbar scrollbar-thumb:hover">
      <ProductInfo/>
    </div>
  </div>
  <div class="w-full flex justify-end items-center pr-10">
    <button
        type="button"
        class="w-20 mr-5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      취소
    </button>
    <button
        type="button"
        class="w-20 rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="openCheckUser"
    >
      예약
    </button>
    <input type="hidden" name="enc_info" v-model="enc_info"/>
    <input type="hidden" name="enc_data" v-model="enc_data"/>
    <input type="hidden" name="tran_cd"  v-model="tran_cd"/>
  </div>
  
</template>

<script lang="ts" setup>
import Calendar from '../components/Reservation/Calendar'
import Time from '../components/Reservation/Time'
import CheckUser from '../components/PopUp/CheckUser'
import ProductInfo from '../components/Reservation/ProductInfo'
import {ICalendar, IPaymentParams, IReservationTime} from '../util/type/reservation';
import {IFetchType, IMessage} from '../util/type/common'
import { fetchGetData, fetchPostData } from '../api/common'
import Warning from "@component/Notification/Warning.vue";
import {IUser} from "@type/user.ts";
import {useReservationStore} from "@store/reservation.ts";
import {exportUserInfo } from '../util/func/common'
import ResultDialog from "../components/Notification/ResultDialog.vue";
import axios from "axios";

// 캘린더 관련 변수
const visibleCalendar = ref<ICalendar[][]>()
const today = new Date()
const presentYear = ref(today.getFullYear())
const presentMonth = ref(today.getMonth() + 1)
const presentDay = ref(today.getDate())
const date = ref({
  year: presentYear.value,
  month: presentMonth.value,
  day: presentDay.value
})
// 스토어 지정
const store = useReservationStore()
const userInfo = exportUserInfo()

const router = useRouter()

//Loading 변수
const calendarLoading = ref(true)
const timeLoading = ref(true)

// 예약 시간 변수
const visibleTime = ref<IReservationTime[]>()
const isOpenCheckUser = ref(false)

// notification
const isOpenWarning = ref(false)
const warnMessage = ref({
  title: '',
  message: ''
})

// 예약 최종 성공 여부 변수
const isOpenResultReserve = ref(false)
const isReserveResultMessage = ref({
  title: '',
  message: '',
  status: ''
})

//결제 모듈 부분 변수
const enc_info = ref('')
const enc_data = ref('')
const tran_cd = ref('')


const closeCheckUser = ( ) =>{
  isOpenCheckUser.value = false
}

const openCheckUser = ( ) =>{

  if(store.getCalendar === -1){
    warnMessage.value = {
      title:'날짜 예약',
      message: '날짜를 선택해주세요'
    }
    notificationWarning(warnMessage.value)
    return
  }
  if(store.getReservationTime === -1){
    warnMessage.value = {
      title:'시간 예약',
      message: '시간을 선택해주세요'
    }
    notificationWarning(warnMessage.value)
    return
  }
  if(store.getReservationProduct.length < 1){
    warnMessage.value = {
      title:'상품 예약',
      message: '상품을 선택해주세요'
    }
    notificationWarning(warnMessage.value)
    return
  }

  if(userInfo?.grade === 0){
    postReservation()
  }else{
    isOpenCheckUser.value = true
  }




}

onMounted(async ()=>{

  if(userInfo || userInfo?.name){
    const user = {
      name : userInfo.name ?? '',
      number : userInfo.number ?? '',
      UserId : userInfo.UserId ?? '',
    }
    store.setReservationUser(user, 0)

    loadExternalScript('https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js')
        .then(() => {
          console.log('External script loaded successfully');
        })
        .catch((error) => {
          console.error('Failed to load external script:', error);
        });
  }

  // 캘린더
  const calendarPromise:Promise<IFetchType> = fetchGetData<IFetchType>('/reservation/calendar', {ptcd:'R0401',pccd: 'R0801'})
  const calendarData = await calendarPromise
  visibleCalendar.value = calendarData.data.date

  date.value = {
    year: calendarData.data.year,
    month: calendarData.data.today.month,
    day: calendarData.data.today.day,
  }

  const postData = {
    data: date.value
  }
  // 시간
  const timePromise:Promise<IFetchType> = fetchPostData<IFetchType>('/reservation/time', {ptcd:'R0401', pccd:'R0801'}, postData)
  const time = await timePromise
  visibleTime.value = time.data

  if(visibleCalendar.value){
    calendarLoading.value = false
  }

  if(visibleTime.value){
    timeLoading.value = false
  }

})

const selectDate = async (day:ICalendar) =>{
  console.log(day)

  date.value = {
    ...date.value,
    month: day.month,
    day: day.day
  }

  const postData = {
    data: date.value
  }

  const timePromise:Promise<IFetchType> = fetchPostData<IFetchType>('/reservation/time', {ptcd:'R0401',pccd: 'R0801'}, postData)
  const time = await timePromise
  visibleTime.value = time.data
}

const confirmReservation = (user:IUser, payment:number) =>{
  store.setReservationUser(user, payment)
  postReservation()
}

const notificationWarning = (message:IMessage) =>{
  warnMessage.value = ({
    title: message.title,
    message: message.message
  })
  isOpenWarning.value = true
}

const closeNotification = ( ) =>{
  isOpenWarning.value = false
}

const postReservation = async () =>{
  const reserve = store.getReservationInfo
  console.log(reserve)

  // 만약 totalPrice 가 0이라면 강제 리다이렉션
  // payment가 === 1이라면 결제 모듈 분기 처리
  // payment가 === 0이라면 결제 모듈 분기 처리 X


  const responsePromise:Promise<IFetchType> = fetchPostData('/reservation',{},reserve)
  const response = await responsePromise

  console.log(response)

  const paymentParams = {
    ordr_idxx: response.data?.ordr_idxx ?? '1',
    good_name:  response.data?.good_name ?? '상품명',
    good_mny:  response.data?.good_mny ?? '10000',
    currency: response.data?.currency ?? 'WON',
    buyr_name: response.data?.buyr_name ?? '진민',
    buyr_tel1: response.data?.buyr_tel1 ?? '01012345678',
    buyr_mail: response.data?.buyr_mail ?? 'example@example.com',
  }


  if(response.status.code === 2000){
    // TODO 예약 성공
    isReserveResultMessage.value = {
      title: '예약 성공',
      message: '예약에 성공 했습니다.',
      status: 'success'
    }
    if(reserve.paymentMethod === 1){
      await initiatePayment(paymentParams)
    }
    else if(reserve.paymentMethod === 0){
      isOpenResultReserve.value = true
    }
  }else{
    // TODO 예약 실패
    isReserveResultMessage.value = {
      title: '예약 실패',
      message: '예약에 실패 했습니다. 관리자에게 문의 해주세요',
      status: 'error'
    }
    isOpenResultReserve.value = true
  }


}

const closeResultDialog = () =>{
  router.push('/')
}

// nhn 결제 모듈 함수


function m_Completepayment( FormOrJson, closeEvent ) {
  var frm = document.order_info;
  GetField( frm, FormOrJson );

  if( frm.res_cd.value == "0000" )
  {
    frm.submit();
  }
  else
  {
    alert( "[" + frm.res_cd.value + "] " + frm.res_msg.value );
    closeEvent();
  }
}

const loadExternalScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(script);
  });
}
const initiatePayment = () => {
  // 결제 폼 생성 및 필요한 필드 추가
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'http://localhost:4000/api/payment'); // 실제 결제 요청 URL 필요시 변경

  const params = {
    site_cd: 'T0000',
    ordr_idxx: '1',
    pay_method: 100000000000,
    good_name: '상품명',
    good_mny: '10000',
    currency: 'WON',
    buyr_name: '진민',
    buyr_tel1: '01012345678',
    buyr_mail: 'example@example.com',
    enc_info : enc_info.value,
    enc_data: enc_info.value,
    tran_cd: tran_cd.value,
  };

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', params[key]);
      form.appendChild(input);
    }
  }

  document.body.appendChild(form);

  // jsf_pay 함수를 통해 KCP_Pay_Execute_Web 호출
  if (typeof jsf_pay === 'function') {
    jsf_pay(form);
  } else {
    console.error('jsf_pay function is not available');
  }
}



function jsf_pay(form) {
  try {
    KCP_Pay_Execute_Web(form);
  } catch (e) {
    // IE에서 결제 정상종료시 throw로 스크립트 종료
  }
}

</script>


<style>

</style>