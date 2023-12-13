<script setup lang="ts">
import { ref, type Ref } from 'vue';

export interface Props {
	open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	open: false,
});

const emit = defineEmits<{
	"update:modelValue": [value: boolean]
}>();
</script>

<template>
	<div class="wrapper" :class="props.open ? 'details-open' : ''">
		<div class="summary-container">

			<button class="details-button" @click="$emit('update:modelValue', !props.open)">▼</button>
			<slot name="summary">

			</slot>
		</div>
		<div class="details-container">
			<slot name="details">
			</slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
$circleLikeAnimation: cubic-bezier(0, .55, .45, 1);

.wrapper {
	display: grid;
	grid-template-rows: min-content 0fr;
	transition: all 0.3s $circleLikeAnimation;

	.details-button {
		font-size: 1rem;
		padding: 0;
		border: none;
		background-color: transparent;
		// transform: rotate(-90deg);
		rotate: -90deg;
		transition: all 0.3s $circleLikeAnimation;
	}

	&.details-open {
		grid-template-rows: min-content 1fr;

		.details-button {
			// transform: rotate(0deg);
			rotate: 0deg;
		}
	}

	.details-container {
		overflow: hidden;

	}
}
</style>