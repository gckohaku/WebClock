import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { getEditSettings, storeEditSettings } from "@/common/scripts/IndexedDBRelational";
import { ClockSettingData } from "@/common/scripts/ClockSettingData";

export const settingsStore = defineStore("settingsStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const settings: Ref<ClockSettingData> = ref(new ClockSettingData());

	async function getSettings(key: string): Promise<void> {
		await getEditSettings(key).then((data) => { settings.value = data });
	}

	async function updateSettings(key: string, settings: ClockSettingData): Promise<void> {
		console.log("start store settings");
		await storeEditSettings(key, settings).catch((e) => {console.log(e)});
		console.log("finish store settings");
	}

	return { settings, getSettings, updateSettings };
});