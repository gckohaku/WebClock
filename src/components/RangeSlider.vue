<script setup lang="ts">
export interface Props {
	name: string,
	id: string,
	min?: string
	max?: string,
	step?: string,
	modelValue: number,
};

const props = withDefaults(defineProps<Props>(), {
	min: "0",
	max: "100",
	step: "1",
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>();
</script>

<template>
	<input type="range" class="slider" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>

<style scoped lang="scss">
.slider {
	// todo: ベンダープレフィックスが galaxy のブラウザでちゃんと適用されているかを確認する
	appearance: none;
	outline: none;
	cursor: pointer;
	width: 50%;
	height: 16px;
	background-color: lightgrey;
	border-radius: 10px;
}
</style>