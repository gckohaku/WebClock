<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
import GcSliderInputList from "@/components/modules/GcSliderInputList.vue";
import { InputDataContents } from "@/common/scripts/InputDataContents";

let wrapperTopPos: number;
let wrapperHeight = ref(0);

onMounted(() => {
	wrapperHeight.value = window.innerHeight - (document.querySelector(".editor-wrapper")?.getBoundingClientRect().top as number);
});

</script>

<template>
	<p>edit</p>
	<div class="editor-wrapper" :style="{height: wrapperHeight + 'px'}"
	>
		<div class="editor-container">
			<div class="edit-preview">preview</div>
			<div class="edit-customize">customize</div>
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