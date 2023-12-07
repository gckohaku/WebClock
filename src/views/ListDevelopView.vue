<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { ParametersApplicability, type IParametersApplicability } from '@/common/scripts/object_parameters/ParametersApplicability';
import GcSelectInput from '@/components/modules/GcSelectInput.vue';
import ParameterSettingSidebar from '@/components/ParameterSettingSidebar.vue';
import { dotsOnCircleParameters } from '@/common/scripts/input_data_contents/dotsOnCircleParameters';
import { dotsOnCircleParamApplicability } from '@/common/scripts/object_parameters/dotsOnCircle';
import { type ClockProperties } from '@/common/ClockProperties';


const params = dotsOnCircleParamApplicability;
const list: string[] = [];

for (const key in params) {
	if (params[key as keyof ParametersApplicability]) {
		list.push(key);
	}
}

const currentList: Ref<Set<string>> = ref(new Set<string>());
const currentSelect: Ref<string> = ref("");

const addList = (val: string): void => {
	currentList.value.add(val);
}

const removeList = (val: string): void => {
	currentList.value.delete(val);
}
</script>

<template>
	<p>currentSelect: {{ currentSelect }}</p>
	<button @click="addList(currentSelect)">add</button>
	<GcSelectInput name="" id="" v-model="currentSelect">
		<option disabled value="">please choice</option>
		<option v-for="data in list" :value="data">{{ data }}</option>
	</GcSelectInput>
	<div v-for="val in currentList" style="display: grid; grid-template-columns: 150px 70px;">
		<p>{{ val }}</p>
		<button @click="removeList(val)">remove</button>
	</div>

	<ParameterSettingSidebar :parameters="(dotsOnCircleParameters as ClockProperties)" slider-length="200" />
	{{ console.log(dotsOnCircleParameters) }}
</template>

<style scoped lang="scss">
/* style here */
</style>