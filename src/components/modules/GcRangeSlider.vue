<script lang="ts" setup>

export interface Props {
	name?: string,
	id?: string,
	min?: string
	max?: string,
	step?: string,
	length: string | number,
	modelValue: string,
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
	id: "",
	min: "0",
	max: "100",
	step: "1",
});

const emit = defineEmits<{
	"update:modelValue": [value: string],
	"update:start": [value: string],
	"update:end": [value: string],
}>();


</script>

<template>
	<input type="range" class="slider" :style="{width: length}" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" @mousedown="$emit('update:start', ($event.target as HTMLInputElement).value)" @mouseup="$emit('update:end', ($event.target as HTMLInputElement).value)" />
</template>

<style scoped lang="scss">
.slider {
	$sliderWidth: 10px;
	$circleMargin: -4px;
	$circleBorderWidth: 2px;
	
	appearance: none;
	outline: none;
	cursor: pointer;
	height: $sliderWidth;
	background-color: var(--sliderTrackBgColor);
	padding-inline: $circleMargin;
	border-radius: $sliderWidth * 2;

	&::-webkit-slider-thumb {
		// -webkit-appearance: none;
		appearance: none;
		box-sizing: border-box;
		background-color: var(--sliderThumbBgColor);
		@include setSize($sliderWidth - $circleMargin * 2);
		border: var(--sliderThumbBorderColor) $circleBorderWidth solid;
		border-radius: 50%;
	}
}



// input[type="range"]::-webkit-slider-thumb,
// input[type="range"]::-moz-range-thumb {
// 	-webkit-appearance: none;
// 	appearance: none;
// 	background-color: aquamarine;
// 	height: 15px;
// }
</style>