<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
import GcParameterSettingList from "@/components/modules/GcParameterSettingList.vue";
import ParameterSettingSidebar from "@/components/ParameterSettingSidebar.vue";
import AnalogDotsOnCircleClock from "@/components/AnalogDotsOnCircleClock.vue";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import { analogDotsOnCircleDataList } from "@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList";

let wrapperTopPos: number;
let wrapperHeight = ref(0);

// const changeWindowProcess = () => {
// 	wrapperHeight.value = window.innerHeight - (document.querySelector(".editor-wrapper")?.getBoundingClientRect().top as number);
// }

// onMounted(() => {
// 	changeWindowProcess();
// 	window.addEventListener("resize", changeWindowProcess);
// });

// onBeforeUnmount(() => {
// 	window.removeEventListener("resize", changeWindowProcess);
// });

</script>

<template>
	<!-- <p>a</p> -->
	<div class="editor-wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div class="editor-container">
			<div class="edit-preview">
				<AnalogDotsOnCircleClock :lists="analogDotsOnCircleDataList"></AnalogDotsOnCircleClock>
			</div>
			<div class="customize-container">
				<div class="edit-customize">
					<ParameterSettingSidebar :parameters="analogDotsOnCircleDataList" slider-length="100px"></ParameterSettingSidebar>
				</div>
			</div>

		</div>
	</div>
</template>

<style scoped lang="scss">
.editor-container {
	display: grid;
	grid-template-columns: 1fr 300px;
	width: 100%;
	height: 100%;
	container-type: size;

	.edit-preview {
		background-color: #ffe0ff;
		// qcb 単位を使うとエラーが出るので、css の style scoped の方に書いている (早くコンテナクエリ関連に対応しろ)
	}

	.customize-container {
		box-sizing: border-box;
		padding: 1px;
		width: 300px;
		background-color: #e0ffff;

		.edit-customize {
			box-sizing: border-box;
			overflow-y: scroll;

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
</style>

<!-- <style scoped>
.edit-preview {
	height: 100cqb;
}

.customize-container .edit-customize {
	height: 100cqb;
}
</style> -->