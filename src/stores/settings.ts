import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { getDataNames, getEditSettings } from "@/common/scripts/IndexedDBRelational";

export const settingsStore = defineStore("settingsStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const settings: Ref<ClockSettingData> = ref(<ClockSettingData>{});

	function getSettings(key: string): void {
		getEditSettings(key).then((data) => { settings.value = data });
	}

	return { settings, getSettings };
});