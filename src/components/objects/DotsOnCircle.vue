<script setup lang="ts">
import { SingleUnitParameters } from "@/common/scripts/ClockPartsParameters";
import { layersStore } from "@/stores/layers";
import { timeStore } from "@/stores/time";
import { getParameterValue, getNormalTimeValue } from "@/common/scripts/clockRelational";
import SvgCircleSolid from "../svg-circles/SvgCircleSolid.vue";
import SvgCircleFill from "../svg-circles/SvgCircleFill.vue";
import { computed } from "vue";
import type { DateTime } from "@/common/scripts/DateTime";

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
}

const props = defineProps<Props>();

const storeLayers = layersStore();
const storeTime = timeStore();

const halfClockSize: number = props.clockSize / 2;

const solidColor = computed(() => getParameterValue(props.params, "color"));
const solidCx = computed(() => Number(getParameterValue(props.params, "offsetX")) + halfClockSize);
const solidCy = computed(() => Number(getParameterValue(props.params, "offsetY")) + halfClockSize);
const solidR = computed(() => Number(getParameterValue(props.params, "size")) / 2);
const solidLineWidth = computed(() => getParameterValue(props.params, "width"));
const fillColor = computed(() => getParameterValue(props.params, "accessory1_color"));
const fillSize = computed(() => getParameterValue(props.params, "accessory1_size"));
const fillCx = computed(() => halfClockSize + Number(getParameterValue(computed(() => props.params).value, "offsetX")) + (Number(getParameterValue(props.params, "size")) / 2) * Math.cos(Math.PI * 2 * getNormalTimeValue(getParameterValue(props.params, "relatedTime"), storeTime.time as DateTime) - Math.PI / 2));
const fillCy = computed(() => halfClockSize + Number(getParameterValue(computed(() => props.params).value, "offsetY")) + (Number(getParameterValue(props.params, "size")) / 2) * Math.sin(Math.PI * 2 * getNormalTimeValue(getParameterValue(props.params, "relatedTime"), storeTime.time as DateTime) - Math.PI / 2));
</script>

<template>
	<SvgCircleSolid :color="solidColor" :cx="solidCx" :cy="solidCy" :r="solidR" :line-width="solidLineWidth" />
	<SvgCircleFill :color="fillColor" :r="fillSize" :cx="fillCx" :cy="fillCy" />
</template>

<style scoped lang="scss">
/* style here */
</style>