<script setup lang="ts">
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import type { DateTime } from '@/common/scripts/DateTime';
import { getTimeValue } from '@/common/scripts/clockRelational';
import { calcBorderArea } from '@/common/scripts/input_data_contents/calcBorderArea';
import { timeStore } from '@/stores/time';
import { nextTick } from 'vue';
import { computed, onUpdated, ref, type Ref } from 'vue';

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
	isRectView: boolean;
}

const props = defineProps<Props>();

const time = timeStore();

const halfClockSize = props.clockSize / 2;

const relatedTimeArray = computed(() => props.params.getParameterValue("relatedTime").split(":"));

const color = computed(() => props.params.getParameterValue("color"));
const size = computed(() => props.params.getParameterValue("size"));
const weight = computed(() => props.params.getParameterValue("width"));
const offsetX = computed(() => Number(props.params.getParameterValue("offsetX")) + halfClockSize);
const offsetY = computed(() => Number(props.params.getParameterValue("offsetY")) + halfClockSize);
const digitValue = computed(() => Number(props.params.getParameterValue("length")));

const displayTime = computed(() => getTimeValue(relatedTimeArray.value[0], relatedTimeArray.value[1], time.time as DateTime));

const rectParams = computed(() => calcBorderArea[props.params.heading](props.params, textObj.value!));

const textObj: Ref<SVGGElement | null> = ref(null);

const rectX = ref(0);
const rectY = ref(0);
const rectWidth = ref(0);
const rectHeight = ref(0);

onUpdated(async () => {
	await nextTick();

	if (textObj.value) {
		const rect = calcBorderArea[props.params.heading](props.params, textObj.value);
		rectX.value = rect.x;
		rectY.value = rect.y;
		rectWidth.value = rect.width;
		rectHeight.value = rect.height;
	}
	
});

console.log(displayTime.value, time.time.second, relatedTimeArray.value);
</script>

<template>
	<text :x="offsetX" :y="offsetY" :fill="color" :style="{ fontSize: size, fontWeight: weight, userSelect: 'none' }" dominant-baseline="middle" text-anchor="middle" ref="textObj">{{ (relatedTimeArray[0] === "OneDigit") ? displayTime : displayTime.toString().padStart(digitValue, "0") }}</text>

	<rect v-if="isRectView" :x="rectX + halfClockSize" :y="rectY + halfClockSize" :width="rectWidth" :height="rectHeight" fill-opacity="0" stroke-width="1" stroke-opacity="1" color="black" stroke="black" stroke-dasharray="3 3"></rect>
</template>

<style scoped lang="scss">
/* style here */
</style>