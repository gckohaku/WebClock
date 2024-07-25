<script setup lang="ts">
import { ref, type Ref } from 'vue';

import type { ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { layersStore } from '@/stores/layers';
import { clockParametersStore } from '@/stores/clockParameters';
import { dataNamesStore } from '@/stores/dataNames';
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import { settingsStore } from '@/stores/settings';
import { historiesStore } from '@/stores/histories';
import { ClockOperationContent } from '@/common/scripts/related-operation-history/ClockOperationContent';

const storeLayers = layersStore();
const storeDataNames = dataNamesStore();
const storeSettings = settingsStore();
const histories = historiesStore();

export interface Props {
	layers: ClockPartsParameters;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	delete: [index: number];
}>()

const isInputPossible: Ref<boolean> = ref(false);
let beforeLayerName: string = "";
const isMoveToThis: Ref<boolean[]> = ref([]);
isMoveToThis.value.length = props.layers.values.length;

const dblClickAction = (layerName: string) => {
	isInputPossible.value = true;
	beforeLayerName = layerName;
}

const onChangeLayerName = (e: Event, index: number): void => {
	props.layers[index].layerName = (e.target as HTMLInputElement).value;
	useIndexedDb.storeParameters(storeDataNames.currentDataId, JSON.parse(JSON.stringify(props.layers)));
}

const endOfChangeLayerName = (e: Event, index: number): void => {
	const changedLayerName: string = (e.target as HTMLInputElement).value;
	histories.addOperation(new ClockOperationContent("change", index, "layer", beforeLayerName, changedLayerName));
}

const dragStartPos: Ref<{ x: number, y: number }> = ref({ x: 0, y: 0 });

const calcDragValue = (moveTo: number, list: ClockPartsParameters, index: number): number => {
	const moveLine: number = Math.floor((moveTo - dragStartPos.value.y) / 20 + 0.5);
	return Math.min(Math.max(index + moveLine, 0), list.length - 1);
}

const onDrag = (e: DragEvent, list: ClockPartsParameters, index: number) => {
	const indexNumberTo: number = calcDragValue(e.screenY, list, index);
	isMoveToThis.value.fill(false);

	if (index === indexNumberTo) {
		return;
	}

	isMoveToThis.value[indexNumberTo] = true;
}

const onDragEnd = (e: DragEvent, list: ClockPartsParameters, index: number): void => {
	const indexNumberTo: number = calcDragValue(e.screenY, list, index);

	isMoveToThis.value.fill(false);

	if (index === indexNumberTo) {
		return;
	}
	[list[index], list[indexNumberTo]] = [list[indexNumberTo], list[index]];
	histories.addOperation(new ClockOperationContent("swap", index, "layer", index, indexNumberTo));

	if (storeLayers.currentSelect === index) {
		storeLayers.currentSelect = indexNumberTo;
		return;
	}
	if (storeLayers.currentSelect === indexNumberTo) {
		storeLayers.currentSelect = index;
		return;
	}
}

const onLayerClick = async (index: number) => {
	storeLayers.currentSelect = index;
	const settings = storeSettings.settings;
	settings.selectedLayer = index;

	await storeSettings.updateSettings(storeDataNames.currentDataId, settings);
}
</script>

<template>
	<div class="layers-container">
		<div v-for="(val, index) in props.layers" class="layer-content" :class="[(storeLayers.currentSelect === index) ? 'selecting' : '', isMoveToThis[index] ? 'drag-move-to' : '',]" draggable="true" @dragstart="dragStartPos = { x: $event.screenX, y: $event.screenY }" @drag="(e) => { onDrag(e, props.layers, index) }" @dragend="(e) => { onDragEnd(e, props.layers, index) }" :key="val.layerNumberUntilNow" ref="val">

			<input type="text" class="layer-unit" :value="val.layerName" :readonly="(isInputPossible && index === storeLayers.currentSelect) ? false : true" @click="onLayerClick(index)" @focusout="isInputPossible = false" @keydown.enter="isInputPossible = false" @dblclick="dblClickAction(val.layerName)" @input="(e) => { onChangeLayerName(e, index) }" @change="e => endOfChangeLayerName(e, index)" />
			<button class="delete-button" @click="$emit('delete', index)">×</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.layers-container {
	.layer-content {
		display: grid;
		grid-template-columns: 1fr 20px;
		grid-template-rows: 20px;

		&:hover {
			outline: blue 1px solid;
			outline-offset: -1px;
		}

		&.selecting {
			background-color: #e0e0e0;
		}

		&.drag-move-to {
			background-color: lightblue;
		}

		.layer-unit,
		.delete-button {
			box-sizing: border-box;
			height: 100%;
			padding: 2px;
		}

		.layer-unit {
			cursor: pointer;
			display: block;
			background-color: transparent;
			border: none;

			&:not(:read-only) {
				background-color: white;
			}
		}

		.delete-button {
			background-color: transparent;
			border: none;
			cursor: pointer;

			&:hover {
				background-color: #c0c0c0;
			}
		}
	}
}
</style>