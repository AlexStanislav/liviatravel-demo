import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router';
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';

const pinia = createPinia();
const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(pinia)
app.use(ToastService)
app.mount('#app')
