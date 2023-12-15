import './assets/main.css';
import './common/styles/customProperties.css';

import { createApp, type Ref, ref } from 'vue';
import { createPinia, defineStore } from 'pinia';
import App from './App.vue';
import router from './router';
import { DateTime } from './common/scripts/DateTime';

const app = createApp(App);
const pinia = createPinia();

export const timeStore = defineStore("timeStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const time: Ref<DateTime> = ref(new DateTime()) as Ref<DateTime>;
	function update(): void {
		time.value.update();
	}

	return {time, update};
});

app.use(router).use(pinia);

app.mount('#app');
