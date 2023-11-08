<script setup lang="ts">
import SvgCircleDashed from '@/components/svg-circles/SvgCircleDashed.vue';
import SvgCircleDotted from '@/components/svg-circles/SvgCircleDotted.vue';
import SvgCircleSolid from '@/components/svg-circles/SvgCircleSolid.vue';
import SvgCircleFill from '@/components/svg-circles/SvgCircleFill.vue';
</script>

<template>
	<div>
		<svg view-box="0 0 300 300" width="300" height="300">
			<SvgCircleFill :cx="150" :cy="150" :r="'70'" color="darkred" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>