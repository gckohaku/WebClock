<script setup lang="ts">
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import type { DateTime } from '@/common/scripts/DateTime';
import { getTimeValue } from '@/common/scripts/clockRelational';
import { timeStore } from '@/stores/time';
import { computed } from 'vue';

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
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

console.log(displayTime.value, time.time.second, relatedTimeArray.value);
</script>

<template>
	<text :x="offsetX" :y="offsetY" :fill="color" :style="{ fontSize: size, fontWeight: weight }" dominant-baseline="middle" text-anchor="middle">{{ (relatedTimeArray[0] === "OneDigit") ? displayTime : displayTime.toString().padStart(digitValue, "0") }}</text>
</template>

<style scoped lang="scss">
/* style here */
</style>