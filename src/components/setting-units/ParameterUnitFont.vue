<script setup lang="ts">
import type { InputDataContents } from "@/common/scripts/InputDataContents";
import GcSelectInput from "../modules/GcSelectInput.vue";
import { webFonts } from "@/common/scripts/fonts/webFonts";

interface Props {
	param: InputDataContents;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"updateParameter": [value: string],
	"getHistory": [before: string, after: string, isChangeable?: boolean],
}>();

const onUpdateParameter = (value: string, before: string) => {
	emit("updateParameter", value);
	emit("getHistory", before, value);
}
</script>

<template>
	<GcSelectInput v-model="param.reactiveValue" @update:model-value="(value, before) => onUpdateParameter(value, before!)">
		<option v-for="(font, key) in webFonts" :value="key">{{ key }}</option>
	</GcSelectInput>
</template>

<style scoped lang="scss">
/* style here */
</style>