import './assets/main.css';
import './common/styles/customProperties.css';

import { createApp, type Ref, ref } from 'vue';
import { createPinia, defineStore } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia);

app.mount('#app');
