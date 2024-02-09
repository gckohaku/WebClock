<script setup lang="ts">
import { onBeforeUpdate, onMounted, onUpdated, ref, type Ref } from 'vue';

import type { ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { layersStore } from '@/stores/layers';
import { storeParametersToIdb } from '@/common/scripts/storeParametersToIdb';
import { clockParametersStore } from '@/stores/clockParameters';
import { dataNamesStore } from '@/stores/dataNames';

const storeLayers = layersStore();
const storeClockParams = clockParametersStore();
const storeDataNames = dataNamesStore();

export interface Props {
	layers: ClockPartsParameters;
}

const props = defineProps<Props>();

const isInputPossible: Ref<boolean> = ref(false);

const dblClickAction = () => {
	isInputPossible.value = true;
}

const isMoveToThis: Ref<boolean[]> = ref([]);
isMoveToThis.value.length = props.layers.values.length;

const onChangeLayerName = (e: Event, index: number): void => {
	props.layers[index].layerName = (e.target as HTMLInputElement).value;
	storeParametersToIdb(storeDataNames.currentDataName, JSON.parse(JSON.stringify(props.layers)));
	console.log(e);
}

const dragStartPos: Ref<{x: number, y: number}> = ref({x: 0, y: 0});

const calcDragValue = (moveTo: number, list: ClockPartsParameters, index: number): number => {
	const moveLine: number = Math.floor((moveTo - dragStartPos.value.y) / 20 + 0.5);
	console.log(moveLine);
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

	if (storeLayers.currentSelect === index) {
		storeLayers.currentSelect = indexNumberTo;
		return;
	}
	if (storeLayers.currentSelect === indexNumberTo) {
		storeLayers.currentSelect = index;
		return;
	}
}
</script>

<template>
	<div class="layers-container">
		<div v-for="(val, index) in props.layers" class="layer-content" :key="`${val}`" ref="inputRef">
			<!-- <div v-if="!(isInputPossible && index === storeLayers.currentSelect)" class="layer-unit" :class="(storeLayers.currentSelect === index) ? 'selecting' : ''" @click="storeLayers.currentSelect = index" @dblclick="dblClickAction">
				{{ index }}: {{ val.heading }}
			</div>

			<input v-else @focusout="isInputPossible = false" ref="inputRef" /> -->

			<input type="text" class="layer-unit" :class="[(storeLayers.currentSelect === index) ? 'selecting' : '', isMoveToThis[index] ? 'drag-move-to' : '',]" :value="val.layerName" :readonly="(isInputPossible && index === storeLayers.currentSelect) ? false : true" @click="storeLayers.currentSelect = index" @focusout="isInputPossible = false" @keydown.enter="isInputPossible = false" @dblclick="dblClickAction" @input="(e) => {onChangeLayerName(e, index)}" draggable="true" @dragstart="dragStartPos = {x: $event.screenX, y: $event.screenY}" @drag="(e) => {onDrag(e, props.layers, index)}" @dragend="(e) => {onDragEnd(e, props.layers, index)}" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.layers-container {
	.layer-content {
		height: 20px;

		.layer-unit {
			cursor: pointer;
			box-sizing: border-box;
			display: block;
			width: 100%;
			height: 100%;
			padding: 2px;
			background-color: #f0f0f0;
			border: none;


			&:hover {
				outline: blue 1px solid;
				outline-offset: -1px;
			}

			&.selecting {
				background-color: #e0e0e0;

				&:not(:read-only) {
					background-color: white;
				}
			}

			&.drag-move-to {
				background-color: lightblue;
			}
		}
	}
}
</style>