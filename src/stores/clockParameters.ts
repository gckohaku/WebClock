import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";

export const clockParametersStore = defineStore("clockParametersStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const currentParameterList: Ref<ClockPartsParameters> = ref([]);

	function initParameters(): void {
		currentParameterList.value.splice(0);
	}

	return {currentParameterList, initParameters};
});