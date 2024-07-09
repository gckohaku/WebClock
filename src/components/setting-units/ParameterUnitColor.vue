<script setup lang="ts">
import type { InputDataContents } from "@/common/scripts/InputDataContents";
import GcInputColorPicker from "@/components/modules/GcInputColorPicker.vue";

interface Props {
	param: InputDataContents;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"updateParameter": [value: string],
	"getHistory": [before: string, after: string, isChangeable?: boolean],
}>();

const onUpdateParameter = (e: string) => {
	emit("updateParameter", e);
}

const onGetHistory = (before: string, after: string) => {
	emit("getHistory", before, after);
}
</script>

<template>
	<GcInputColorPicker v-model="props.param.reactiveValue" @update:model-value="onUpdateParameter($event)" @change="(before, after) => onGetHistory(before, after)" />
</template>

<style scoped lang="scss">
/* style here */
</style>