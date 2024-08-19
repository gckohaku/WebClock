import '@/assets/main.css';
import '@/common/styles/customProperties.css';

import { createApp } from 'vue';
import { createHead } from '@unhead/vue';
import App from './DisplayApp.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(head).use(pinia);

app.mount('#app');
