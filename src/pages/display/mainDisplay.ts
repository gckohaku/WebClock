import '@/assets/base.css';
import '@/common/styles/customProperties.css';

import { createApp } from 'vue';
import { createHead } from '@unhead/vue';
import App from './DisplayApp.vue';

const app = createApp(App);
const head = createHead();

app.use(head);

app.mount('#app');
