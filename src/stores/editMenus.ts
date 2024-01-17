import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { MenuClickEvent } from "@/common/scripts/events/MenuClickEvent";
import { timeStore } from "./time";
import { clockParametersStore } from "./clockParameters";
import { beforeEditDataIdStore, storeParametersToIdb } from "@/common/scripts/storeParametersToIdb";
import { set } from "idb-keyval";
import DataSelector from "@/components/DataSelector.vue";
import { popUpDataStore } from "./popUpData";

export const editMenuStore = defineStore("editMenuStore", () => {
	const storeTime = timeStore();
	const parameters = clockParametersStore();
	const popUpData = popUpDataStore();

	const contents: Ref<string[][]> = ref([
		["データ", "新規作成", "開く"],
		["編集", "元に戻す", "やり直し"],
	]);

	const noAction: MenuClickEvent = new MenuClickEvent();

	const editNewDataEvent: MenuClickEvent = new MenuClickEvent();
	editNewDataEvent.addAction(() => {
		const dataId: string = storeTime.time.toString();
		parameters.initParameters();

		parameters.changeDataTitle(dataId);
		storeParametersToIdb(dataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		set("beforeEditDataId", dataId, beforeEditDataIdStore);
	});

	const editOpenDataEvent: MenuClickEvent = new MenuClickEvent();
	editOpenDataEvent.addAction(async () => {
		popUpData.setDataSelectorVisible(true);
		// 以降の処理は DataSelector 側で行う
	});

	const actions = ref([
		[editNewDataEvent, editOpenDataEvent],
		[noAction, noAction]
	]);

	function fireAction(outerIndex: number, innerIndex: number) {
		actions.value[outerIndex][innerIndex].fire();
	}

	return { contents, actions };
});