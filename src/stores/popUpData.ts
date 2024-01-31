import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

export const popUpDataStore = defineStore("popUpDataStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const dataSelectorVisible: Ref<boolean> = ref(false);
	const messageBoxVisible: Ref<boolean> = ref(false);
	const messageBoxStates: Ref<{title?: string, message?: string, buttonType?: "Ok" | "YesNo" | ''}> = ref({title: "", message: "", buttonType: ""});

	function setDataSelectorVisible(visible: boolean): void {
		dataSelectorVisible.value = visible;
	}

	function resetMessageBoxStates(): void {
		messageBoxStates.value = {title: undefined, message: undefined, buttonType: undefined}
	}

	return {dataSelectorVisible, messageBoxVisible, messageBoxStates, setDataSelectorVisible, resetMessageBoxStates};
});