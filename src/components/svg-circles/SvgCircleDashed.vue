<script setup lang="ts">
import {circumferenceLength} from "@/common/scripts/utilities/circleUtilities";

export interface Props {
	cx: number,
	cy: number,
	r: string,
	lineWidth: string,
	dashLength: string,
	minDashSpace: string,
	maxDashSpace: string,
}

const props = withDefaults(defineProps<Props>(), {
	r: "100",
	lineWidth: "3",
	dashLength: "5",
	minDashSpace: "5",
	maxDashSpace: "10",
});

const calcDashDrawTimes = (): number => {
	const radius = parseInt(props.r);
	const dashLength = parseInt(props.dashLength);
	const minSpace = parseInt(props.minDashSpace); 

	return Math.floor(circumferenceLength(radius) / (dashLength + minSpace));
}

const generateDasharray = (): string => {
	const radius = parseInt(props.r);
	const lineWidth = parseInt(props.lineWidth);

	console.log(`${props.dashLength} ${2 * Math.PI * radius / calcDashDrawTimes() - lineWidth}`);

	return `${props.dashLength} ${2 * Math.PI * radius / calcDashDrawTimes() - lineWidth}`;
}
</script>

<template>
	<circle :cx="props.cx" :cy="props.cy" :r="props.r" :stroke-width="props.lineWidth" :stroke-dasharray="generateDasharray()" fill-opacity="0" stroke-opacity="1" stroke="black" />
</template>

<style scoped lang="scss">
/* style here */
</style>