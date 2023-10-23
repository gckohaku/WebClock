<script setup lang="ts">
import GcInputSliderWithSpin from './GcInputSliderWithSpin.vue';

const props = defineProps({
	lists: Array<InputDataList>,
	values: Array<any>,
});

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>();
</script>

<template>
	<div v-for="index in props.lists?.length">
		<div v-if="$props.lists![index - 1] && values![index - 1]">
			<GcInputSliderWithSpin :name="props.lists![index - 1].name" :id="props.lists![index - 1].id" :min="props.lists![index - 1].min" :max="props.lists![index - 1].max" :step="props.lists![index - 1].step" :model-value="values![index - 1]" @update:model-value="$emit('update:modelValue', values![index - 1] = $event)"></GcInputSliderWithSpin>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>