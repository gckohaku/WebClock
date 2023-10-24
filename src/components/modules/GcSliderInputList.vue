<script setup lang="ts">
import type { Prop } from 'vue';
import GcInputSliderWithSpin from './GcInputSliderWithSpin.vue';
import { InputDataContents } from '@/common/scripts/InputDataContents';

export interface Props {
	lists: Array<InputDataContents>,
	sliderLength?: string,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "50px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>();


</script>

<template>
	<div class="slider-input-list-wrapper">
		<div class="slider-input-list-container">
			<div v-for="index in props.lists?.length">
				<p>{{ $props.lists![index - 1].heading }}:</p>
				<GcInputSliderWithSpin :name="props.lists![index - 1].name" :id="props.lists![index - 1].id" :min="props.lists![index - 1].min" :max="props.lists![index - 1].max" :step="props.lists![index - 1].step" :model-value="props.lists![index - 1].reactiveValue.value" :slider-length="($props.sliderLength as string)" @update:model-value="$emit('update:modelValue', props.lists![index - 1].reactiveValue.value = $event)"></GcInputSliderWithSpin>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.slider-input-list-wrapper {
	// position: absolute;
	// top: 0;
	padding: 3px;
	width: 360px;
	background-color: white;
	border: var(--numberInputSpinBorderColor) solid 2px;
	border-radius: 10px;

	.slider-input-list-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		// justify-content: center;
		align-items: center;
		padding-block: 30px;
		max-height: 300px;
		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #d8d8d8;
			border-radius: 10px;
		}
	}
}
</style>