<script setup lang="ts">
import { popUpDataStore } from '@/stores/popUpData';
import { type Ref, ref, onBeforeMount } from 'vue';
import { onKeyDown } from '@vueuse/core';
import { settingsStore } from '@/stores/settings';
import GcNumberInput from './modules/GcNumberInput.vue';
import { dataNamesStore } from '@/stores/dataNames';

const emit = defineEmits<{
	"change": [void],
}>();

const popUpData = popUpDataStore();
const settings = settingsStore();
const dataNames = dataNamesStore();

const widthInput: Ref<string> = ref("");
const heightInput: Ref<string> = ref("");

const disableModal = () => {
	popUpData.canvasSizeModalVisible = false;
}

const onEnterClick = async () => {
	disableModal();

	const canvasSize = settings.settings.canvasSize;
	if (canvasSize) {
		canvasSize.width = Number(widthInput.value);
		canvasSize.height = Number(heightInput.value);
	}

	await settings.updateSettings(dataNames.currentDataId, settings.settings);
	emit("change");
}

const onCancelClick = () => {
	disableModal();
}

onBeforeMount(() => {
	const canvasSize = settings.settings.canvasSize;
	if (canvasSize) {
		widthInput.value = canvasSize.width.toString();
		heightInput.value = canvasSize.height.toString();
	}
});

onKeyDown("Escape", () => {
	popUpData.canvasSizeModalVisible = false;
});
</script>

<template>
	<div class="modal-wrapper" @click="disableModal">
		<div class="modal-container" @click.stop>
			<p>キャンバスサイズの変更</p>
			
			<label for="canvas-width">width: <GcNumberInput :model-value="widthInput" id="canvas-width" name="canvas-width" max="1980" @update:model-value="(value: string) => widthInput = value" /></label>
			<label for="canvas-height">height: <GcNumberInput :model-value="heightInput" id="canvas-height" name="canvas-height" max="1080" @update:model-value="(value: string) => heightInput = value" /></label>

			<button @click="onEnterClick">enter</button>
			<button @click="onCancelClick">cancel</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.modal-wrapper {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100dvh;
	display: grid;
	place-items: center;

	.modal-container {
		width: max(500px, 50%);
		height: 70%;

		background-color: rgba($color: #000, $alpha: .3);
	}
}
</style>