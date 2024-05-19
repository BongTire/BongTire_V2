// src/stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  // 상태값을 바꾸고 싶을 떄! 
  // 여기서 this 쓰는거 유의하기!
  actions: {
    increment() {
      this.counter++
    },
  },
})