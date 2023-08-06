import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import Primevue from 'primevue/config';
import router from './router';

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeicons/primeicons.css';
const app = createApp(App)
app.use(Primevue)
app.use(router)
app.mount('#app')
