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

const rootSize: Ref<number> = ref(10);
const tipSize: Ref<number> = ref(5);
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
	
	const ret1X = (tipPos.x * (rootSize.value / 2) * rcMINUSrd + tipPos.y * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;
	const ret1Y = (tipPos.y * (rootSize.value / 2) * rcMINUSrd - tipPos.x * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;
	const ret2X = (tipPos.x * (rootSize.value / 2) * rcMINUSrd - tipPos.y * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;
	const ret2Y = (tipPos.y * (rootSize.value / 2) * rcMINUSrd + tipPos.x * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;

	return [new Vector2(ret1X, ret1Y).add(center), new Vector2(ret2X, ret2Y).add(center)];
});

const calcTipJointPoint = computed(() => (vec: Vector2): Vector2 => {
	const tipPos = relativeTipPos.value;
	const jNumerator = vec.x * vec.y * tipPos.y - vec.y * vec.y * tipPos.x - vec.x * rootSize.value * rootSize.value;
	const jDenominator = vec.x * vec.x + vec.y * vec.y;

	const retX = -jNumerator / jDenominator;
	const retY = rootSize.value * rootSize.value / vec.y + (vec.x * jNumerator) / (vec.y * jDenominator);

	return new Vector2(retX, retY);
});

onBeforeMount(() => setInterval(() => time.update(), 16));

onMounted(() => {
	console.log(relativeTipPos.value);
});
</script>

<template>
	<div>
		<svg :view-box="`0 0 300 300`" :width="300" :height="300">
			<circle :cx="relativeTipPos.x + center.x" :cy="relativeTipPos.y + center.y" stroke="black" stroke-opacity="1" :r="5" fill-opacity="1" fill="black" />
			<path :d="`M ${center.x - rootSize / 2} ${center.y}   a ${rootSize / 2} ${rootSize / 2} 0 1 0 ${rootSize} 0   `" fill="black" stroke-opacity="1" stroke="black" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
// style here
</style>