// src/stores/counter.js
import { defineStore } from 'pinia'
import { IPostCategory } from '../util/type/post'

export const usePostStore = defineStore('post', {
  // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
  state: () => ({
    PostId: -1,
    PTCD: '',
    PCCD: '',
    title: '',
    content: '',
    WriterId : '',
    WriterName : '',
    WriterEmail: '',
    isPin: -1,
    isActive: 1,
    isAnswer: -1,
    isThumbnail: -1,
    thumbnail: '',
    answer: '',
    viewers: 0,
    isSecret: -1,
    createdAt: '',
    updatedAt : '',
  }),
  getters: {
    getPCCD: state=>{return state.PCCD}
  },
  // 상태값을 바꾸고 싶을 떄! 
  // 여기서 this 쓰는거 유의하기!
  actions: {
    setTitle(title:string){
        this.title = title ?? ''
    },
    setCategory(category: IPostCategory){
        this.PTCD = category.PTCD ?? ''
        this.PCCD = category.PCCD ?? ''
        this.isAnswer = category.isAnswer ?? -1
        this.isThumbnail = category.isThumbnail ?? -1
        this.isSecret = category.isSecret ?? -1
    }

  },
})