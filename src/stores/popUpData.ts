import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

export const popUpDataStore = defineStore("popUpDataStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const dataSelectorVisible: Ref<boolean> = ref(false);

	function setDataSelectorVisible(visible: boolean): void {
		dataSelectorVisible.value = visible;
	}

	return {dataSelectorVisible, setDataSelectorVisible};
});