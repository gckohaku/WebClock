<script setup lang="ts">
import { InputDataContents } from '@/common/scripts/InputDataContents';
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import type { UnwrapNestedRefs } from 'vue';

export interface Props {
	parameters: { [key: string]: { [key: string]: InputDataContents } },
	sliderLength?: string,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "50px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>();
</script>

<template>
	<div v-for="item in props.parameters">
		<div v-for="param in item">
			<p>{{ param.heading }}</p>
			<div v-if="param.type === 'slider'">
				<GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue.value" :slider-length="($props.sliderLength as string)" @update:model-value="$emit('update:modelValue', param.reactiveValue.value = $event)"></GcInputSliderWithSpin>
			</div>
			<div v-else>
				<p>まだ制作していないタイプの設定だよ</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>