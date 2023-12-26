import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { DateTime } from "@/common/scripts/DateTime";

export const editMenuStore = defineStore("editMenuStore", () => {
	const contents: Ref<string[][]> = ref([
		["編集", "undo", "redo"],
		["データ", "new data", "delete data"],
		["メニュー区分", "content1", "content2", "コンテント3", "test content 肆"]
	]);

	function reactions() {

	}

	return {contents};
});