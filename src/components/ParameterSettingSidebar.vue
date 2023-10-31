<script setup lang="ts">
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { ref } from 'vue';
import type { UnwrapNestedRefs } from 'vue';
import type { ClockProperties } from '@/common/ClockProperties';
import { InputDataContents } from '@/common/scripts/InputDataContents';

export interface Props {
	parameters: ClockProperties,
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
	<template v-for="item in props.parameters">
		<template v-for="param in item">
			<div v-if="param">
				<div v-if="param.constructor.name === 'InputDataContents'">
					<p>{{ (param as InputDataContents).heading }}</p>
					<div v-if="(param as InputDataContents).type === 'slider'">
						<GcInputSliderWithSpin :name="(param as InputDataContents).name" :id="(param as InputDataContents).id" :max="(param as InputDataContents).max" :min="(param as InputDataContents).min" :step="(param as InputDataContents).step" :model-value="(param as InputDataContents).reactiveValue.value" :slider-length="($props.sliderLength as string)" @update:model-value="$emit('update:modelValue', (param as InputDataContents).reactiveValue.value = $event)" />
					</div>
					<div v-else-if="(param as InputDataContents).type === 'color'">
						<GcInputColorPicker v-model="(param as InputDataContents).reactiveValue.value" />
					</div>
					<div v-else-if="(param as InputDataContents).type === 'color'">
						<p>{{ param }}</p>
					</div>
					<p v-else>まだ制作していないタイプの設定だよ</p>
				</div>
				<div v-else>
					<p>{{ param }}</p>
				</div>
			</div>
		</template>
	</template>
</template>

<style scoped lang="scss">
/* style here */
</style>