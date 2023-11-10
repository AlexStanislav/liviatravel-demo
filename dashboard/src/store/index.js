import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLoggedIn: false,
        url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
    }),
    actions: {
        toggleLogin(value) {
            this.isLoggedIn = value
        }
    }
})
