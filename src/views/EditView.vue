<script setup lang="ts">
import { onBeforeUnmount, onMounted, onRenderTracked, onUpdated, ref, watchEffect } from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
import GcParameterSettingList from "@/components/modules/GcParameterSettingList.vue";
import ParameterSettingSidebar from "@/components/ParameterSettingSidebar.vue";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import { analogDotsOnCircleDataList } from "@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList";

let wrapperTopPos: number;
let wrapperHeight = ref(0);

const changeWindowProcess = () => {
	wrapperHeight.value = window.innerHeight - (document.querySelector(".editor-wrapper")?.getBoundingClientRect().top as number);
}

onMounted(() => {
	changeWindowProcess();
	window.addEventListener("resize", changeWindowProcess);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", changeWindowProcess);
});

</script>

<template>
	<p>edit</p>
	<div class="editor-wrapper" :style="{height: wrapperHeight + 'px'}"
	>
		<div class="editor-container">
			<div class="edit-preview">preview</div>
			<div class="edit-customize">
				<ParameterSettingSidebar :parameters="analogDotsOnCircleDataList" slider-length="100px"></ParameterSettingSidebar>
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

	.edit-preview {
		background-color: #ffe0ff;
	}

	.edit-customize {
		background-color: #e0ffff;
		width: 300px;
	}

}
</style>