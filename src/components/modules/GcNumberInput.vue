<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';

const firstClickHoldWaitTime = 250;
const consecutiveIntervalTime = 40;

let currentTimeoutId: number = -1;

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
	"update:modelValue": [value: string],
	"update:start": [value: string],
	"update:end": [value: string, isChangeable: boolean],
	"update:usingSpin": [void],
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

const isChangingBySpin: Ref<boolean> = ref(false);

const inputNumberValueUp = (value: string) => {
	emit('update:start', value);
	emit("update:usingSpin");
	const newValue = increaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputUp(newValue);
	}, firstClickHoldWaitTime);
};

const inputNumberValueDown = (value: string): void => {
	emit('update:start', value);
	emit("update:usingSpin");
	const newValue = decreaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputDown(newValue);
	}, firstClickHoldWaitTime);
}

const consecutiveInputUp = (value: string): void => {
	emit("update:usingSpin");
	const newValue = increaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputUp(newValue);
	}, consecutiveIntervalTime);
}

const consecutiveInputDown = (value: string): void => {
	emit("update:usingSpin");
	const newValue = decreaseStringNumber(value);
	setModelValue(newValue);

	currentTimeoutId = setTimeout(() => {
		consecutiveInputDown(newValue);
	}, consecutiveIntervalTime);
}

const clearCurrentTimeout = () => {
	if (currentTimeoutId === -1) {
		return;
	}

	clearTimeout(currentTimeoutId);
	currentTimeoutId = -1;
	emit("update:end", props.modelValue, true);
}

const isWritableInput: Ref<boolean> = ref(false);
const isEditingInput: Ref<boolean> = ref(false);
const beforeChangeValue: Ref<string> = ref("");

const onInput = (e: Event) => {
	const dataValue = (e.target as HTMLInputElement).value;

	console.log(props.modelValue, dataValue);

	if (!isEditingInput.value && dataValue !== props.modelValue) {
		onNumberChangeStart();
	}
	emit("update:modelValue", dataValue);
}

const onNumberChangeStart = () => {
	isEditingInput.value = true
	beforeChangeValue.value = props.modelValue;
	emit('update:start', props.modelValue);
}

const onNumberChangeEnd = (e: Event) => {
	isEditingInput.value = false;
	isWritableInput.value = false;
	// const dataValue = (e.target as HTMLInputElement).value;



	if (props.modelValue !== beforeChangeValue.value && props.modelValue !== "") {
		if (props.modelValue === "-0") {
			emit("update:modelValue", "0");
			emit('update:end', "0", false);
		}
		else {
			emit('update:end', props.modelValue, false);
		}
	}
}
</script>

<template>
	<div class="number-input-wrapper">
		<div class="number-input-container">
			<input class="input-area" type="number" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" :readonly="!isWritableInput" @input="(e) => onInput(e)" @change="(e) => onNumberChangeEnd(e as InputEvent)" @dblclick="isWritableInput = true" />
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
	width: 4rem;
	height: 1rem;
	border: 2px solid hsl(190deg, 100%, 30%);
	border-radius: 5px;
	overflow: clip;

	.input-area {
		box-sizing: border-box;
		appearance: none;
		border: none;
		outline: none;
		text-align: right;

		width: 2rem;
		background-color: white;
		font-size: 12px;

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
			width: 1rem;
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