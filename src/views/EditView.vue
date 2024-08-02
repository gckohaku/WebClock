<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";

import { SingleUnitParameters, type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { ClockSettingData } from "@/common/scripts/ClockSettingData";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import ClockDisplay from "@/components/ClockDisplay.vue";
import DataSelector from "@/components/DataSelector.vue";
import MenuBar from "@/components/MenuBar.vue";
import MessageBox from "@/components/MessageBox.vue";
import ParameterSettingSidebar from "@/components/ParameterSettingSidebar.vue";
import { clockParametersStore } from "@/stores/clockParameters";
import { dataNamesStore } from "@/stores/dataNames";
import { historiesStore } from "@/stores/histories";
import { layersStore } from "@/stores/layers";
import { partsListsStore } from "@/stores/partsLists";
import { popUpDataStore } from "@/stores/popUpData";
import { settingsStore } from "@/stores/settings";
import { timeStore } from "@/stores/time";
import { onKeyUp, useKeyModifier } from "@vueuse/core";
import { debugOptions } from "@/common/scripts/debugs/debugOptions";
import InputTextModal from "@/components/InputTextModal.vue";

let wrapperTopPos: number;
let wrapperHeight = ref(0);

const storeTime = timeStore();
const storeClockParams = clockParametersStore();
const storePopUp = popUpDataStore();
const storeDataNames = dataNamesStore();
const storePartsLists = partsListsStore();
const storeLayers = layersStore();
const storeSettings = settingsStore();
const storeHistories = historiesStore();

const editDataName: Ref<string> = ref("");

const clockSize = 300;
const halfClockSize = clockSize / 2;

const partsList: typeof SingleUnitParameters[] = storePartsLists.partsList;
const currentParameterList: Ref<ClockPartsParameters> = ref([]);
const currentDetailsOpenList: Ref<boolean[]> = ref([])
const currentSelect: Ref<string> = ref("");

const fixingAnimationTime: number = 0.3;
let animationDurationTime: Ref<number> = ref(fixingAnimationTime);

const addList = (data: string): void => {
	currentParameterList.value.push(Object.assign({}, new (partsList.find((el) => el.staticHeading === data) ?? SingleUnitParameters)()));
	currentDetailsOpenList.value.push(false);
}

const removeList = (index: number): void => {
	currentParameterList.value.splice(index, 1);
	currentDetailsOpenList.value.splice(index, 1);
}

const updateTime = (): void => {
	storeTime.update();
}

const getKeyNames = async (): Promise<void> => {
	useIndexedDb.getKeysFromParameters().then(keys => { storeDataNames.dataNames = keys });
	console.log(storeDataNames.dataNames[0]);
}

const onTitleChange = async (e: Event): Promise<void> => {
	const settings = storeSettings.settings;
	settings.dataName = (e.target as HTMLInputElement).value;


	await storeSettings.updateSettings(storeDataNames.currentDataId, settings);
}

onBeforeMount(async () => {
	setInterval(() => updateTime(), 16);

	await useIndexedDb.indexedDbPreparation();
	await storeDataNames.updateDataNames();
	await storeClockParams.getBeforeReloadParameters(partsList);
	await storeSettings.getSettings(storeDataNames.currentDataId);

	if (storeSettings.settings && storeSettings.settings.dataName) {
		storeLayers.currentSelect = storeSettings.settings.selectedLayer!;
	}
	else {
		storeSettings.updateSettings(storeDataNames.currentDataId, new ClockSettingData({ dataName: storeDataNames.currentDataId }));
	}
});

const onClickYesNoOfDeleteData = (e: string): void => {
	if (e === "Yes") {
		const currentDataId: string = storeDataNames.currentDataId;
		storeClockParams.changeDataTitle("");
		storeClockParams.initParameters();
		// deleteDataFromIdb(currentDataName);
		useIndexedDb.deleteParametersData(currentDataId);
		useIndexedDb.deleteEditSettings(currentDataId);
		useIndexedDb.storeEditDataId("");
		storeDataNames.updateDataNames();
	}

	storePopUp.messageBoxVisible = false;
	storePopUp.resetMessageBoxStates();
}

const onOpenData = async (id: string) => {
	await storeClockParams.getParameters(id, partsList);
	await storeSettings.getSettings(id);
	storeHistories.removeHistories();

	if (storeSettings.settings && storeSettings.settings.dataName) {
		storeLayers.currentSelect = storeSettings.settings.selectedLayer!;
	}
	else {
		storeSettings.updateSettings(id, new ClockSettingData({ dataName: storeDataNames.currentDataId }));
	}
}

// vueuse

const control = useKeyModifier("Control");
const shift = useKeyModifier("Shift");

onKeyUp("z", () => {
	if (!shift.value && control.value) {
		storeHistories.undo();
	}
});

onKeyUp("y", () => {
	if (!shift.value && control.value) {
		storeHistories.redo();
	}
});
</script>

<template>
	<div class="editor-wrapper" :style="{/* height: wrapperHeight + 'px' */ }">
		<div class="editor-container">
			<div class="menu-container">
				<MenuBar :headings="[]" :contents="[]" />
			</div>

			<div class="edit-preview">
				<ClockDisplay :parameters="storeClockParams.currentParameterList" :clock-size="clockSize"></ClockDisplay>
			</div>

			<div class="customize-container">

				<input type="text" name="" :value="storeDataNames.currentDataName" @input="(e) => onTitleChange(e)" />
				<div class="edit-customize">
					<ParameterSettingSidebar slider-length="150px"></ParameterSettingSidebar>
				</div>
			</div>
		</div>
	</div>

	<!-- 以下、特定の時にのみ表示される要素 -->
	<DataSelector v-if="storePopUp.dataSelectorVisible" @select="(e) => onOpenData(e)" title="データを開く" description="" ok-text="開く" cancel-text="キャンセル"></DataSelector>
	<MessageBox v-if="storePopUp.messageBoxVisible" :title="(storePopUp.messageBoxStates.title !== '') ? storePopUp.messageBoxStates.title : undefined" :message="(storePopUp.messageBoxStates.message !== '') ? storePopUp.messageBoxStates.message : undefined" :button-type="(storePopUp.messageBoxStates.buttonType !== '') ? storePopUp.messageBoxStates.buttonType : undefined" @click-button="(e) => onClickYesNoOfDeleteData(e)" />
	<InputTextModal v-if="storePopUp.inputTextModalVisible"></InputTextModal>

	<!-- histories -->
	<div class="debug-histories" v-if="debugOptions.viewHistories">
		<p>histories:</p>
		<p v-for="history in storeHistories.operationHistory.slice(-20)">{{ history }}</p>
	</div>
	<div class="debug-redo-stack" v-if="debugOptions.viewHistories">
		<p>stacks:</p>
		<p v-for="history in storeHistories.redoStack.slice(-20)">{{ history }}</p>
	</div>
</template>

<style scoped lang="scss">
.editor-wrapper {
	height: 100dvh;

	.editor-container {
		display: grid;
		grid-template-areas:
			"menu 		menu"
			"preview	setting";
		grid-template-columns: 1fr 300px;
		grid-template-rows: 20px calc(100% - 20px);
		width: 100%;
		height: 100%;

		.menu-container {
			grid-area: menu;
			position: relative;

			.menu-contents-container {
				display: grid;
				position: absolute;
				top: 100%;

				transition: all .3s var(--circleLikeAnimation);

				>div {
					overflow-y: hidden;
					height: 0;
					transition: all .3s var(--circleLikeAnimation);
				}

				&.menu-open.menu-contents-container>div {
					height: 1rem;
				}
			}
		}

		.edit-preview {
			grid-area: preview;
			background-color: #ffe0ff;
			flex-shrink: 1;
			flex-grow: 100;
			// qcb 単位を使うとエラーが出るので、css の style scoped の方に書いている (早くコンテナクエリ関連に対応しろ)
		}

		.customize-container {
			grid-area: setting;
			box-sizing: border-box;
			padding: 1px;
			width: 300px;
			height: 100%;
			flex-shrink: 1;
			flex-grow: 1;
			background-color: whitesmoke;
			overflow-y: clip;
			// 開発中は上のパラメータを上書きしておく
			overflow-y: auto;

			.edit-customize {
				box-sizing: border-box;

				&::-webkit-scrollbar {
					width: 4px;
				}

				&::-webkit-scrollbar-thumb {
					background-color: #c0c0c0;
					border-radius: 3px;
				}

				&::-webkit-scrollbar-track {
					background-color: transparent;
				}
			}
		}
	}
}

.debug-histories,
.debug-redo-stack {
	box-sizing: border-box;
	position: absolute;
	background-color: black;

	padding: 1rem;
	width: 50%;
	opacity: 0.5;
	bottom: 0;

	pointer-events: none;

	p {
		font-size: 12px;
		color: white;
	}
}

.debug-histories {
	left: 0;
}

.debug-redo-stack {
	right: 0;
}
</style>