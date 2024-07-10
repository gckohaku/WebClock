<script setup lang="ts">
import type { InputDataContents } from "@/common/scripts/InputDataContents";
import GcInputColorPicker from "@/components/modules/GcInputColorPicker.vue";
import GcSelectInput from "../modules/GcSelectInput.vue";

interface Props {
	param: InputDataContents;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"updateParameter": [value: string],
	"getHistory": [before: string, after: string, isChangeable?: boolean],
}>();

const onUpdateValue = () => {
	
}

const onUpdateParameter = (value: string, before: string) => {
	emit("updateParameter", value);
	emit("getHistory", before, value);
}
</script>

<template>
	<GcSelectInput v-model="param.reactiveValue" @update:model-value="(value, before) => onUpdateParameter(value, before!)">
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
</template>

<style scoped lang="scss">
/* style here */
</style>