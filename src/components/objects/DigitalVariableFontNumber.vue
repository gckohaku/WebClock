<script setup lang="ts">
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import type { Circle } from '@/common/scripts/defines/Circle';
import { computed } from 'vue';

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
}

const props = defineProps<Props>();

const color = computed(() => props.params.getParameterValue("color"));
const size = computed(() => props.params.getParameterValue("size"));
</script>

<template>
	<text x="150" y="150" :fill="color" :font-size="size">test</text>
	<circle cx="70" cy="70" :fill="color" :r="size"></circle>
</template>

<style scoped lang="scss">
/* style here */
</style>