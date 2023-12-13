import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Store, createStore } from 'vuex/types/index.js'
import './common/styles/customProperties.css'
import { DateTime } from './common/scripts/DateTime'

const app = createApp(App)

app.use(router)

app.mount('#app')
