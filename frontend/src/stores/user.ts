// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

    state: () => ({
        UserId: null,
        name: null,
        number: null,
        email: null,
        grade: null
    }),
    getters: {

    },
    actions: {

    },
})