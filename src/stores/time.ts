import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { DateTime } from "@/common/scripts/DateTime";

export const timeStore = defineStore("timeStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const time: Ref<DateTime> = ref(new DateTime()) as Ref<DateTime>;
	function update(): void {
		time.value.update();
	}

	return {time, update};
});