import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { EditPageEvent } from "@/common/scripts/events/EditPageEvent";
import { timeStore } from "./time";
import { clockParametersStore } from "./clockParameters";
import { popUpDataStore } from "./popUpData";
import { dataNamesStore } from "./dataNames";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import { historiesStore } from "./histories";
import type { UriClockParameters } from "@/common/scripts/UriClockParameters";
import { stringCompression, stringDecompression } from "@/common/scripts/utilities/stringEncodings";

export const editMenuStore = defineStore("editMenuStore", () => {
	const storeTime = timeStore();
	const parameters = clockParametersStore();
	const popUpData = popUpDataStore();
	const dataNames = dataNamesStore();
	const histories = historiesStore();

	const noAction: EditPageEvent = new EditPageEvent();

	const data_newDataEvent: EditPageEvent = new EditPageEvent();
	data_newDataEvent.addAction(() => {
		const dataId: string = storeTime.time.toString();
		parameters.initParameters();

		dataNames.currentDataId = dataId;
		parameters.changeDataTitle(dataId);
		useIndexedDb.storeParameters(dataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		useIndexedDb.storeEditDataId(dataId);

		dataNames.updateDataNames();
	});

	const data_openDataEvent: EditPageEvent = new EditPageEvent();
	data_openDataEvent.addAction(() => {
		popUpData.setDataSelectorVisible(true);
	});

	const data_deleteDataEvent: EditPageEvent = new EditPageEvent();
	data_deleteDataEvent.addAction(() => {
		popUpData.messageBoxStates = {title: "データ削除の確認", message: "本当に現在編集中のデータを削除しますか？", buttonType: "YesNo"}
		popUpData.messageBoxVisible = true;
	});

	const data_copyDisplayLink: EditPageEvent = new EditPageEvent();
	data_copyDisplayLink.addAction(async () => {
		const linkRoot = (import.meta.env.NODE_ENV === "production") ? "https://gckohaku.github.io/WebClock" : "http://127.0.0.1:5173/WebClock";

		const paramsList = parameters.currentParameterList;
		const uriParams: UriClockParameters[] = [];

		for (const unit of paramsList) {
			const data: UriClockParameters = {heading: unit.heading, parameters: []}
			for (const param of unit.parameters) {
				data.parameters.push(param.reactiveValue);
			}
			uriParams.push(data);
		}

		const jsonParams = JSON.stringify(uriParams);

		const compressionData: string = await stringCompression(jsonParams);

		navigator.clipboard.writeText(compressionData);
		console.log(compressionData);
	});

	const edit_undoEvent: EditPageEvent = new EditPageEvent();
	edit_undoEvent.addAction(() => {
		histories.undo();
	});

	const edit_redoEvent: EditPageEvent = new EditPageEvent();
	edit_redoEvent.addAction(() => {
		histories.redo();
	});

	const test_openData: EditPageEvent = new EditPageEvent();
	test_openData.addAction(() => {
		popUpData.inputTextModalVisible = true;
		popUpData.inputTextModalStates = {title: "", message: "パラメータ文字列を入力"};
		popUpData.inputTextModalEvent.addAction(async (inputData: string) => {
			const paramsData = await stringDecompression(inputData);
			navigator.clipboard.writeText(paramsData);
		});
	});

	const contents: Ref<string[][]> = ref([
		["データ", "新規作成", "開く", "現在のデータを削除", "!separator!", "表示リンクを取得"],
		["編集", "元に戻す", "やり直し"],
		["test", "open data"],
	]);

	const actions = ref([
		[data_newDataEvent, data_openDataEvent, data_deleteDataEvent, noAction, data_copyDisplayLink],
		[edit_undoEvent, edit_redoEvent],
		[test_openData],
	]);

	return { contents, actions };
});