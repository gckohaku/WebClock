import '@/assets/main.css';
import '@/common/styles/customProperties.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';
import App from "./EditApp.vue";

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia).use(head);

app.mount('#app');
