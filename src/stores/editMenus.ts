import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { DateTime } from "@/common/scripts/DateTime";

export const editMenuStore = defineStore("editMenuStore", () => {
	const contents: Ref<string[][]> = ref([
		["編集データ", "新規作成"],
		["編集", "元に戻す", "やり直し"],
	]);

	function Events() {

	}

	return {contents};
});