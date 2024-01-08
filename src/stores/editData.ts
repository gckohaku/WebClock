import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

export const editDataStore = defineStore("editDataStore", () => {
	const dataTitle: Ref<string> = ref("");

	function changeDataTitle(title: string) {
		dataTitle.value = title;
	}

	return { dataTitle, changeDataTitle };
});