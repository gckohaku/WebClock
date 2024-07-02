<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, type Ref } from 'vue';
import { timeStore } from '@/stores/time';
import { Vector2 } from '@/common/scripts/defines/Vector2';
import { getNormalTimeValue, getParameterValue } from '@/common/scripts/clockRelational';
import type { DateTime } from '@/common/scripts/DateTime';
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import { couldStartTrivia } from 'typescript';
import { calcBorderArea } from '@/common/scripts/input_data_contents/calcBorderArea';

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
	isRectView: boolean;
}

const props = defineProps<Props>();
const halfClockSize: number = props.clockSize / 2;

const time = timeStore();

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

const second = computed(() => time.time.second);
const minute = computed(() => time.time.minute);
const hour = computed(() => time.time.hour);

const rootSize = computed(() => Number(getParameterValue(props.params, "size")));
const tipSize = rootSize;
const length = computed(() => Number(getParameterValue(props.params, "length")));
const center = computed(() => new Vector2(getParameterValue(props.params, "offsetX"), getParameterValue(props.params, "offsetY")).add(new Vector2(halfClockSize, halfClockSize)));

const accessoryRootSize = computed(() => Number(getParameterValue(props.params, "accessory2_size")));

const baseColor = computed(() => getParameterValue(props.params, "color"));
const accessoryRootColor = computed(() => getParameterValue(props.params, "accessory2_color"));

const angle = computed(() => getNormalTimeValue(getParameterValue(props.params, "relatedTime"), time.time as DateTime) * 2 * Math.PI - Math.PI / 2);

const relativeTipPos = computed((): Vector2 => {
	return new Vector2(length.value * Math.cos(angle.value), length.value * Math.sin(angle.value));
});

