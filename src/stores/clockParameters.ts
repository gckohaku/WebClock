import { type Ref, ref, toRef } from "vue";
import { defineStore } from "pinia";

import { type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { beforeEditDataIdStore, beforeReloadParametersFromIdb, parametersFromIdb, storeEditDataId } from "@/common/scripts/storeParametersToIdb";
import { get } from "idb-keyval";
import { dataNamesStore } from "./dataNames";

export const clockParametersStore = defineStore("clockParametersStore", () => {
	const storeDataName = dataNamesStore();

	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	// const dataTitle: Ref<string> = ref("");
	const currentParameterList: Ref<ClockPartsParameters> = ref([]);

	function initParameters(): void {
		currentParameterList.value.splice(0);
	}

	async function getBeforeReloadParameters(): Promise<void> {
		await beforeReloadParametersFromIdb(toRef(storeDataName, "currentDataName"), currentParameterList);
	}

	async function getParameters(id: string): Promise<void> {
		initParameters();
		storeDataName.currentDataName = id;
		await parametersFromIdb(id, currentParameterList);
		storeEditDataId(id);
	}

	function changeDataTitle(title: string) {
		storeDataName.currentDataName = title;
	}

	return {currentParameterList, initParameters, getBeforeReloadParameters, getParameters, changeDataTitle};
});