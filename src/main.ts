import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Store, createStore } from 'vuex/types/index.js'
import './common/styles/customProperties.css'
import { DateTime } from './common/scripts/DateTime'

declare module '@vue/runtime-core' {
	// store の state
	interface State {
		time: DateTime;
	}

	interface ComponentCustomProperties {
		$store: Store<State>
	}
}

const app = createApp(App)

app.use(router)

app.mount('#app')
