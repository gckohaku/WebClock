<script setup lang="ts">
import { SingleUnitParameters } from "@/common/scripts/ClockPartsParameters";
import type { Rectangle } from "@/common/scripts/defines/Rectangle";
import { calcBorderArea } from "@/common/scripts/input_data_contents/calcBorderArea";
import { type ParametersProperties } from "@/common/scripts/object_parameters/ParametersProperties";
import { layersStore } from "@/stores/layers";
import { timeStore } from "@/stores/time";
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';
import { getParameterValue, getNormalTimeValue } from "@/common/scripts/clockRelational";
import SvgCircleSolid from "../svg-circles/SvgCircleSolid.vue";
import SvgCircleFill from "../svg-circles/SvgCircleFill.vue";
import { type Ref, ref, onBeforeUpdate, onBeforeMount } from "vue";
import type { DateTime } from "@/common/scripts/DateTime";

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
}

const props = defineProps<Props>();

const storeLayers = layersStore();
const storeTime = timeStore();

const halfClockSize: number = props.clockSize / 2;

// let offsetX: number = Number(getParameterValue(props.params, "offsetX"));
// let offsetY: number = Number(getParameterValue(props.params, "offsetY"));
let color: string = getParameterValue(props.params, "color");
let size: number = Number(getParameterValue(props.params, "size"));
let width: number = Number(getParameterValue(props.params, "width"));
let relatedTime: string = getParameterValue(props.params, "relatedTime");
let accessory1_size: number = Number(getParameterValue(props.params, "accessory1_size"));

const solidColor: Ref<string> = ref("");
const solidCx: Ref<number> = ref(0);
const solidCy: Ref<number> = ref(0);
const solidR: Ref<number> = ref(0);

const settingParameters = (): void => {
	
	const offsetX = Number(getParameterValue(props.params, "offsetX"));
	const offsetY = Number(getParameterValue(props.params, "offsetY"));
	const color = getParameterValue(props.params, "color");
	const size = Number(getParameterValue(props.params, "size"));
	const width = Number(getParameterValue(props.params, "width"));
	const relatedTime = getParameterValue(props.params, "relatedTime");
	const accessory1_size = Number(getParameterValue(props.params, "accessory1_size"));

	console.log(offsetX);

	solidColor.value = color;
	solidCx.value = offsetX + halfClockSize;
	solidCy.value = offsetY + halfClockSize;
	solidR.value = size;
}

onBeforeMount(() => {
	settingParameters();
});

onBeforeUpdate(() => {
	// offsetX = Number(getParameterValue(props.params, "offsetX"));
	// offsetY = Number(getParameterValue(props.params, "offsetY"));
	color = getParameterValue(props.params, "color");
	size = Number(getParameterValue(props.params, "size"));
	width = Number(getParameterValue(props.params, "width"));
	relatedTime = getParameterValue(props.params, "relatedTime");
	accessory1_size = Number(getParameterValue(props.params, "accessory1_size"));

	settingParameters();
});
</script>

<template>
	<SvgCircleSolid :color="solidColor" :cx="solidCx" :cy="solidCy" :r="size / 2" :line-width="width" />
	<!-- <SvgCircleFill :color="color" :r="accessory1_size" :cx="halfClockSize + offsetX + (size / 2) * Math.cos(Math.PI * 2 * getNormalTimeValue(relatedTime, storeTime.time as DateTime) - Math.PI / 2)" :cy="halfClockSize + offsetY + (size / 2) * Math.sin(Math.PI * 2 * getNormalTimeValue(relatedTime, storeTime.time as DateTime) - Math.PI / 2)" /> -->
</template>

<style scoped lang="scss">
/* style here */
</style>