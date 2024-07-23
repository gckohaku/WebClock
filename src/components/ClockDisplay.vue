<script setup lang="ts">
import { type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { timeStore } from '@/stores/time';
import { layersStore } from '@/stores/layers';
import DotsOnCircle from './objects/DotsOnCircle.vue';
import { onUpdated, ref, type Ref } from 'vue';
import { Vector2 } from '@/common/scripts/defines/Vector2';
import { clockParametersStore } from '@/stores/clockParameters';
import { dataNamesStore } from '@/stores/dataNames';
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import AnalogRoundedIrregularityHand from './objects/AnalogRoundedIrregularityHand.vue';
import AnalogRoundedAlignedHand from './objects/AnalogRoundedAlignedHand.vue';
import { clockPartsNames } from '@/common/scripts/input_data_contents/clockPartsNames';
import { historiesStore } from '@/stores/histories';
import { ClockOperationContent } from '@/common/scripts/related-operation-history/ClockOperationContent';
import DigitalVariableFontNumber from './objects/DigitalVariableFontNumber.vue';

export interface Props {
	parameters: ClockPartsParameters,
	clockSize: number;
}

const props = withDefaults(defineProps<Props>(), {

});

const storeLayers = layersStore();
const storeParams = clockParametersStore();
const storeDataNames = dataNamesStore();
const histories = historiesStore();

const time = timeStore();
const halfClockSize: number = props.clockSize / 2;

const isLayerMoving: Ref<boolean> = ref(false);

// const rectParams = computed(() => <T extends SingleUnitParameters>(params: T, e: SVGGElement[], index: number) => {
// 	calcBorderArea[params.heading](params, e, index);
// });

const moveValue: Ref<Vector2> = ref(new Vector2(0, 0));
const intervalValue: Ref<Vector2> = ref(new Vector2(0, 0));
let startPos = new Vector2(0, 0);

const displayZone: Ref<SVGGElement[] | null> = ref(null);

// rect
const rectX = ref(0);
const rectY = ref(0);
const rectWidth = ref(0);
const rectHeight = ref(0);

onUpdated(async () => {

});

// イベント処理
const onDragStart = (e: MouseEvent) => {
	isLayerMoving.value = true;

	const parameters = props.parameters[storeLayers.currentSelect].parameters;

	startPos.x = Number(parameters.find(p => p.propertyCode === "offsetX")!.reactiveValue);
	startPos.y = Number(parameters.find(p => p.propertyCode === "offsetY")!.reactiveValue);

	intervalValue.value = new Vector2(e.clientX, e.clientY);
}

const onDragMove = (e: MouseEvent) => {
	if (!isLayerMoving.value) {
		return;
	}

	moveValue.value = new Vector2(e.clientX, e.clientY).sub(intervalValue.value);

	const offsetX = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetX" });
	const offsetY = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetY" });

	if (offsetX) {
		offsetX.reactiveValue = (Number(offsetX.reactiveValue) + moveValue.value.x).toString();
	}
	if (offsetY) {
		offsetY.reactiveValue = (Number(offsetY.reactiveValue) + moveValue.value.y).toString();
	}

	intervalValue.value = intervalValue.value.add(moveValue.value);
}

const onDragEnd = (e: MouseEvent) => {
	if (!isLayerMoving.value) {
		return;
	}

	isLayerMoving.value = false;
	moveValue.value = (new Vector2(e.clientX, e.clientY)).sub(intervalValue.value);

	const offsetX = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetX" });
	const offsetY = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetY" });

	if (offsetX) {
		offsetX.reactiveValue = (Number(offsetX.reactiveValue) + moveValue.value.x).toString();
	}
	if (offsetY) {
		offsetY.reactiveValue = (Number(offsetY.reactiveValue) + moveValue.value.y).toString();
	}
	
	if (offsetX && offsetY && Number(offsetX.reactiveValue) === startPos.x && Number(offsetY.reactiveValue) === startPos.y) {
		return;
	}

	if (offsetX && offsetY) {
		histories.addOperation(new ClockOperationContent("change", storeLayers.currentSelect, "offsetPosition", new Vector2(startPos), new Vector2(offsetX.reactiveValue, offsetY.reactiveValue)));
	}

	moveValue.value.x = 0;
	moveValue.value.y = 0;

	// storeParametersToIdb(storeDataNames.currentDataName, JSON.parse(JSON.stringify(storeParams.currentParameterList)));
	useIndexedDb.storeParameters(storeDataNames.currentDataId, JSON.parse(JSON.stringify(storeParams.currentParameterList)));
}
</script>

<template>
	<div>
		<svg :view-box="`0 0 ${clockSize} ${clockSize}`" :width="clockSize" :height="clockSize" @mousedown="(e) => onDragStart(e)" @mousemove="(e) => onDragMove(e)" @mouseup="(e) => onDragEnd(e)" @mouseleave="(e) => onDragEnd(e)">
			<g v-for="(val, index) in props.parameters" :key="index" ref="displayZone">
				<DotsOnCircle v-if="val.heading === clockPartsNames.analog.dotsOnCircle" :params="val" :clock-size="clockSize" :is-rect-view="storeLayers.currentSelect === index" />
				<AnalogRoundedIrregularityHand v-if="val.heading === clockPartsNames.analog.roundedIrregularityHand" :params="val" :clock-size="clockSize" :is-rect-view="storeLayers.currentSelect === index" />
				<AnalogRoundedAlignedHand v-if="val.heading === clockPartsNames.analog.roundedAlignedHand" :params="val" :clock-size="clockSize" :is-rect-view="storeLayers.currentSelect === index" />
				<DigitalVariableFontNumber v-if="val.heading === clockPartsNames.digital.digitalVariableFontNumber" :params="val" :clock-size="clockSize" :is-rect-view="storeLayers.currentSelect === index" />
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>