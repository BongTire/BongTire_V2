// src/stores/counter.js
import { defineStore } from 'pinia'
import { IPCCD, IPTCD,  IFetchType} from '../util/type/common'




export const useCommonStore = defineStore('common', {
  // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
  state: () => ({
    PCCD: [],
    PTCD: []

  }),
  getters: {
    getPCCD: state=>{return state.PCCD},
    getProductType: state=>{ return state.PCCD.filter(item => item['PCCD'] && item['PCCD'].includes('P06')) }
  },
  // 상태값을 바꾸고 싶을 떄! 
  // 여기서 this 쓰는거 유의하기!
  actions: {
    async initCommon(ptcd:IPTCD[], pccd:IPCCD[]){        
        this.PTCD = ptcd
        this.PCCD = pccd
    }

  },
})

