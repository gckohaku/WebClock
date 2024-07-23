import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { MenuClickEvent } from "@/common/scripts/events/MenuClickEvent";
import { timeStore } from "./time";
import { clockParametersStore } from "./clockParameters";
import { popUpDataStore } from "./popUpData";
import { dataNamesStore } from "./dataNames";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import { historiesStore } from "./histories";
import { isConstructorDeclaration } from "typescript";

export const editMenuStore = defineStore("editMenuStore", () => {
	const storeTime = timeStore();
	const parameters = clockParametersStore();
	const popUpData = popUpDataStore();
	const dataNames = dataNamesStore();
	const histories = historiesStore();

	const noAction: MenuClickEvent = new MenuClickEvent();

	const data_newDataEvent: MenuClickEvent = new MenuClickEvent();
	data_newDataEvent.addAction(() => {
		const dataId: string = storeTime.time.toString();
		parameters.initParameters();

		dataNames.currentDataId = dataId;
		parameters.changeDataTitle(dataId);
		useIndexedDb.storeParameters(dataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		useIndexedDb.storeEditDataId(dataId);

		dataNames.updateDataNames();
	});

	const data_openDataEvent: MenuClickEvent = new MenuClickEvent();
	data_openDataEvent.addAction(() => {
		popUpData.setDataSelectorVisible(true);
	});

	const data_deleteDataEvent: MenuClickEvent = new MenuClickEvent();
	data_deleteDataEvent.addAction(() => {
		popUpData.messageBoxStates = {title: "データ削除の確認", message: "本当に現在編集中のデータを削除しますか？", buttonType: "YesNo"}
		popUpData.messageBoxVisible = true;
	});

	const edit_undoEvent: MenuClickEvent = new MenuClickEvent();
	edit_undoEvent.addAction(() => {
		histories.undo();
	});

	const edit_redoEvent: MenuClickEvent = new MenuClickEvent();
	edit_redoEvent.addAction(() => {
		histories.redo();
	});

	const contents: Ref<string[][]> = ref([
		["データ", "新規作成", "開く", "現在のデータを削除"],
		["編集", "元に戻す", "やり直し"],
	]);

	const actions = ref([
		[data_newDataEvent, data_openDataEvent, data_deleteDataEvent],
		[edit_undoEvent, edit_redoEvent],
	]);

	return { contents, actions };
});