import { type Ref, ref, toRef } from "vue";
import { defineStore } from "pinia";
import { type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { dataNamesStore } from "./dataNames";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational"

export const clockParametersStore = defineStore("clockParametersStore", () => {
	const storeDataName = dataNamesStore();

	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	// const dataTitle: Ref<string> = ref("");
	const currentParameterList: Ref<ClockPartsParameters> = ref([]);

	function initParameters(): void {
		currentParameterList.value.splice(0);
	}

	async function getBeforeReloadParameters(): Promise<void> {
		// await beforeReloadParametersFromIdb(toRef(storeDataName, "currentDataName"), currentParameterList);
		await useIndexedDb.getBeforeEditDataId().then(id => { storeDataName.currentDataId = id; });
		await getParameters(storeDataName.currentDataId);
	}

	async function getParameters(id: string): Promise<void> {
		initParameters();
		storeDataName.currentDataId = id;
		// await parametersFromIdb(id, currentParameterList);
		await useIndexedDb.getClockParameters(id).then(data => { currentParameterList.value = data });
		// storeEditDataId(id);
		await useIndexedDb.storeEditDataId(id);
		await useIndexedDb.getEditSettings(storeDataName.currentDataId)
			.then(name => {
				if (name) {
					storeDataName.currentDataName = name.dataName;
					return;
				}
				storeDataName.currentDataName = storeDataName.currentDataId;
			});
	}

	function changeDataTitle(title: string) {
		storeDataName.currentDataName = title;
	}

	return { currentParameterList, initParameters, getBeforeReloadParameters, getParameters, changeDataTitle };
});