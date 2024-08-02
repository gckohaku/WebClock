import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { EditPageEvent } from "@/common/scripts/events/EditPageEvent";

export const popUpDataStore = defineStore("popUpDataStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const dataSelectorVisible: Ref<boolean> = ref(false);
	const messageBoxVisible: Ref<boolean> = ref(false);
	const messageBoxStates: Ref<{title?: string, message?: string, buttonType?: "Ok" | "YesNo" | ''}> = ref({title: "", message: "", buttonType: ""});
	const inputTextModalVisible: Ref<boolean> = ref(false);
	const inputTextModalStates: Ref<{title?: string, message?: string}> = ref({title: "", message: ""});
	const inputTextModalEvent: Ref<EditPageEvent> = ref(new EditPageEvent()) as Ref<EditPageEvent>;

	function setDataSelectorVisible(visible: boolean): void {
		dataSelectorVisible.value = visible;
	}

	function resetMessageBoxStates(): void {
		messageBoxStates.value = {title: "", message: "", buttonType: ""}
	}

	function resetInputTextModalStates(): void {
		inputTextModalStates.value = {title: "", message: ""};
	}

	function resetInputTextModalEvent(): void {
		inputTextModalEvent.value = new EditPageEvent();
	}

	return {dataSelectorVisible, messageBoxVisible, messageBoxStates, inputTextModalVisible, inputTextModalStates, inputTextModalEvent, setDataSelectorVisible, resetMessageBoxStates, resetInputTextModalStates, resetInputTextModalEvent};
});