import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useAppStore } from '../store/app'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/oferte',
            name: 'offers',
            component: () => import('../views/OffersView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactView.vue')
        },
        {
            path: '/solicitare',
            name: 'request',
            component: () => import('../views/RequestView.vue')
        }
    ]
})


router.beforeEach((to, from, next) => {
    const appStore = useAppStore()
    appStore.togglePreloader();
    next()
    setTimeout(() => {
        appStore.togglePreloader();
    }, 1000)
})

export default router