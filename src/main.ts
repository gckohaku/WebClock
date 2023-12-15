import './assets/main.css'
import './common/styles/customProperties.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DateTime } from './common/scripts/DateTime'

const app = createApp(App)

app.use(router)

app.mount('#app')
