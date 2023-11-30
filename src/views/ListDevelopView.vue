<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { ParameterApplicability, type IParametersApplicability } from '@/common/scripts/object_parameters/ParametersApplicability';
import GcSelectInput from '@/components/modules/GcSelectInput.vue';

const params = new ParameterApplicability(<IParametersApplicability>{
	size: true,
});
const list: string[] = [];

for (const key in params) {
	if (params[key as keyof ParameterApplicability]) {
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
	<button @click="removeList(currentSelect)">remove</button>
	<GcSelectInput name="" id="" v-model="currentSelect">
		<option disabled value="">please choice</option>
		<option v-for="data in list" :value="data">{{ data }}</option>
	</GcSelectInput>
	<template v-for="val in currentList">
		<p>{{ val }}</p>
	</template>
</template>

<style scoped lang="scss">
/* style here */
</style>