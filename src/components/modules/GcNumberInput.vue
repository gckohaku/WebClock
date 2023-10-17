<script setup lang="ts">
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
</script>

<template>
	<div class="number-input-container">
		<input class="input-area" type="number" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
		<div class="inner-spin">
			<!-- 長押しに対応、関数化 (算出プロパティ化？) -->
			<div class="spin-upper" @click="$emit('update:modelValue', ($event.target as HTMLInputElement).value = Math.min(parseInt(modelValue) + parseInt(props.step), parseInt(props.max)).toString())">うえ</div>
			<div class="spin-lower" @click="$emit('update:modelValue', ($event.target as HTMLInputElement).value = Math.max(parseInt(modelValue) - parseInt(props.step), parseInt(props.min)).toString())">した</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.number-input-container {
	display: flex;
	background-color: lightcyan;

	.input-area {
		appearance: none;
		border: none;
		outline: none;

		&::-webkit-inner-spin-button {
			appearance: none;
		}


	}

	.inner-spin {
		display: flex;
		flex-direction: column;

		.spin-upper,
		.spin-lower {
			font-size: 8px;
			cursor: pointer;
		}
	}
}
</style>