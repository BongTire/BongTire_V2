// src/stores/counter.js
import { defineStore } from 'pinia'
import {IPost} from "../util/type/post.ts";

export const usePageStore = defineStore('page', {
    // 화살표 함수는 객체 반환시 소괄호 사용 (= return기능)
    state: () => ({
       pageInfo:{}
    }),
    getters: {
        getPostDetail: state =>{ return state.pageInfo}
    },
    // 상태값을 바꾸고 싶을 떄!
    // 여기서 this 쓰는거 유의하기!
    actions: {
        setPostDetail(post:IPost){
            console.log(post)
            this.pageInfo=post
        }

    },
})