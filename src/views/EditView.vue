<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
import { createStore, get, keys, set } from "idb-keyval";

import ParameterSettingSidebar from "@/components/ParameterSettingSidebar.vue";
import ClockDisplay from "@/components/ClockDisplay.vue";
import { SingleUnitParameters, type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { DotsOnCircleParameters } from "@/common/scripts/input_data_contents/DotsOnCircleParameters";
import { timeStore } from "@/stores/time";
import { clockParametersStore } from "@/stores/clockParameters";
import MenuBar from "@/components/MenuBar.vue";
import { keyNamesFromIdb } from "@/common/scripts/storeParametersToIdb";

let wrapperTopPos: number;
let wrapperHeight = ref(0);

const storeTime = timeStore();
const storeClockParams = clockParametersStore();

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

const retainParameters = (): void => {

}

onMounted(async () => {
	updateTime();

	const dataNames: Ref<string[]> = ref([]);
	await keyNamesFromIdb(dataNames).then(() => console.log(dataNames.value));
	console.log(dataNames.value);
});

// 以下、一時的に使用する変数
const isMenuOpen: Ref<boolean> = ref(false);


</script>

<template>
	<!-- <p>a</p> -->
	<div class="editor-wrapper" :style="{/* height: wrapperHeight + 'px' */ }">
		<div class="editor-container">
			<div class="menu-container">
				<!-- <div class="menu-header" @click="isMenuOpen = true">メニュー</div>
				<div class="menu-contents-container" :class="isMenuOpen ? 'menu-open' : ''" @mouseleave="isMenuOpen = false">
					<div @click="editDataName = storeTime.time.toString()">新規作成</div>
					<div>menu2</div>
					<div>menu3</div>
					<div>menu4</div>
					<div>menu5</div>
					<div>menu6</div>
				</div> -->
				<MenuBar :headings="[]" :contents="[]" />
			</div>

			<div class="edit-preview">
				<ClockDisplay :parameters="storeClockParams.currentParameterList" :clock-size="clockSize"></ClockDisplay>
			</div>
			<div class="customize-container">

				<input type="text" name="" :value="storeClockParams.dataTitle" />
				<div class="edit-customize">
					<ParameterSettingSidebar slider-length="100px"></ParameterSettingSidebar>
				</div>
			</div>

		</div>
	</div>
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

			.edit-customize {
				box-sizing: border-box;
				overflow-y: hidden;

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