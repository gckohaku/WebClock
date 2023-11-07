<script setup lang="ts">
export interface Props {
	cx: number,
	cy: number,
	r?: string,
	color?: string,
}

const props = withDefaults(defineProps<Props>(), {
	r: "100",
	color: "black",
});
</script>

<template>
	<circle :cx="props.cx" :cy="props.cy" :r="props.r" :fill="props.color" stroke-opacity="0" fill-opacity="1" />
</template>

<style scoped lang="scss">
/* style here */
</style>