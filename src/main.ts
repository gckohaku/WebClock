import './assets/main.css';
import './common/styles/customProperties.css';

import { createApp, type Ref, ref } from 'vue';
import { createPinia, defineStore } from 'pinia';
import { createHead } from '@unhead/vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(router).use(pinia).use(head);

app.mount('#app');
