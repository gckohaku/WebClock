<script setup lang="ts">
import { ref, type Ref } from 'vue';
import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import GcDetails from '@/components/modules/GcDetails.vue';
import ParameterSettingSidebar from '@/components/ParameterSettingSidebar.vue';
import { DotsOnCircleParameters } from '@/common/scripts/input_data_contents/DotsOnCircleParameters';
import { dotsOnCircleParamApplicability } from '@/common/scripts/object_parameters/dotsOnCircle';
import { type ClockProperties } from '@/common/ClockProperties';
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters'
import SvgCircleSolid from '@/components/svg-circles/SvgCircleSolid.vue';
import { InputDataContents } from '@/common/scripts/InputDataContents';
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import ParameterSettingUnit from '@/components/ParameterSettingUnit.vue';

const clockSize = 300;
const halfClockSize = clockSize / 2;

const partsList: typeof SingleUnitParameters[] = [DotsOnCircleParameters];
const currentParameterList: Ref<ClockPartsParameters> = ref([]);
const currentDetailsOpenList: Ref<boolean[]> = ref([])
const currentSelect: Ref<string> = ref("");

	const fixingAnimationTime: number = 0.3;
let animationDurationTime: Ref<number> = ref(fixingAnimationTime);

const addList = (data: string): void => {
	currentParameterList.value.push(Object.assign({}, new (partsList.find((el) => el.heading === data) ?? SingleUnitParameters)()));
	currentDetailsOpenList.value.push(false);
}

const removeList = (index: number): void => {
	animationDurationTime.value = 0;
	currentParameterList.value.splice(index, 1);
	currentDetailsOpenList.value.splice(index, 1);
	
	setTimeout(() => {
		animationDurationTime.value = fixingAnimationTime;
	}, 40
	/* ↑ このミリ秒よりも短い間隔で削除ボタンを押されたらアニメーションがおかしくなるけど
		秒間 16 連打よりもう少し早い速度で連打しても大丈夫な時間に設定すればよい */);
}

const reverseDetailsOpen = (index: number): void => {
	currentDetailsOpenList.value[index] = !currentDetailsOpenList.value[index];
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
		<!-- <div @click="reverseDetailsOpen(index)">{{ val.dynamicHeading }}</div><button @click="removeList(index)">remove</button>
		<ParameterSettingSidebar v-if="currentDetailsOpenList[index]" :parameters="val" slider-length="200" /> -->

		<GcDetails :open="currentDetailsOpenList[index]" :animation-duration="animationDurationTime" v-model="currentDetailsOpenList[index]">
			<template #summary>{{ val.dynamicHeading }}<button @click="removeList(index)">remove</button></template>
			<template #details>
				<ParameterSettingUnit :parameters="val" slider-length="200" />
			</template>
		</GcDetails>
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