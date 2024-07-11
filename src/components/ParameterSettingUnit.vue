<script setup lang="ts">
import { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import GcSelectInput from './modules/GcSelectInput.vue';
import { historiesStore } from '@/stores/histories';
import type { InputDataContents } from '@/common/scripts/InputDataContents';
import { ClockOperationContent } from '@/common/scripts/related-operation-history/ClockOperationContent';
import { layersStore } from '@/stores/layers';
import { webFonts } from '@/common/scripts/fonts/webFonts';
import ParameterUnitSlider from './setting-units/ParameterUnitSlider.vue';
import ParameterUnitColor from "@/components/setting-units/ParameterUnitColor.vue";
import ParameterUnitSelect from "@/components/setting-units/ParameterUnitSelect.vue"

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
	param.reactiveValue = updateValue;
}

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
					<ParameterUnitSlider :param="param" @update-parameter="(value) => onUpdateParameter(param, value)" @get-history="(before, after, isChangeable) => onGetHistory(param, before, after, isChangeable)" />
				</div>
				<div v-else-if="param.type === 'color'">
					<ParameterUnitColor :param="param" @update-parameter="(value) => onUpdateParameter(param, value)" @get-history="(before, after) => onGetHistory(param, before, after)" />
				</div>
				<div v-else-if="param.type === 'select'">
					<ParameterUnitSelect :param="param" @update-parameter="(value) => onUpdateParameter(param, value)" @get-history="(before, after) => onGetHistory(param, before, after)" />
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