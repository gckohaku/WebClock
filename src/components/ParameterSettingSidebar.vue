<script setup lang="ts">
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { ref } from 'vue';
import type { UnwrapNestedRefs } from 'vue';
import type { ClockProperties } from '@/common/ClockProperties';
import { InputDataContents } from '@/common/scripts/InputDataContents';
import { get, set } from 'idb-keyval';
import { customStores } from '@/common/scripts/createStores';

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
	<template v-for="(item, outerKey) in props.parameters">
		<div v-for="(param, innerKey) in item">
			<div v-if="param">
				<div v-if="param.constructor.name === 'InputDataContents'">
					<p>{{ (param as InputDataContents).heading }}</p>
					<div v-if="(param as InputDataContents).type === 'slider'">
						<GcInputSliderWithSpin :name="(param as InputDataContents).name" :id="(param as InputDataContents).id" :max="(param as InputDataContents).max" :min="(param as InputDataContents).min" :step="(param as InputDataContents).step" :model-value="(param as InputDataContents).reactiveValue.value" :slider-length="($props.sliderLength as string)" @update:model-value="$emit('update:modelValue', (param as InputDataContents).reactiveValue.value = $event); set(`${outerKey}.${innerKey}`, $event, customStores['analogDotsOnCircleClock']); get('widths.ofHour', customStores['analogDotsOnCircleClock']).then((val) => console.log(val))" />
					</div>
					<div v-else-if="(param as InputDataContents).type === 'color'">
						<GcInputColorPicker v-model="(param as InputDataContents).reactiveValue.value" />
					</div>
					<p v-else>まだ制作していないタイプの設定だよ</p>
				</div>
				<div v-else>
					<p>{{ param }}</p>
				</div>
			</div>
		</div>
		<p>↓これが表示されていないと色々とおかしい</p>
		<GcInputSliderWithSpin :model-value="props.parameters.sizes?.ofHour" :slider-length="($props.sliderLength as string)" @update:model-value="$emit('update:modelValue', (props.parameters.sizes?.ofHour as InputDataContents).reactiveValue.value = $event)" />
	</template>
</template>

<style scoped lang="scss">
/* style here */
</style>