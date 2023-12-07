<script setup lang="ts">
import { computed } from 'vue';

const firstClickHoldWeitTime = 200;
const consecutiveIntervalTime = 40;

let currentTimeoutId: number = 0;

export interface Props {
	name?: string,
	id?: string,
	min?: string
	max?: string,
	step?: string,
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
	"update:modelValue": [value: string]
}>();

const increaseStringNumber = (value: string): string => {
	return Math.min(parseInt(value) + parseInt(props.step), parseInt(props.max)).toString();
}

const decreaseStringNumber = (value: string): string => {
	return Math.max(parseInt(value) - parseInt(props.step), parseInt(props.min)).toString();
}

const setModelValue = (value: string): void => {
	emit('update:modelValue', value);
}

const inputNumberValueUp = (value: string) => {
	const newValue = increaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputUp(newValue);
	}, firstClickHoldWeitTime);
};

const inputNumberValueDown = (value: string): void => {
	const newValue = decreaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputDown(newValue);
	}, firstClickHoldWeitTime);
}

const consecutiveInputUp = (value: string): void => {
	const newValue = increaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputUp(newValue);
	}, consecutiveIntervalTime);
}

const consecutiveInputDown = (value: string): void => {
	const newValue = decreaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputDown(newValue);
	}, consecutiveIntervalTime);
}

const clearCurrentTimeout = () => {
	clearTimeout(currentTimeoutId);
}
</script>

<template>
	<div class="number-input-wrapper">
		<div class="number-input-container">
			<input class="input-area" type="number" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
			<div class="inner-spin">
				<div class="spin-upper" @mousedown="inputNumberValueUp(modelValue)" @touchstart="inputNumberValueUp(modelValue)" @mouseup="clearCurrentTimeout" @touchend="clearCurrentTimeout" @mouseout="clearCurrentTimeout"><span class="material-symbols-outlined">add</span></div>
				<div class="spin-lower" @mousedown="inputNumberValueDown(modelValue)" @touchstart="inputNumberValueDown(modelValue)" @mouseup="clearCurrentTimeout" @touchend="clearCurrentTimeout" @mouseout="clearCurrentTimeout"><span class="material-symbols-outlined">remove</span></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.number-input-container {
	$spinBorderWidth: 2px;

	display: flex;
	width: 5rem;
	height: 1.5rem;
	border: 2px solid hsl(190deg, 100%, 30%);
	border-radius: 10px;
	overflow: clip;

	.input-area {
		box-sizing: border-box;
		appearance: none;
		border: none;
		outline: none;

		width: 2rem;
		background-color: white;

		&::-webkit-inner-spin-button {
			appearance: none;
		}
	}

	.inner-spin {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		user-select: none;

		.spin-upper,
		.spin-lower {
			box-sizing: border-box;
			cursor: pointer;
			width: 1.5rem;
			height: 100%;
			color: var(--numberInputSpinFontColor);
			background-color: var(--numberInputSpinBgColor);
			border-left: var(--numberInputSpinBorderColor) solid 1px;

			// 子要素の位置を揃えたい
			display: flex;
			align-items: center;
			justify-content: center;

			&:hover {
				background-color: var(--numberInputSpinHoverColor);
			}

			&:active {
				background-color: var(--numberInputSpinActiveColor);
			}

			&:active:not(:hover) {
				background-color: var(--numberInputSpinBgColor);
				;
			}

			.material-symbols-outlined {
				font-size: 1.25rem;
			}
		}
	}
}
</style>