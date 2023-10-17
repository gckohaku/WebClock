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
	<input class="num-in" type="number" :name="props.name" :id="props.id" :min="props.min" :max="props.max" :step="props.step" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<style scoped lang="scss">
.num-in {
	appearance: none;
	border: none;
	outline: none;
	background-color: lightcyan;

	&::-webkit-inner-spin-button {
		appearance: none;
	}
}
</style>