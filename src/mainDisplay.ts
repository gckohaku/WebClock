import './assets/base.css';

import { createApp } from 'vue';
import { createHead } from '@unhead/vue';
import App from './index/App.vue';

const app = createApp(App);
const head = createHead();

app.use(head);

app.mount('#app');