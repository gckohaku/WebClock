<script setup lang="ts">
import type { Prop } from 'vue';
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';

export interface Props {
	parameters: SingleUnitParameters,
	sliderLength?: string,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "100px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>();
</script>

<template>
	<template v-for="item in props.parameters">
		<template v-if="(typeof item !== 'string')">
			<template v-for="param in item">
				<p>{{ param.heading }}</p>
				<div v-if="param.type === 'slider'">
					<GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue" :slider-length="props.sliderLength" @update:model-value="$emit('update:modelValue', param.reactiveValue = $event); console.log(param.reactiveValue);" />
				</div>
				<div v-else-if="param.type === 'color'">
					<GcInputColorPicker v-model="param.reactiveValue" @update:model-value="emit('update:modelValue', param.reactiveValue = $event);" />
				</div>
				<p v-else>まだ制作していないタイプの設定だよ</p>
			</template>
		</template>
	</template>
</template>

<style scoped lang="scss"></style>