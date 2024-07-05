<script setup lang="ts">
import { ref, type Ref } from 'vue';
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import GcSelectInput from './modules/GcSelectInput.vue';
import { historiesStore } from '@/stores/histories';
import type { InputDataContents } from '@/common/scripts/InputDataContents';
import { ClockOperationContent } from '@/common/scripts/related-operation-history/ClockOperationContent';
import { layersStore } from '@/stores/layers';
import { webFonts } from '@/common/scripts/fonts/webFonts';
import ParameterUnitSlider from './setting-units/ParameterUnitSlider.vue';

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

// const beforeUpdateValue: Ref<string> = ref("");

const onUpdateParameter = (param: InputDataContents, updateValue: string): void => {
	// histories.addOperation(new ClockOperationContent("change", layers.currentSelect, param.propertyCode, param.reactiveValue, updateValue));
	param.reactiveValue = updateValue;
}

// const onGetHistoryAtNumberSpin = (param: InputDataContents, updateValue: string, isChangeable: boolean = false): void => {
// 	if (histories.inquiryChangeable(layers.currentSelect, param.propertyCode)) {
// 		histories.changeLastData(updateValue);
// 		return;
// 	}
// 	histories.addOperation(new ClockOperationContent("change", layers.currentSelect, param.propertyCode, beforeUpdateValue.value, updateValue), isChangeable);
// }

const onGetHistory = (param: InputDataContents, beforeValue: string, updateValue: string, isChangeable?: boolean): void => {
	if (histories.inquiryChangeable(layers.currentSelect, param.propertyCode)) {
		histories.changeLastData(updateValue);
		return;
	}

	console.log(beforeValue, updateValue, isChangeable);

	histories.addOperation(new ClockOperationContent("change", layers.currentSelect, param.propertyCode, beforeValue, updateValue), isChangeable);
}
</script>

<template>
	<template v-for="item in props.parameters">
		<template v-if="(typeof item !== 'string' && typeof item !== 'number' && typeof item !== 'function')">
			<template v-for="param in item">
				<p>{{ param.heading }} {{ param.reactiveValue }}</p>
				<div v-if="param.type === 'slider'">
					<!-- <GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue" :slider-length="props.sliderLength" @update:model-value="$emit('update:modelValue', onUpdateParameter(param, $event))" @update:start="(e) => { beforeUpdateValue = e }" @update:end="(value, isChangeable) => { onGetHistoryAtNumberSpin(param, value, isChangeable) }" @update:using-spin="histories.sendUsingSpinSignal" /> -->

					<ParameterUnitSlider :param="param" @update-parameter="(value) => onUpdateParameter(param, value)" @get-history="(before, after, isChangeable) => onGetHistory(param, before, after, isChangeable)" />

				</div>
				<div v-else-if="param.type === 'color'">
					<GcInputColorPicker v-model="param.reactiveValue" @update:model-value="emit('update:modelValue', onUpdateParameter(param, $event))" @change="(before, after) => onGetHistory(param, before, after)" />
				</div>
				<div v-else-if="param.type === 'select'">
					<GcSelectInput v-model="param.reactiveValue" @update:model-value="(value, before) => { emit('update:modelValue', onUpdateParameter(param, value)); onGetHistory(param, before!, value) }">
						<option value="" disabled>Please Select</option>
						<template v-if="Array.isArray(param.selectOptions)">
							<option v-for="opt in param.selectOptions" :value="opt.value">{{ opt.viewText }}</option>
						</template>
						<template v-else>
							<optgroup v-for="(group, key) in param.selectOptions" :label="key.toString()">
								<option v-for="opt in group" :value="opt.value">{{ opt.viewText }}</option>
							</optgroup>
						</template>
					</GcSelectInput>
				</div>
				<div v-else-if="param.type === 'font'">
					<GcSelectInput v-model="param.reactiveValue" @update:model-value="(value, before) => { emit('update:modelValue', onUpdateParameter(param, value)); onGetHistory(param, before!, value) }">
						<option v-for="(font, key) in webFonts" :value="key">{{ key }}</option>
					</GcSelectInput>
				</div>
				<p v-else>まだ制作していないタイプの設定だよ</p>
			</template>
		</template>
	</template>
</template>

<style scoped lang="scss"></style>