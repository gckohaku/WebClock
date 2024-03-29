<script setup lang="ts">
import { ref, type Ref, onMounted, onBeforeMount, onUpdated } from "vue";

import ParameterSettingSidebar from "@/components/ParameterSettingSidebar.vue";
import ClockDisplay from "@/components/ClockDisplay.vue";
import { SingleUnitParameters, type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { DotsOnCircleParameters } from "@/common/scripts/input_data_contents/DotsOnCircleParameters";
import { timeStore } from "@/stores/time";
import { clockParametersStore } from "@/stores/clockParameters";
import MenuBar from "@/components/MenuBar.vue";
import DataSelector from "@/components/DataSelector.vue";
import MessageBox from "@/components/MessageBox.vue";
import { popUpDataStore } from "@/stores/popUpData";
import { dataNamesStore } from "@/stores/dataNames";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";

let wrapperTopPos: number;
let wrapperHeight = ref(0);

const storeTime = timeStore();
const storeClockParams = clockParametersStore();
const storePopUp = popUpDataStore();
const storeDataNames = dataNamesStore();

const editDataName: Ref<string> = ref("");

const clockSize = 300;
const halfClockSize = clockSize / 2;

const partsList: typeof SingleUnitParameters[] = [DotsOnCircleParameters];
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

	setTimeout(() => {
		updateTime();
	}, 10);
}

const getKeyNames = async (): Promise<void> => {
	// const refDataNames = ref(storeDataNames.dataNames);
	// await keyNamesFromIdb(refDataNames).then(() => console.log(refDataNames.value[0]));
	// storeDataNames.dataNames = refDataNames.value;
	useIndexedDb.getKeysFromParameters().then(keys => { storeDataNames.dataNames = keys });
	console.log(storeDataNames.dataNames[0]);
}

const onTitleChange = async (e: Event): Promise<void> => {
	useIndexedDb.storeEditSettings(
		storeDataNames.currentDataId,
		<ClockSettingData>{
			dataName: (e.target as HTMLInputElement).value,
			canvasSize: { width: 600, height: 600, }
		});
}

onBeforeMount(async () => {
	updateTime();

	await useIndexedDb.indexedDbPreparation();
	await storeDataNames.updateDataNames();
	await storeClockParams.getBeforeReloadParameters();
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
	<DataSelector v-if="storePopUp.dataSelectorVisible" @select="(e) => storeClockParams.getParameters(e)" title="データを開く" description="" ok-text="開く" cancel-text="キャンセル"></DataSelector>
	<MessageBox v-if="storePopUp.messageBoxVisible" :title="(storePopUp.messageBoxStates.title !== '') ? storePopUp.messageBoxStates.title : undefined" :message="(storePopUp.messageBoxStates.message !== '') ? storePopUp.messageBoxStates.message : undefined" :button-type="(storePopUp.messageBoxStates.buttonType !== '') ? storePopUp.messageBoxStates.buttonType : undefined" @click-button="(e) => onClickYesNoOfDeleteData(e)" />
</template>

<style scoped lang="scss">
.editor-wrapper {
	height: 100dvh;

	.editor-container {
		// display: grid;
		// grid-template-columns: 1fr 300px;
		// container-type: size;
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
				// grid-auto-rows: 0rem;

				transition: all .3s var(--circleLikeAnimation);
				// animation: .3s var(--circleLikeAnimation);

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
</style>