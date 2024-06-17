<script setup lang="ts">
export interface Props {
	name?: string,
	id?: string,
	modelValue: string,
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
	id: "",
});

const emit = defineEmits<{
	"update:modelValue": [value: string, before?: string]
}>();
</script>

<template>
	<div class="select-wrapper">
		<select name="" id="" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value, modelValue)">
			<slot></slot>
		</select>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>