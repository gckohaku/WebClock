<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

export interface Props {
	name?: string;
	id?: string;
	modelValue: string;
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
	id: "",
})

const emit = defineEmits<{
	"update:modelValue": [value: string],
	"change": [before: string, after: string],
}>();

let beforeColor: string = "";

const onInputColor = (e: Event): void => {
	if (beforeColor === "") {
		beforeColor = props.modelValue;
	}
	
	emit('update:modelValue', (e.target as HTMLInputElement).value);
}

const onChangeColor = (e: Event): void => {
	emit("change", beforeColor, (e.target as HTMLInputElement).value);
	beforeColor = "";
}
</script>

<template>
	<div class="color-picker-wrapper">
		<input type="color" class="color-picker" :value="modelValue" @input="e => onInputColor(e)" @change="e => onChangeColor(e)" />
		<input type="text" class="color-text" :value="modelValue" @input="e => onInputColor(e)" @change="e => onChangeColor(e)" />
	</div>
</template>

<style scoped lang="scss">
.color-picker-wrapper {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	.color-picker,
	.color-text {
		padding: 0;
	}

	.color-picker {
		border: 1px solid var(--colorPickerBorderColor) !important;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		padding: 0;
		height: 1rem;
		overflow: clip;

		&::-webkit-color-swatch-wrapper {
			padding: 0;
			
		}

		&::-webkit-color-swatch {
			height: 100%;
			border-width: 0;
			
		}

	}

	.color-text {
		width: 4rem;
		font-size: 12px;
		border: 2px solid var(--colorTextBorderColor);
		border-radius: 5px;
		padding: 0;
		outline: none;
		text-align: center;
	}
}
</style>