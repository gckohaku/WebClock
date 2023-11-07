<script setup lang="ts">
import SvgCircleDashed from '@/components/svg-circles/SvgCircleDashed.vue';
import SvgCircleDotted from '@/components/svg-circles/SvgCircleDotted.vue';
</script>

<template>
	<div>
		<svg view-box="0 0 300 300" width="300" height="300">
			<SvgCircleDotted :cx="150" :cy="150" :r="'70'" :dot-size="'15'" :min-dot-space="'30'" :max-dot-space="'32'" dot-value="12" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>