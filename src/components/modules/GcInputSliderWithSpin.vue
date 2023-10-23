<script setup lang="ts">
import { onMounted } from 'vue';
import GcRangeSlider from './GcRangeSlider.vue';
import GcNumberInput from './GcNumberInput.vue';

export interface Props {
	name?: string,
	id?: string,
	min?: string
	max?: string,
	step?: string,
	modelValue: any,
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
	id: "",
	min: "0",
	max: "100",
	step: "1",
});

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>();

onMounted(() => {
	if (parseInt(props.modelValue) < parseInt(props.min)) {
		emit('update:modelValue', props.min);
		
	}
	else if (parseInt(props.modelValue) > parseInt(props.max)) {
		emit('update:modelValue', props.max);
	}
});
</script>

<template>
	<div class="number-input-container">
		<GcRangeSlider class="slider" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" />
		<GcNumberInput class="number" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"></GcNumberInput>
	</div>
</template>

<style scoped lang="scss">
.number-input-container {
	display: flex;
	column-gap: .5rem;
	align-items: center;
}
</style>