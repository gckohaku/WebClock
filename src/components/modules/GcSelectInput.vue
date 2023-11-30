<script setup lang="ts">
export interface Props {
	name?: string,
	id?: string,
	modelValue: any,
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
	id: "",
});

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>();
</script>

<template>
	<div class="select-wrapper">
		<select name="" id="" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
			<slot></slot>
		</select>
	</div>
	<p>now: "{{ props.modelValue }}"</p>
</template>

<style scoped lang="scss">
/* style here */
</style>