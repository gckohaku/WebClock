import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { MenuClickEvent } from "@/common/scripts/events/MenuClickEvent";
import { timeStore } from "./time";
import { clockParametersStore } from "./clockParameters";
import { beforeEditDataIdStore, deleteDataFromIdb, storeParametersToIdb } from "@/common/scripts/storeParametersToIdb";
import { set } from "idb-keyval";
import { popUpDataStore } from "./popUpData";
import { dataNamesStore } from "./dataNames";

export const editMenuStore = defineStore("editMenuStore", () => {
	const storeTime = timeStore();
	const parameters = clockParametersStore();
	const popUpData = popUpDataStore();
	const dataNames = dataNamesStore();

	const contents: Ref<string[][]> = ref([
		["データ", "新規作成", "開く", "現在のデータを削除"],
		["編集", "元に戻す (未実装)", "やり直し (未実装)"],
	]);

	const noAction: MenuClickEvent = new MenuClickEvent();

	const editNewDataEvent: MenuClickEvent = new MenuClickEvent();
	editNewDataEvent.addAction(() => {
		const dataId: string = storeTime.time.toString();
		parameters.initParameters();

		parameters.changeDataTitle(dataId);
		storeParametersToIdb(dataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		set("beforeEditDataId", dataId, beforeEditDataIdStore);

		dataNames.updateDataNames();
	});

	const editOpenDataEvent: MenuClickEvent = new MenuClickEvent();
	editOpenDataEvent.addAction(() => {
		popUpData.setDataSelectorVisible(true);
	});

	const editDeleteDataEvent: MenuClickEvent = new MenuClickEvent();
	editDeleteDataEvent.addAction(async () => {
		popUpData.messageBoxStates = {title: "データ削除の確認", message: "本当に現在編集中のデータを削除しますか？", buttonType: "YesNo"}
		popUpData.messageBoxVisible = true;
	});

	const actions = ref([
		[editNewDataEvent, editOpenDataEvent, editDeleteDataEvent],
		[noAction, noAction]
	]);

	return { contents, actions };
});