<script setup lang="ts">
import { ref, type Ref } from 'vue';
import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import ParameterSettingSidebar from '@/components/ParameterSettingSidebar.vue';
import { DotsOnCircleParameters } from '@/common/scripts/input_data_contents/DotsOnCircleParameters';
import { dotsOnCircleParamApplicability } from '@/common/scripts/object_parameters/dotsOnCircle';
import { type ClockProperties } from '@/common/ClockProperties';
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters'
import SvgCircleSolid from '@/components/svg-circles/SvgCircleSolid.vue';
import { InputDataContents } from '@/common/scripts/InputDataContents';
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';

const clockSize = 300;
const halfClockSize = clockSize / 2;

const partsList: typeof SingleUnitParameters[] = [DotsOnCircleParameters];
const currentParameterList: Ref<ClockPartsParameters> = ref([]);
const currentSelect: Ref<string> = ref("");

const addList = (data: string): void => {
	currentParameterList.value.push(Object.assign({}, new (partsList.find((el) => el.heading === data) ?? SingleUnitParameters)()));
}

const removeList = (index: number): void => {
	currentParameterList.value.splice(index, 1);
}

const getParameterValue = (singleUnit: SingleUnitParameters, code: ParametersProperties): string => {
	return singleUnit.parameters.find(el => el.propertyCode === code)?.reactiveValue ?? "error";
}
</script>

<template>
	<p>currentSelect: {{ currentSelect }}</p>
	<button @click="addList(currentSelect)">add</button>
	<GcSelectInput name="" id="" v-model="currentSelect">
		<option disabled value="">please choice</option>
		<option v-for="item in partsList" :value="item.heading">{{ item.heading }}</option>
	</GcSelectInput>

	<template v-for="(val, index) in currentParameterList">
		<details disable>
			<summary>{{ val.dynamicHeading }}<button @click="removeList(index)">remove</button></summary>
			<ParameterSettingSidebar :parameters="val" slider-length="200" />
		</details>
		
	</template>

	<div>
		<svg :view-box="`0 0 ${clockSize} ${clockSize}`" :width="clockSize" :height="clockSize">
			<SvgCircleSolid v-for="val in currentParameterList" :color="getParameterValue(val, 'color')" :cx="Number(getParameterValue(val, 'offsetX')) + halfClockSize" :cy="Number(getParameterValue(val, 'offsetY')) + halfClockSize" :r="Number(getParameterValue(val, 'size')) / 2" :line-width="getParameterValue(val, 'width')" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>