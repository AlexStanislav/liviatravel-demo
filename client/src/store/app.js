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
        tours: [],
        url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
        rezervationVisible: false,
        rezervationOffer: null,
        rezervationTour: null,
        offerType: 'offer',
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
        tourRezervation: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            adults: 1,
            children: 0,
        },
        dbRezervations: [],
        dbTourRezervations: [],
        appReady: false

    }),
    actions: {
        toggleAppReady(value){
            this.appReady = value !== undefined ? value : !this.appReady
        },
        getOffers() {
            try {
                axios.get(`${this.url}/offers`).then(res => {
                    this.offers.push(...res.data.offers)
                    this.offers = [...new Set(this.offers)]
                }).then(() => {
                    axios.get(`${this.url}/api/tours`).then(res => {
                        console.log(res.data)
                        this.tours.push(...res.data)
                        this.tours = [...new Set(this.tours)]
                    })
                })
            } catch (error) {
                console.log(error)
            }
        },
        setSearchParams(params) {
            this.searchParams = params
        },
        loadOffers() {
            axios.get(`${this.url}/offers`).then(res => {
                this.offers = res.data.offers
            }).catch(err => {
                console.log(err)
            })
        },
        loadTours() {
            axios.get(`${this.url}/api/tours`).then(res => {
                this.tours = res.data
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
        setTour(tour) {
            this.rezervationTour = tour
        },
        setRezervationData(data) {
            this.rezervationData[data.key] = data.value
        },
        togglePreloader(value) {
            this.showLoader = value !== undefined ? value : !this.showLoader
            if(this.showLoader === true) {
                document.querySelector("body").style.overflow = "hidden";
            } else {
                document.querySelector("body").style.overflow = "initial";
            }
        },
        setOfferType(type) {
            this.offerType = type
        },
        // Set offers
        setOffers(offers) {
            this.offers = offers
        },
        setTours(tours) {
            this.tours = tours
        }
    }
})