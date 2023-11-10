import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            name: 'Oferte',
            component: () => import('../views/OffersView.vue')
        },
        {
            path: '/rezervations',
            name: 'Rezervari',
            component: () => import('../views/RezervationsView.vue')
        },
        {
            path: '/tours',
            name: 'Circuite',
            component: () => import('../views/ToursView.vue')
        },
        {
            path: '/tours_rezervations',
            name: 'Circuite Rezervate',
            component: () => import('../views/TourRezervationsView.vue')
        },
        {
            path: '/custom_offers',
            name: 'Solicitari Oferte',
            component: () => import('../views/CustomOffersView.vue')
        }
    ]
})

export default router