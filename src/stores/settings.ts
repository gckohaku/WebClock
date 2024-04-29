import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { getDataNames, getEditSettings } from "@/common/scripts/IndexedDBRelational";

export const settingsStore = defineStore("settingsStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const settings: Ref<ClockSettingData[]> = ref([]);

	function getSettings(key: string): void {
		getDataNames().then(res => {
			for (const key of res) {
				getEditSettings(key).then((data) => { settings.value.push(data) });
			}
		})
		// getEditSettings(key).then((data) => { settings.value = data });
	}

	return { settings, getEditSettings };
});