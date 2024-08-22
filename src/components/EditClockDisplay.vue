<script setup lang="ts">
import { type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { timeStore } from '@/stores/time';
import { layersStore } from '@/stores/layers';
import DotsOnCircle from './objects/DotsOnCircle.vue';
import { computed, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, type ComputedRef, type Ref } from 'vue';
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
import { debugOptions } from '@/common/scripts/debugs/debugOptions';
import { settingsStore } from '@/stores/settings';

export interface Props {
	parameters: ClockPartsParameters,
	// clockSize: Vector2;
}

const props = withDefaults(defineProps<Props>(), {

});

const storeLayers = layersStore();
const storeParams = clockParametersStore();
const dataNames = dataNamesStore();
const histories = historiesStore();
const settings = settingsStore();

const clockSize: ComputedRef<Vector2> = computed(() => {
	const canvasSize = settings.settings.canvasSize!;
	return new Vector2(canvasSize.width, canvasSize.height);
});

const time = timeStore();
const halfClockSizX: ComputedRef<number> = computed(() => clockSize.value.x / 2);
const halfClockSizeY: ComputedRef<number> = computed(() => clockSize.value.y / 2);

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

const cancelMovingEvent = (e: MouseEvent) => {
	if (e.button === 2) {
		cancelMoving();
	}
}

onMounted(() => {
	document.addEventListener("mousedown", cancelMovingEvent);
	document.addEventListener("mousemove", onDragMove);
	document.addEventListener("mouseup", onDragEnd);
});

onUnmounted(() => {
	document.removeEventListener("mousedown", cancelMovingEvent);
	document.removeEventListener("mousemove", onDragMove);
	document.removeEventListener("mouseup", onDragEnd);
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
	useIndexedDb.storeParameters(dataNames.currentDataId, JSON.parse(JSON.stringify(storeParams.currentParameterList)));
}

const cancelMoving = () => {
	if (!isLayerMoving.value) {
		return;
	}

	isLayerMoving.value = false;

	const offsetX = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetX" });
	const offsetY = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetY" });

	if (offsetX) {
		offsetX.reactiveValue = startPos.x.toString();
	}
	if (offsetY) {
		offsetY.reactiveValue = startPos.y.toString();
	}

	moveValue.value.x = 0;
	moveValue.value.y = 0;
}

// デバッグ用
const debugViewCanvasBorder = debugOptions
</script>

<template>
	<div class="clock-display-container">
		<svg class="clock-display-area" :class="{'debug-border': debugOptions.viewCanvasBorder}" :view-box="`0 0 ${clockSize.x} ${clockSize.y}`" :width="clockSize.x" :height="clockSize.y" @mousedown.left="(e) => onDragStart(e)">
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
.clock-display-area.background-transparent {
	background-size: 10px 10px;
	background-image: repeating-conic-gradient(from 0deg, #fff 0deg 90deg, #bbb 90deg 180deg);
	background-repeat: repeat;
}

.clock-display-area.debug-border {
	border: 1px solid black;
}
</style>