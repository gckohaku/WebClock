<script setup lang="ts">

export interface Props {
	cx: string | number,
	cy: string | number,
	r?: string | number,
	lineWidth?: string | number,
	color?: string,
}

const props = withDefaults(defineProps<Props>(), {
	r: "100",
	lineWidth: "3",
	color: "black",
});

</script>

<template>
	<circle :cx="props.cx" :cy="props.cy" :r="props.r" :stroke-width="props.lineWidth" fill-opacity="0" stroke-opacity="1" :stroke="props.color" />
</template>

<style scoped lang="scss">
/* style here */
</style>