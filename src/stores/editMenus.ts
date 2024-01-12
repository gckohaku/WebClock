import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { MenuClickEvent } from "@/common/scripts/events/MenuClickEvent";
import { editDataStore } from "./editData";
import { timeStore } from "./time";
import { clockParametersStore } from "./clockParameters";
import { beforeEditDataIdStore, storeParametersToIdb } from "@/common/scripts/storeParametersToIdb";
import { set } from "idb-keyval";

export const editMenuStore = defineStore("editMenuStore", () => {
	const storeEditData = editDataStore();
	const storeTime = timeStore();
	const parameters = clockParametersStore();

	const contents: Ref<string[][]> = ref([
		["データ", "新規作成"],
		["編集", "元に戻す", "やり直し"],
	]);

	const noAction: MenuClickEvent = new MenuClickEvent();

	const editNewDataEvent: MenuClickEvent = new MenuClickEvent();
	editNewDataEvent.addAction(() => {
		const dataId: string = storeTime.time.toString();
		parameters.initParameters();

		storeEditData.changeDataTitle(dataId);
		storeParametersToIdb(dataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		set("beforeEditDataId", dataId, beforeEditDataIdStore);
	});

	const actions = ref([
		[editNewDataEvent],
		[noAction, noAction]
	]);

	function fireAction(outerIndex: number, innerIndex: number) {
		actions.value[outerIndex][innerIndex].fire();
	}

	return { contents, actions };
});