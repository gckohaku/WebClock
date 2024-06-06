<script setup lang="ts">
import type { Prop } from 'vue';
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import GcSelectInput from './modules/GcSelectInput.vue';
import { DotsOnCircleParameters } from '@/common/scripts/input_data_contents/DotsOnCircleParameters';
import { historiesStore } from '@/stores/histories';
import type { InputDataContents } from '@/common/scripts/InputDataContents';
import { ClockOperationContent } from '@/common/scripts/related-operation-history/ClockOperationContent';
import { layersStore } from '@/stores/layers';

export interface Props {
	parameters: SingleUnitParameters,
	sliderLength?: string | number,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "100px",
});

const emit = defineEmits<{
	"update:modelValue": [value: void]
}>();

const histories = historiesStore();
const layers = layersStore();

const onUpdateParameter = (param: InputDataContents, updateValue: string): void => {
	histories.addOperation(new ClockOperationContent("change", layers.currentSelect, param.propertyCode, param.reactiveValue, updateValue));
	param.reactiveValue = updateValue;
}
</script>

<template>
	<template v-for="item in props.parameters">
		<template v-if="(typeof item !== 'string' && typeof item !== 'number' && typeof item !== 'function')">
			<template v-for="param in item">
				<p>{{ param.heading }} {{ param.reactiveValue }}</p>
				<div v-if="param.type === 'slider'">
					<GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue" :slider-length="props.sliderLength" @update:model-value="$emit('update:modelValue', onUpdateParameter(param, $event))" />
				</div>
				<div v-else-if="param.type === 'color'">
					<GcInputColorPicker v-model="param.reactiveValue" @update:model-value="emit('update:modelValue', onUpdateParameter(param, $event))" />
				</div>
				<div v-else-if="param.type === 'select'">
					<GcSelectInput v-model="param.reactiveValue" @update:model-value="emit('update:modelValue', onUpdateParameter(param, $event))">
						<option value="" disabled>Please Select</option>
						<template v-if="Array.isArray(param.selectOptions)">
							<option v-for="opt in param.selectOptions" :value="opt">{{ opt }}</option>
						</template>
						<template v-else>
							<optgroup v-for="(group, key) in param.selectOptions" :label="key.toString()">
								<option v-for="opt in group" :value="`${key}:${opt}`">{{ opt }}</option>
							</optgroup>
						</template>
					</GcSelectInput>
				</div>
				<p v-else>まだ制作していないタイプの設定だよ</p>
			</template>
		</template>
	</template>
</template>

<style scoped lang="scss"></style>