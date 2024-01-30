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
import { type Ref, ref, onBeforeUpdate } from "vue";
import type { DateTime } from "@/common/scripts/DateTime";

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
}

const props = defineProps<Props>();

const storeLayers = layersStore();
const storeTime = timeStore();

const halfClockSize: number = props.clockSize / 2;

const offsetX: Ref<number> = ref(Number(getParameterValue(props.params, "offsetX")));
const offsetY: Ref<number> = ref(Number(getParameterValue(props.params, "offsetY")));
const color: Ref<string> = ref(getParameterValue(props.params, "color"));
const size: Ref<number> = ref(Number(getParameterValue(props.params, "size")));
const width: Ref<number> = ref(Number(getParameterValue(props.params, "width")));
const relatedTime: Ref<string> = ref(getParameterValue(props.params, "relatedTime"));
const accessory1_size: Ref<number> = ref(Number(getParameterValue(props.params, "accessory1_size")));

onBeforeUpdate(() => {
	offsetX.value = Number(getParameterValue(props.params, "offsetX"));
	offsetY.value = Number(getParameterValue(props.params, "offsetY"));
	color.value = getParameterValue(props.params, "color");
	size.value = Number(getParameterValue(props.params, "size"));
	width.value = Number(getParameterValue(props.params, "width"));
	relatedTime.value = getParameterValue(props.params, "relatedTime");
	accessory1_size.value = Number(getParameterValue(props.params, "accessory1_size"));
});
</script>

<template>
	<SvgCircleSolid :color="color" :cx="offsetX + halfClockSize" :cy="offsetY + halfClockSize" :r="size / 2" :line-width="width" />
	<SvgCircleFill :color="color" :r="accessory1_size" :cx="halfClockSize + offsetX + (size / 2) * Math.cos(Math.PI * 2 * getNormalTimeValue(relatedTime, storeTime.time as DateTime) - Math.PI / 2)" :cy="halfClockSize + offsetY + (size / 2) * Math.sin(Math.PI * 2 * getNormalTimeValue(relatedTime, storeTime.time as DateTime) - Math.PI / 2)" />
</template>

<style scoped lang="scss">
/* style here */
</style>