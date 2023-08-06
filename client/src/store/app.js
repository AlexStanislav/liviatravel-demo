import { defineStore } from 'pinia'
import axios from "axios";

export const useAppStore = defineStore('app', {
    state: () => ({
        showLoader: true,
        searchParams: {
            location: '',
            date: '',
            rooms: '',
            adults: '',
            children: '',
        },
        offers: [],
        url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
        rezervationVisible: false,
        rezervationOffer: null,
        rezervationData: {
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            adults: 1,
            rooms: 1,
            children: 0,
            date: "",
        },
        dbRezervations: [],

    }),
    actions: {
        setSearchParams(params) {
            this.searchParams = params
        },
        loadOffers() {
            axios.get(`${this.url}/offers`).then(res => {
                this.offers = res.data.offers
                this.dbRezervations = res.data.rezervations
            }).catch(err => {
                console.log(err)
            })
        },
        setRezervationVisible(visible) {
            this.rezervationVisible = visible
        },
        setOffer(offer) {
            this.rezervationOffer = offer
        },
        setRezervationData(data) {
            this.rezervationData[data.key] = data.value
        },
        togglePreloader() {
            this.showLoader = !this.showLoader
            if(this.showLoader === true) {
                document.querySelector("body").style.overflow = "hidden";
            } else {
                document.querySelector("body").style.overflow = "initial";
            }
        }
    }
})