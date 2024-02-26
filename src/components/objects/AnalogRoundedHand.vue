<script setup lang="ts">
import { computed, onBeforeUpdate, ref, type Ref } from 'vue';
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
	return new Vector2(length.value * Math.cos(angle.value), length.value * Math.sin(angle.value)).sub(center);
});

const calcRootJointPoint = computed((): Vector2[] => {
	const tipPos = relativeTipPos.value;
	const p2PLUSq2 = tipPos.x * tipPos.x + tipPos.y * tipPos.y;
	const rcMINUSrd = rootSize.value - tipSize.value;
	const innerSqrt = p2PLUSq2 - rcMINUSrd * rcMINUSrd;
	
	const a1 = (tipPos.x * (rootSize.value / 2) * rcMINUSrd + tipPos.y * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;
	const b1 = (tipPos.y * (rootSize.value / 2) * rcMINUSrd - tipPos.x * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;
	const a2 = (tipPos.x * (rootSize.value / 2) * rcMINUSrd - tipPos.y * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;
	const b2 = (tipPos.y * (rootSize.value / 2) * rcMINUSrd + tipPos.x * (rootSize.value / 2) * innerSqrt) / p2PLUSq2;

	return [new Vector2(a1, a2).add(center), new Vector2(a2, b2).add(center)];
});

const calcTipJointPoint = computed(() => (vec: Vector2): Vector2 => {
	
});

onBeforeUpdate(() => time.update());
</script>

<template>
	<div>
		<svg :view-box="`0 0 300 300`" :width="300" :height="300">
			<!-- <circle :cx="center.x" :cy="center.y" stroke="black" stroke-opacity="1" :r="rootSize" fill-opacity="0" /> -->
			<path :d="`
			M ${center.x - rootSize / 2} ${center.y}   a ${rootSize / 2} ${rootSize / 2} 0 1 0 ${rootSize} 0   `" fill="black" stroke-opacity="1" stroke="black" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
// style here
</style>