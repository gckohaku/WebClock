<script setup lang="ts">
export interface Props {
	name: string,
	id: string,
	min?: string
	max?: string,
	step?: string,
	modelValue: any,
};

const props = withDefaults(defineProps<Props>(), {
	min: "0",
	max: "100",
	step: "1",
});
defineEmits(['update:modelValue']);
</script>

<template>
	<input type="range" class="slider" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<style scoped lang="scss">
// ブラウザごとのベーススタイルを解除
.slider {
	appearance: none;
	outline: none;
	background: transparent;
	cursor: pointer;
	width: 100%;
}
</style>