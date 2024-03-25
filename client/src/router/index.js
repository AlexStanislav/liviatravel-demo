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
        },
        {
            path: '/oferta',
            name: 'offer',
            component: () => import('../views/OfferView.vue')
        }
    ]
})


router.beforeEach((to, from, next) => {
    const appStore = useAppStore();
    if (to.path === "/oferte" || to.path === "/contact" || to.path === "/solicitare") {
        appStore.togglePreloader(true);
        setTimeout(() => {
            appStore.togglePreloader(false);
        }, 1000);
        next()
    } else {
        if (to.hash === "") {
            appStore.togglePreloader(true);
            window.scrollTo({ top: 0 })
            next()
        } else {
            next()
        }
    }
})

export default router