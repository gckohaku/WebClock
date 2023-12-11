<script setup lang="ts">
import { ref, type Ref } from 'vue';
import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import ParameterSettingSidebar from '@/components/ParameterSettingSidebar.vue';
import { dotsOnCircleParameters } from '@/common/scripts/input_data_contents/dotsOnCircleParameters';
import { dotsOnCircleParamApplicability } from '@/common/scripts/object_parameters/dotsOnCircle';
import { type ClockProperties } from '@/common/ClockProperties';
import type { ClockPartsParameters, SingleUnitParameters } from '@/common/scripts/ClockPartsParameters'

const partsList: ClockPartsParameters = [dotsOnCircleParameters, <SingleUnitParameters>{ heading: "テスト1", parameters: [] }, <SingleUnitParameters>{ heading: "test 2", parameters: [] }];
const currentParameterList: Ref<ClockPartsParameters> = ref([]);
const currentSelect: Ref<string> = ref("");

const addList = (data: string): void => {
	currentParameterList.value.push(partsList.find((el) => el.heading === data) ?? <SingleUnitParameters>{ heading: "error", parameters: [] });
}

const removeList = (index: number): void => {
	currentParameterList.value.splice(index, 1);
}
</script>

<template>
	<p>currentSelect: {{ currentSelect }}</p>
	<button @click="addList(currentSelect)">add</button>
	<GcSelectInput name="" id="" v-model="currentSelect">
		<option disabled value="">please choice</option>
		<option v-for="item in partsList" :value="item.heading">{{ item.heading }}</option>
	</GcSelectInput>

	<div v-for="(val, index) in currentParameterList">
		<p>{{ val.heading }}</p>
		<button @click="removeList(index)">remove</button>
		<ParameterSettingSidebar :parameters="val" slider-length="200" />
	</div>

</template>

<style scoped lang="scss">
/* style here */
</style>