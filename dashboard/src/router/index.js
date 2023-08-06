import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Oferte',
            component: () => import('../views/OffersView.vue')
        },
        {
            path: '/rezervations',
            name: 'Rezervations',
            component: () => import('../views/RezervationsView.vue')
        }
    ]
})

export default router