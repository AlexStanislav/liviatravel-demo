import { createApp } from 'vue'
import App from './App.vue'
import Primevue from 'primevue/config';
import router from './router';
import { createPinia } from 'pinia';
import ConfirmationService from 'primevue/confirmationservice';
import './assets/css/style.css'
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeicons/primeicons.css';
const pinia = createPinia();
const app = createApp(App)
app.use(Primevue)
app.use(ConfirmationService)
app.use(router)
app.use(pinia)
app.mount('#app')
