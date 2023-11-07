<script setup lang="ts">
import SvgCircleDashed from '@/components/svg-circles/SvgCircleDashed.vue';
</script>

<template>
	<div>
		<svg view-box="0 0 300 300" width="300" height="300">
			<SvgCircleDashed :cx="150" :cy="150" :r="'70'" :line-width="'3'" :dash-length="'40'" :min-dash-space="'10'" :max-dash-space="'15'" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>