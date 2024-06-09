// src/stores/counter.js
import { defineStore } from 'pinia'
import { IPostCategory } from '../util/type/post'

export const usePostStore = defineStore('post', {
  // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
  state: () => ({
    PostId: null,
    PTCD: '',
    PCCD: '',
    title: '',
    content: '',
    WriterId : -1,
    WriterName : '',
    WriterEmail: '',
    isPin: -1,
    isActive: 1,
    isAnswer: -1,
    isThumbnail: -1,
    isMainPost: 0,
    thumbnail: '',
    answer: '',
    viewers: 0,
    isSecret: -1,
    createdAt: null,
    updatedAt : null,
  }),
  getters: {
    getPCCD: state=>{return state.PCCD},
    getPostData: state =>{
      const data = {
        PostId: state.PostId,
        PTCD: state.PTCD,
        PCCD: state.PCCD,
        title: state.title,
        content: state.content,
        UserId : state.WriterId,
        name : state.WriterName,
        email: state.WriterEmail,
        isPin: state.isPin,
        isActive: state.isActive,
        isAnswer: state.isAnswer,
        isMainPost: state.isMainPost,
        isThumbnail: state.isThumbnail,
        thumbnail: state.thumbnail,
        answer: state.answer,
        viewers: state.viewers,
        isSecret: state.isSecret,
        createdAt: state.createdAt,
        updatedAt : state.updatedAt,
      }

      return data
    },
    getContent:state => {
      return state.content
    },
    getIsMainPost:state => {
      return state.isMainPost
    }
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
    },
    setContent(content: string){
      this.content = content ?? ''
    },
    setPostSecret(isSecret: number){
      this.isSecret = isSecret
    },
    setThumbnail(thumbnail: string){
      this.thumbnail = thumbnail ?? ''
    },
    setIsMainPost(isMainPost: number){
      this.isMainPost = isMainPost ?? 0
    },
    setUserId(userId: number){
      this.WriterId = userId
    }
  },
})