<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';
import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import { clockParametersStore } from '@/stores/clockParameters';
import { dataNamesStore } from '@/stores/dataNames';
import { partsListsStore } from '@/stores/partsLists';
import { timeStore } from '@/stores/time';
import LayersArea from './LayersArea.vue';
import TabPanel from './TabPanel.vue';
import { layersStore } from '@/stores/layers';

export interface Props {
	sliderLength?: string | number,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "50px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string],
}>();

const storeTime = timeStore();
const storeClockParams = clockParametersStore();
const storeDataNames = dataNamesStore();
const storePartsLists = partsListsStore();
const storeLayers = layersStore();

// const clockSize = 300;
// const halfClockSize = clockSize / 2;

const partsList: typeof SingleUnitParameters[] = storePartsLists.partsList;
const currentSelect: Ref<string> = ref("");

const fixingAnimationTime: number = 0.3;
let animationDurationTime: Ref<number> = ref(fixingAnimationTime);

const addList = (data: string): void => {
	storeClockParams.currentParameterList.push(new (partsList.find(el => el.staticHeading === data) ?? SingleUnitParameters)());
	useIndexedDb.storeParameters(storeDataNames.currentDataId, JSON.parse(JSON.stringify(storeClockParams.currentParameterList)));
}

const removeList = (index: number): void => {
	// animationDurationTime.value = 0;
	storeClockParams.currentParameterList.splice(index, 1);
	useIndexedDb.storeParameters(storeDataNames.currentDataId, JSON.parse(JSON.stringify(storeClockParams.currentParameterList)));

	const layerValue = storeClockParams.currentParameterList.length;
	if (storeLayers.currentSelect >= layerValue) {
		storeLayers.currentSelect = layerValue - 1;
	}
}

const updateTime = (): void => {
	storeTime.update();

	setTimeout(() => {
		updateTime();
	}, 10);
}

const getTimeValue = (type: string, time: string): number => {
	if (type === "Analog") {
		return storeTime.time.getTime({ begin: timeKind[time], end: timeKind.millisecond });
	}
	else {
		return storeTime.time.getTime({ begin: timeKind[time], end: timeKind[time] });
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
	<div class="sidebar-wrapper">
		<button @click="addList(currentSelect)">add</button>
		<GcSelectInput name="" id="" v-model="currentSelect">
			<option disabled value="">please choice</option>
			<option v-for="item in partsList" :key="item.staticHeading" :value="item.staticHeading">{{ item.staticHeading }}</option>
		</GcSelectInput>
		<LayersArea :layers="storeClockParams.currentParameterList" @delete="(index: number) => removeList(index)" />
		<TabPanel />
	</div>
</template>

<style scoped lang="scss">
:deep(.summary-container) {
	background-color: white;
	position: sticky;
	top: 0;
}

// .sidebar-wrapper {
// 	overflow-y: clip;
// }
</style>