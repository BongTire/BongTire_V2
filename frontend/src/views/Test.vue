<template>
  <div>
    <h1>NHN KCP 결제 모듈 예제</h1>
      <button @click="initiatePayment">결제하기</button>
      <input type="hidden" name="enc_info" v-model="enc_info"/>
      <input type="hidden" name="enc_data" v-model="enc_data"/>
      <input type="hidden" name="tran_cd"  v-model="tran_cd"/>
  </div>
</template>

<script lang="ts" setup>

const enc_info = ref('')
const enc_data = ref('')
const tran_cd = ref('')

onMounted(()=>{
  loadExternalScript('https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js')
      .then(() => {
        console.log('External script loaded successfully');
      })
      .catch((error) => {
        console.error('Failed to load external script:', error);
      });
})

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

