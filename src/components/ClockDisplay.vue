<script setup lang="ts">
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import SvgCircleSolid from './svg-circles/SvgCircleSolid.vue';
import SvgCircleFill from './svg-circles/SvgCircleFill.vue';
import { timeStore } from '@/stores/time';
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';
import type { Rectangle } from '@/common/scripts/defines/Rectangle';
import { calcBorderArea } from '@/common/scripts/input_data_contents/calcBorderArea';
import { layersStore } from '@/stores/layers';
import DotsOnCircle from './objects/DotsOnCircle.vue';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { Vector2 } from '@/common/scripts/defines/Vector2';
import { clockParametersStore } from '@/stores/clockParameters';
import { dataNamesStore } from '@/stores/dataNames';
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";

export interface Props {
	parameters: ClockPartsParameters,
	clockSize: number;
}

const props = withDefaults(defineProps<Props>(), {

});

const storeLayers = layersStore();
const storeParams = clockParametersStore();
const storeDataNames = dataNamesStore();

const store = timeStore();
const halfClockSize: number = props.clockSize / 2;

const componentMap = new Map();
componentMap.set("衛星", DotsOnCircle);

const isLayerMoving: Ref<boolean> = ref(false);

const rectParams = computed(() => (params: SingleUnitParameters) => calcBorderArea[params.heading](params));

const moveValue: Ref<Vector2> = ref(new Vector2(0, 0));
const intervalValue: Ref<Vector2> = ref(new Vector2(0, 0));
let startPos = new Vector2(0, 0);

const onDragStart = (e: MouseEvent) => {
	isLayerMoving.value = true;
	startPos.x = e.clientX;
	startPos.y = e.clientY;
	intervalValue.value = startPos;
}

const onDragMove = (e: MouseEvent) => {
	if (!isLayerMoving.value) {
		return;
	}
	moveValue.value = new Vector2(e.clientX, e.clientY).sub(intervalValue.value);

	const offsetX = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetX" });
	if (offsetX) {
		offsetX.reactiveValue = (Number(offsetX.reactiveValue) + moveValue.value.x).toString();
	}

	const offsetY = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetY" });
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
	if (offsetX) {
		offsetX.reactiveValue = (Number(offsetX.reactiveValue) + moveValue.value.x).toString();
	}

	const offsetY = props.parameters[storeLayers.currentSelect].parameters.find((p) => { return p.propertyCode === "offsetY" });
	if (offsetY) {
		offsetY.reactiveValue = (Number(offsetY.reactiveValue) + moveValue.value.y).toString();
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
			<g v-for="(val, index) in props.parameters" key="clock-display">
				<DotsOnCircle v-if="val.heading === '衛星'" :params="val" :clock-size="clockSize" />

				<rect v-if="storeLayers.currentSelect === index" :x="rectParams(val).x + halfClockSize" :y="rectParams(val).y + halfClockSize" :width="rectParams(val).width" :height="rectParams(val).height" fill-opacity="0" stroke-width="1" stroke-opacity="1" color="black" stroke="black"></rect>
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>