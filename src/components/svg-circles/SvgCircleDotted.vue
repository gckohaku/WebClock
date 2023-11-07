<script setup lang="ts">
import { circumferenceLength } from '@/common/scripts/utilities/circleUtilities';
import AnalogDotsOnCircleClock from '../AnalogDotsOnCircleClock.vue';

export interface Props {
	cx: number,
	cy: number,
	r?: string,
	dotValue?: string,
	dotSize?: string,
	minDotSpace?: string,
	maxDotSpace?: string,
}

const props = withDefaults(defineProps<Props>(), {
	r: "100",
	dotValue: "",
	dotSize: "3",
	minDotSpace: "10",
	maxDotSpace: "99999",
});

const calcDotDrawTimes = (): number => {
	const radius = Number(props.r);
	const dotSize = Number(props.dotSize);
	const minSpace = Number(props.minDotSpace);

	console.log("min: " + props.minDotSpace);

	return Math.floor(circumferenceLength(radius) / minSpace);
}

const generateDasharray = (): string => {
	const radius = Number(props.r);

	if (!!Number(props.dotValue) && Number(props.dotValue) > 0) {
		return `0 ${circumferenceLength(radius) / Number(props.dotValue)}`;
	}

	const dotSize = Number(props.dotSize);
	const maxSpace = Number(props.maxDotSpace);

	let space = circumferenceLength(radius) / calcDotDrawTimes();

	if (space > maxSpace) {
		space = maxSpace;
	}

	console.log("draw times: " + calcDotDrawTimes());
	console.log(`0 ${space}`);

	return `0 ${space}`;
}
</script>

<template>
	<circle :cx="props.cx" :cy="props.cy" :r="props.r" :stroke-width="props.dotSize" stroke-linecap="round" :stroke-dasharray="generateDasharray()" fill-opacity="0" stroke-opacity="1" stroke="black" />
</template>

<style scoped lang="scss">
/* style here */
</style>