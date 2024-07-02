<script setup lang="ts">
import { SingleUnitParameters } from "@/common/scripts/ClockPartsParameters";
import { layersStore } from "@/stores/layers";
import { timeStore } from "@/stores/time";
import { getParameterValue, getNormalTimeValue } from "@/common/scripts/clockRelational";
import SvgCircleSolid from "../svg-circles/SvgCircleSolid.vue";
import SvgCircleFill from "../svg-circles/SvgCircleFill.vue";
import { computed, nextTick, onUpdated, ref } from "vue";
import type { DateTime } from "@/common/scripts/DateTime";
import { calcBorderArea } from "@/common/scripts/input_data_contents/calcBorderArea";

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
	isRectView: boolean;
}

const props = defineProps<Props>();

const storeLayers = layersStore();
const storeTime = timeStore();

const rectX = ref(0);
const rectY = ref(0);
const rectWidth = ref(0);
const rectHeight = ref(0);

onUpdated(async () => {
	if (!props.isRectView) {
		return;
	}

	await nextTick();

		const rect = calcBorderArea[props.params.heading](props.params);
		rectX.value = rect.x;
		rectY.value = rect.y;
		rectWidth.value = rect.width;
		rectHeight.value = rect.height;
});

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

	<rect v-if="isRectView" :x="rectX + halfClockSize" :y="rectY + halfClockSize" :width="rectWidth" :height="rectHeight" fill-opacity="0" stroke-width="1" stroke-opacity="1" color="black" stroke="black" stroke-dasharray="3 3"></rect>
</template>

<style scoped lang="scss">
/* style here */
</style>