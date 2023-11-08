<script setup lang="ts">
import {circumferenceLength} from "@/common/scripts/utilities/circleUtilities";

export interface Props {
	cx: number,
	cy: number,
	r?: string,
	lineWidth?: string,
	dashLength?: string,
	minDashSpace?: string,
	maxDashSpace?: string,
	color?: string,
}

const props = withDefaults(defineProps<Props>(), {
	r: "100",
	lineWidth: "3",
	dashLength: "5",
	minDashSpace: "5",
	maxDashSpace: "99999",
	color: "black",
});

const calcDashDrawTimes = (): number => {
	const radius = Number(props.r);
	const dashLength = Number(props.dashLength);
	const minSpace = Number(props.minDashSpace);

	return Math.floor(circumferenceLength(radius) / (dashLength + minSpace));
}

const generateDasharray = (): string => {
	const radius = Number(props.r);
	const dashLength = Number(props.dashLength);
	const maxSpace = Number(props.maxDashSpace);

	let space = circumferenceLength(radius) / calcDashDrawTimes() - dashLength;

	if (space > maxSpace) {
		space = maxSpace;
	}

	console.log("draw times: " + calcDashDrawTimes());
	console.log(`${dashLength} ${space}`);

	return `${props.dashLength} ${space}`;
}
</script>

<template>
	<circle :cx="props.cx" :cy="props.cy" :r="props.r" :stroke-width="props.lineWidth" :stroke-dasharray="generateDasharray()" fill-opacity="0" stroke-opacity="1" stroke="black" />
</template>

<style scoped lang="scss">
/* style here */
</style>