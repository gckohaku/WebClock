import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import { MenuClickEvent } from "@/common/scripts/events/MenuClickEvent";
import { timeStore } from "./time";
import { clockParametersStore } from "./clockParameters";
import { popUpDataStore } from "./popUpData";
import { dataNamesStore } from "./dataNames";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import { historiesStore } from "./histories";
import type { UriClockParameters } from "@/common/scripts/UriClockParameters";

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

	const data_copyDisplayLink: MenuClickEvent = new MenuClickEvent();
	data_copyDisplayLink.addAction(() => {
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
		const testData = jsonParams;

		const blobParams = new Blob([testData]);
		const stream: ReadableStream<Uint8Array> = blobParams.stream();
		const compressed = stream.pipeThrough(new CompressionStream("deflate-raw"));

		const resultParams = new Response(compressed);

		// resultParams.url.then((res) => {
		// 	// const encodedParams = encodeURIComponent(res);
		// 	navigator.clipboard.writeText();
		// });

		console.log(resultParams);
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
		["データ", "新規作成", "開く", "現在のデータを削除", "!separator!", "表示リンクを取得"],
		["編集", "元に戻す", "やり直し"],
	]);

	const actions = ref([
		[data_newDataEvent, data_openDataEvent, data_deleteDataEvent, noAction, data_copyDisplayLink],
		[edit_undoEvent, edit_redoEvent],
	]);

	return { contents, actions };
});