<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";

import { createStore, get, keys, set } from "idb-keyval";

import ParameterSettingSidebar from "@/components/ParameterSettingSidebar.vue";
import ClockDisplay from "@/components/ClockDisplay.vue";
import { SingleUnitParameters, type ClockPartsParameters } from "@/common/scripts/ClockPartsParameters";
import { DotsOnCircleParameters } from "@/common/scripts/input_data_contents/DotsOnCircleParameters";
import { timeStore } from "@/stores/time";
import { clockParametersStore } from "@/stores/clockParameters";

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
	currentParameterList.value.push(Object.assign({}, new (partsList.find((el) => el.heading === data) ?? SingleUnitParameters)()));
	currentDetailsOpenList.value.push(false);
}

const removeList = (index: number): void => {
	animationDurationTime.value = 0;
	currentParameterList.value.splice(index, 1);
	currentDetailsOpenList.value.splice(index, 1);

	setTimeout(() => {
		animationDurationTime.value = fixingAnimationTime;
	}, 40
	/* ↑ このミリ秒よりも短い間隔で削除ボタンを押されたらアニメーションがおかしくなるけど
		秒間 16 連打よりもう少し早い速度で連打しても大丈夫な時間に設定すればよい */);
}

// リアクティブな値は EditView で保持し、それを ParameterSettingSidebar に渡す
// 複数コンポーネントで使用するものは stores で定義するかを考える

const updateTime = (): void => {
	storeTime.update();

	setTimeout(() => {
		updateTime();
	}, 10);
}

const retainParameters = (): void => {

}

onMounted(() => {
	updateTime();
});
</script>

<template>
	<!-- <p>a</p> -->
	<div class="editor-wrapper" :style="{/* height: wrapperHeight + 'px' */ }">
		<div class="editor-container">
			<div class="edit-menu-container">
				<div class="menu-header">メニュー</div>
				<div class="menu-contents-container">
					<div @click="editDataName = storeTime.time.toString()">新規作成</div>
					<div>menu2</div>
					<div>menu3</div>
					<div>menu4</div>
					<div>menu5</div>
					<div>menu6</div>
				</div>
			</div>

			<div class="edit-preview">
				<ClockDisplay :parameters="storeClockParams.currentParameterList" :clock-size="clockSize"></ClockDisplay>
			</div>
			<div class="customize-container">

				<input type="text" name="" :value="editDataName" />
				<div class="edit-customize">
					<ParameterSettingSidebar slider-length="100px"></ParameterSettingSidebar>
				</div>
			</div>

		</div>
	</div>
</template>

<style scoped lang="scss">
.editor-wrapper {
	height: 100%;

	.editor-container {
		// display: grid;
		// grid-template-columns: 1fr 300px;
		// container-type: size;
		display: flex;
		width: 100%;
		height: 100%;

		.edit-preview {
			background-color: #ffe0ff;
			flex-shrink: 1;
			flex-grow: 100;
			// qcb 単位を使うとエラーが出るので、css の style scoped の方に書いている (早くコンテナクエリ関連に対応しろ)
		}

		.customize-container {
			box-sizing: border-box;
			padding: 1px;
			width: 300px;
			height: 100%;
			flex-shrink: 1;
			flex-grow: 1;

			background-color: whitesmoke;

			.edit-customize {
				box-sizing: border-box;
				overflow-y: scroll;
				height: 100%;

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

<!-- <style scoped>
.edit-preview {
	height: 100cqb;
}

.customize-container .edit-customize {
	height: 100cqb;
}
</style> -->