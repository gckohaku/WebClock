<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import GcDetails from '@/components/modules/GcDetails.vue';
import { DotsOnCircleParameters } from '@/common/scripts/input_data_contents/DotsOnCircleParameters';
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters'
import SvgCircleSolid from '@/components/svg-circles/SvgCircleSolid.vue';
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import ParameterSettingUnit from '@/components/ParameterSettingUnit.vue';
import { timeStore } from '@/stores/time';
import SvgCircleFill from '@/components/svg-circles/SvgCircleFill.vue';
import { arrayOfKindOfDateTime as timeKind, type kindOfDateTime, type timeAssociate } from '@/common/scripts/timeAssociate';

const store = timeStore();

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

const updateTime = (): void => {
	store.update();

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
		return store.time.getTime({begin: timeKind[time], end: timeKind.millisecond});
	}
	else {
		return store.time.getTime({begin: timeKind[time], end: timeKind[time]});
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
	return getTimeValue(splitData[0], lowerTime) / store.time.getFullValueTime(timeKind[lowerTime] * ((lowerTime === "hour") ? 0.5 : 1));
}
</script>

<template>
	<p>{{ prePadding(store.time.hour, "0") }}:{{ prePadding(store.time.minute, "0") }}:{{ prePadding(store.time.second, "0") }}.{{ prePadding(Math.floor(store.time.millisecond / 10), "0") }}</p>

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
			<template #summary>{{ val.getHeading() }}<button @click="removeList(index)">remove</button></template>
			<template #details>
				<ParameterSettingUnit :parameters="val" slider-length="200" />
			</template>
		</GcDetails>
		{{ getNormalTimeValue(getParameterValue(val, 'relatedTime')) }}
	</template>

	<div>
		<svg :view-box="`0 0 ${clockSize} ${clockSize}`" :width="clockSize" :height="clockSize">
			<g v-for="val in currentParameterList">

				<SvgCircleSolid :color="getParameterValue(val, 'color')" :cx="Number(getParameterValue(val, 'offsetX')) + halfClockSize" :cy="Number(getParameterValue(val, 'offsetY')) + halfClockSize" :r="Number(getParameterValue(val, 'size')) / 2" :line-width="getParameterValue(val, 'width')" />
				<SvgCircleFill :color="getParameterValue(val, 'accessory1_color')"
				:r="getParameterValue(val, 'accessory1_size')"
				:cx="halfClockSize + Number(getParameterValue(val, 'offsetX')) + (Number(getParameterValue(val, 'size')) / 2) * Math.cos(Math.PI * 2 * getNormalTimeValue(getParameterValue(val, 'relatedTime')) - Math.PI / 2)"
				:cy="halfClockSize + Number(getParameterValue(val, 'offsetY')) + (Number(getParameterValue(val, 'size')) / 2) * Math.sin(Math.PI * 2 * getNormalTimeValue(getParameterValue(val, 'relatedTime')) - Math.PI / 2)" />
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>