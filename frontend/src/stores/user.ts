// src/stores/user.js
import { defineStore } from 'pinia'
import { IUser } from '../util/type/user'

export const useUserStore = defineStore('user', {

    state: () => ({
        UserId: null,
        name: null,
        phoneNumber: null,
        email: null,
        grade: null
    }),
    getters: {
        getUserId: state => state.UserId,
        getUserGrade: state => state.grade,
        getUserName: state => state.name,
    },
    actions: {
        setUserInfo(userInfo: IUser) {
            this.UserId = userInfo.UserId ?? null
            this.name = userInfo.name ?? null
            this.phoneNumber = userInfo.number ?? null
            this.email = userInfo.email ?? null
            this.grade = userInfo.grade ?? null
        }
    },
})