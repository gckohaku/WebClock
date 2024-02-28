<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUpdate, onMounted, ref, type Ref } from 'vue';
import { timeStore } from '@/stores/time';
import { Vector2 } from '@/common/scripts/defines/Vector2';
import { LineEquation } from '@/common/scripts/defines/LineEquation';
import { getNormalTimeValue } from '@/common/scripts/clockRelational';
import type { DateTime } from '@/common/scripts/DateTime';

const time = timeStore();

const second = computed(() => time.time.second);
const minute = computed(() => time.time.minute);
const hour = computed(() => time.time.hour);

const rootSize: Ref<number> = ref(30);
const tipSize: Ref<number> = ref(14);
const length: Ref<number> = ref(70);
const center: Vector2 = new Vector2(150, 150);

const angle = computed(() => getNormalTimeValue("digital:second", time.time as DateTime) * 2 * Math.PI);

const relativeTipPos = computed((): Vector2 => {
	return new Vector2(length.value * Math.cos(angle.value), length.value * Math.sin(angle.value));
});

const calcRootJointPoint = computed((): Vector2[] => {
	const tipPos = relativeTipPos.value;
	const p2PLUSq2 = tipPos.x * tipPos.x + tipPos.y * tipPos.y;
	const rcMINUSrd = rootSize.value - tipSize.value;
	const innerSqrt = p2PLUSq2 - rcMINUSrd * rcMINUSrd;
	const rootRadius = rootSize.value / 2;

	const ret1X = (tipPos.x * rootRadius * rcMINUSrd + tipPos.y * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;
	const ret1Y = (tipPos.y * rootRadius * rcMINUSrd - tipPos.x * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;
	const ret2X = (tipPos.x * rootRadius * rcMINUSrd - tipPos.y * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;
	const ret2Y = (tipPos.y * rootRadius * rcMINUSrd + tipPos.x * rootRadius * Math.sqrt(innerSqrt)) / p2PLUSq2;

	return [new Vector2(ret1X, ret1Y).add(center), new Vector2(ret2X, ret2Y).add(center)];
});

const calcTipJointPoint = computed(() => (vec: Vector2): Vector2 => {
	const originVec: Vector2 = vec.sub(center);
	const tipPos = relativeTipPos.value;
	const rootRadius = rootSize.value / 2;

	const jNumerator = originVec.x * originVec.y * tipPos.y - originVec.y * originVec.y * tipPos.x - originVec.x * rootRadius * rootRadius;
	const jDenominator = originVec.x * originVec.x + originVec.y * originVec.y;

	const retX = -jNumerator / jDenominator;
	const retY = rootRadius * rootRadius / originVec.y + (originVec.x * jNumerator) / (originVec.y * jDenominator);

	console.log(retX, retY);

	return new Vector2(retX, retY).add(center);
});

const handPath = computed((): string => {
	// let retPath: string = `M ${center.x - rootSize.value / 2} ${center.y} `;
	// retPath += `a ${rootSize.value / 2} ${rootSize.value / 2} 0 1 0 ${rootSize.value} 0`;

	const rootJointPos: Vector2[] = calcRootJointPoint.value;

	let retPath: string = `M ${rootJointPos[1].x} ${rootJointPos[1].y} `;
	retPath += `A ${rootSize.value / 2} ${rootSize.value / 2} 0 1 1 ${rootJointPos[0].x} ${rootJointPos[0].y} `;

	const tipJoinPos: Vector2[] = [];

	for (let i = 0; i < rootJointPos.length; i++) {
		tipJoinPos.push(calcTipJointPoint.value(rootJointPos[i]));
	}

	retPath += `L ${tipJoinPos[0].x} ${tipJoinPos[0].y} `;
	retPath += `A ${tipSize.value / 2} ${tipSize.value / 2} 0 0 1 ${tipJoinPos[1].x} ${tipJoinPos[1].y} `;
	retPath += `Z`

	return retPath;
});

onBeforeMount(() => setInterval(() => time.update(), 16));

onMounted(() => {

});
</script>

<template>
	<div>
		<svg :view-box="`0 0 300 300`" :width="300" :height="300">
			<path :d="handPath" stroke-opacity="1" stroke="black" fill="black" />
			<circle :cx="relativeTipPos.x + center.x" :cy="relativeTipPos.y + center.y" stroke="black" stroke-opacity="0" :r="5" fill-opacity="0.5" fill="red" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
// style here
</style>