const calcRootJointPoint = computed(() => (rootSize: number, rootPos: Vector2, tipSize: number, relativeTipPos: Vector2): Vector2[] => {
	const rootRadius = rootSize / 2;
	const tipRadius = tipSize / 2;
	const tipPos = relativeTipPos;
	const p2PLUSq2 = tipPos.x * tipPos.x + tipPos.y * tipPos.y;
	const rcMINUSrd = rootRadius - tipRadius;
	const innerSqrt = p2PLUSq2 - rcMINUSrd * rcMINUSrd;

	const ret1X = (tipPos.x * rootRadius * rcMINUSrd + tipPos.y * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;
	const ret1Y = (tipPos.y * rootRadius * rcMINUSrd - tipPos.x * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;
	const ret2X = (tipPos.x * rootRadius * rcMINUSrd - tipPos.y * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;
	const ret2Y = (tipPos.y * rootRadius * rcMINUSrd + tipPos.x * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;

	return [new Vector2(ret1X, ret1Y).add(rootPos), new Vector2(ret2X, ret2Y).add(rootPos)];
});

const tipOffset = computed(() => Number(getParameterValue(props.params, "accessory1_offsetY")));

const calcTipJointPoint = computed(() => (vec: Vector2, rootPos: Vector2, relativeTipPos: Vector2, rootSize: number): Vector2 => {
	const originVec: Vector2 = vec.sub(rootPos);
	const tipPos = relativeTipPos;
	const rootRadius = rootSize / 2;

	const jNumerator = originVec.x * originVec.y * tipPos.y - originVec.y * originVec.y * tipPos.x - originVec.x * rootRadius * rootRadius;
	const jDenominator = originVec.x * originVec.x + originVec.y * originVec.y;

	const retX = -jNumerator / jDenominator;
	let retY: number = 0;
	if (originVec.y === 0) {
		retY = tipPos.y;
	}
	else {
		retY = rootRadius * rootRadius / originVec.y + (originVec.x * jNumerator) / (originVec.y * jDenominator);
	}

	return new Vector2(retX, retY).add(center.value);
});

const handPath = computed((): string => {
	// let retPath: string = `M ${center.x - rootSize.value / 2} ${center.y} `;
	// retPath += `a ${rootSize.value / 2} ${rootSize.value / 2} 0 1 0 ${rootSize.value} 0`;

	const rootJointPos: Vector2[] = calcRootJointPoint.value(rootSize.value, center.value, tipSize.value, relativeTipPos.value);

	let retPath: string = `M ${rootJointPos[1].x} ${rootJointPos[1].y} `;
	retPath += `A ${rootSize.value / 2} ${rootSize.value / 2} 0 ${(rootSize.value < tipSize.value) ? 0 : 1} 1 ${rootJointPos[0].x} ${rootJointPos[0].y} `;

	const tipJoinPos: Vector2[] = [];

	for (let i = 0; i < rootJointPos.length; i++) {
		tipJoinPos.push(calcTipJointPoint.value(rootJointPos[i], center.value, relativeTipPos.value, rootSize.value));
	}

	retPath += `L ${tipJoinPos[0].x} ${tipJoinPos[0].y} `;
	retPath += `A ${tipSize.value / 2} ${tipSize.value / 2} 0 ${(rootSize.value > tipSize.value) ? 0 : 1} 1 ${tipJoinPos[1].x} ${tipJoinPos[1].y} `;
	retPath += `Z`;

	// retPath += ` M ${rootJointPos[0].x} ${rootJointPos[0].y} L ${tipJoinPos[0].x} ${tipJoinPos[0].y} M ${rootJointPos[1].x} ${rootJointPos[1].y} L ${tipJoinPos[1].x} ${tipJoinPos[1].y}`;

	return retPath;
});

const tipMarkColor = computed(() => getParameterValue(props.params, "accessory1_color"));
const tipMarkOffset = computed(() => Number(getParameterValue(props.params, "accessory1_offsetY")));
const tipMarkLength = computed(() => Number(getParameterValue(props.params, "accessory1_length")));
const tipMarkWidth = computed(() => Number(getParameterValue(props.params, "accessory1_lineWidth")));

const debugPos = computed(() => {
	const offset = tipMarkOffset.value;
	const markTipPos = relativeTipPos.value.sub(new Vector2(offset * Math.cos(angle.value), offset * Math.sin(angle.value)));
	return markTipPos.add(center.value);
});

const debugPos2 = computed(() => {
	const length = tipMarkLength.value;
	const offset = tipMarkOffset.value;
	const markRootPos = relativeTipPos.value.sub(new Vector2((offset + length) * Math.cos(angle.value), (offset + length) * Math.sin(angle.value)));
	return markRootPos.add(center.value);
});

const tipMarkPath = computed(() => {
	const length = tipMarkLength.value;
	const width = tipMarkWidth.value;
	const offset = tipMarkOffset.value;
	const markRootPos = relativeTipPos.value.sub(new Vector2((offset + length) * Math.cos(angle.value), (offset + length) * Math.sin(angle.value))).add(center.value);
	const markTipPos = relativeTipPos.value.sub(new Vector2(offset * Math.cos(angle.value), offset * Math.sin(angle.value)));

	const rootJointPos: Vector2[] = calcRootJointPoint.value(width / 2, markRootPos, width / 2, markTipPos);
	// console.log(rootJointPos);

	const circleRadius: number = width / 2;

	let retPath: string = `M ${rootJointPos[1].x} ${rootJointPos[1].y} `;
	retPath += `A ${circleRadius / 2} ${circleRadius / 2} 0 1 1 ${rootJointPos[0].x} ${rootJointPos[0].y} `;

	const tipJoinPos: Vector2[] = [];

	for (let i = 0; i < rootJointPos.length; i++) {
		tipJoinPos.push(calcTipJointPoint.value(rootJointPos[i], markRootPos, markTipPos, width / 2));
	}

	retPath += `L ${tipJoinPos[0].x} ${tipJoinPos[0].y} `;
	retPath += `A ${circleRadius / 2} ${circleRadius / 2} 0 0 1 ${tipJoinPos[1].x} ${tipJoinPos[1].y} `;
	retPath += `Z`;

	return retPath;
});

onBeforeMount(() => setInterval(() => time.update(), 16));
</script>

<template>
	<path :d="handPath" stroke-opacity="0" stroke="red" :fill="baseColor" />
	<circle :r="accessoryRootSize / 2" :fill="accessoryRootColor" :cx="center.x" :cy="center.y" />
	<path :d="tipMarkPath" stroke-opacity="0" :fill="tipMarkColor" />

	<rect v-if="isRectView" :x="rectX + halfClockSize" :y="rectY + halfClockSize" :width="rectWidth" :height="rectHeight" fill-opacity="0" stroke-width="1" stroke-opacity="1" color="black" stroke="black" stroke-dasharray="3 3"></rect>
</template>

<style scoped lang="scss">
/* style here */
</style>