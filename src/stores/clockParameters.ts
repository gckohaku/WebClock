import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { beforeEditDataIdStore, beforeReloadParametersFromIdb } from "@/common/scripts/storeParametersToIdb";
import { get } from "idb-keyval";

export const clockParametersStore = defineStore("clockParametersStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const dataTitle: Ref<string> = ref("");
	const currentParameterList: Ref<ClockPartsParameters> = ref([]);

	function initParameters(): void {
		currentParameterList.value.splice(0);
	}

	async function getBeforeReloadParameters(): Promise<void> {
		await beforeReloadParametersFromIdb(dataTitle, currentParameterList);
	}

	function changeDataTitle(title: string) {
		dataTitle.value = title;
	}

	return {dataTitle, currentParameterList, initParameters, getBeforeReloadParameters, changeDataTitle};
});