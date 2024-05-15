import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { getDataNames, getEditSettings, storeEditSettings } from "@/common/scripts/IndexedDBRelational";

export const settingsStore = defineStore("settingsStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const settings: Ref<ClockSettingData> = ref(<ClockSettingData>{});

	async function getSettings(key: string): Promise<void> {
		await getEditSettings(key).then((data) => { settings.value = data });
	}

	async function updateSettings(key: string, settings: ClockSettingData): Promise<void> {
		await storeEditSettings(key, settings);
	}

	return { settings, getSettings, updateSettings };
});