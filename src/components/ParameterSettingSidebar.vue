<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue';

import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import GcDetails from '@/components/modules/GcDetails.vue';
import { DotsOnCircleParameters } from '@/common/scripts/input_data_contents/DotsOnCircleParameters';
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters'
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import ParameterSettingUnit from '@/components/ParameterSettingUnit.vue';
import { timeStore } from '@/stores/time';
import { arrayOfKindOfDateTime as timeKind, type kindOfDateTime, type timeAssociate } from '@/common/scripts/timeAssociate';
import { clockParametersStore } from '@/stores/clockParameters';

export interface Props {
	sliderLength?: string,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "50px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string],
}>();

const storeTime = timeStore();
const storeClockParams = clockParametersStore();

const clockSize = 300;
const halfClockSize = clockSize / 2;

const partsList: typeof SingleUnitParameters[] = [DotsOnCircleParameters];
const currentDetailsOpenList: Ref<boolean[]> = ref([])
const currentSelect: Ref<string> = ref("");

const fixingAnimationTime: number = 0.3;
let animationDurationTime: Ref<number> = ref(fixingAnimationTime);

const addList = (data: string): void => {
	storeClockParams.currentParameterList.push(Object.assign({}, new (partsList.find(el => el.heading === data) ?? SingleUnitParameters)()));
	currentDetailsOpenList.value.push(false);
}

const removeList = (index: number): void => {
	// animationDurationTime.value = 0;
	storeClockParams.currentParameterList.splice(index, 1);
	currentDetailsOpenList.value.splice(index, 1);

	// setTimeout(() => {
	// 	animationDurationTime.value = fixingAnimationTime;
	// }, 40);
	/* ↑ このミリ秒よりも短い間隔で削除ボタンを押されたらアニメーションがおかしくなるけど
		秒間 16 連打よりもう少し早い速度で連打しても大丈夫な時間に設定すればよい */
}

const reverseDetailsOpen = (index: number): void => {
	currentDetailsOpenList.value[index] = !currentDetailsOpenList.value[index];
}

const getParameterValue = (singleUnit: SingleUnitParameters, code: ParametersProperties): string => {
	return singleUnit.parameters.find(el => el.propertyCode === code)?.reactiveValue ?? "error";
}

const updateTime = (): void => {
	storeTime.update();

	setTimeout(() => {
		updateTime();
	}, 10);
}

onMounted(() => {
	updateTime();
});

// これは utility なものにしてもいいかも
const prePadding = (targetNum: number, paddingChar: string, digitSize: number = 2): string => {
	return targetNum.toString().padStart(digitSize, paddingChar);
}

const getTimeValue = (type: string, time: string): number => {
	if (type === "Analog") {
		return storeTime.time.getTime({begin: timeKind[time], end: timeKind.millisecond});
	}
	else {
		return storeTime.time.getTime({begin: timeKind[time], end: timeKind[time]});
	}
}

const splitSelectTimeType = (select: string): string[] => {
	return select.split(":");
}

const getNormalTimeValue = (selectString: string): number => {
	
	const splitData: string[] = splitSelectTimeType(selectString);
	if (splitData.length < 2) {
		return 0;
	}
	const lowerTime: string = splitData[1].toLowerCase();
	return getTimeValue(splitData[0], lowerTime) / storeTime.time.getFullValueTime(timeKind[lowerTime] * ((lowerTime === "hour") ? 0.5 : 1));
}
</script>

<template>
	<button @click="addList(currentSelect)">add</button>
	<GcSelectInput name="" id="" v-model="currentSelect">
		<option disabled value="">please choice</option>
		<option v-for="item in partsList" :key="item.heading" :value="item.heading">{{ item.heading }}</option>
	</GcSelectInput>

	<template v-for="(val, index) in storeClockParams.currentParameterList" :key="val">
		<!-- <div @click="reverseDetailsOpen(index)">{{ val.dynamicHeading }}</div><button @click="removeList(index)">remove</button>
		<ParameterSettingSidebar v-if="currentDetailsOpenList[index]" :parameters="val" slider-length="200" /> -->

		<GcDetails :open="currentDetailsOpenList[index]" :animation-duration="animationDurationTime" v-model="currentDetailsOpenList[index]">
			<template #summary class="details-header">{{ val.dynamicHeading }}: {{ val.parameters.find(el => el.propertyCode === 'relatedTime')?.reactiveValue }}<button @click="removeList(index)">remove</button></template>
			<template #details>
				<ParameterSettingUnit :parameters="val" :slider-length="$props.sliderLength" />
			</template>
		</GcDetails>
	</template>
</template>

<style scoped lang="scss">


:deep(.summary-container) {
	background-color: white;
	position: sticky;
	top: 0;
}
</style>