<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { timeStore } from '@/stores/time';
import { Vector2 } from '@/common/scripts/defines/Vector2';

const time = timeStore();

const second = computed(() => time.time.second);
const minute = computed(() => time.time.minute);
const hour = computed(() => time.time.hour);

const rootSize: Ref<number> = ref(10);
const tipSize: Ref<number> = ref(5);
const length: Ref<number> = ref(70);
const center: Vector2 = new Vector2(150, 150);
</script>

<template>
	<div>
		<svg :view-box="`0 0 300 300`" :width="300" :height="300">
			<circle :cx="center.x" :cy="center.y" />
			<path :d="`
			M ${center.x - rootSize / 2} ${center.y}   a ${rootSize / 2} ${rootSize / 2} 0 1 0 ${rootSize} 0   `"
			fill="black" stroke-opacity="1" stroke="black" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
// style here
</style>