<script setup lang="ts">
import { historiesStore } from "@/stores/histories";
import GcInputSliderWithSpin from "../modules/GcInputSliderWithSpin.vue";
import {type InputDataContents} from "@/common/scripts/InputDataContents";

interface Props {
	param: InputDataContents;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"updateParameter": [value: string],
	"getHistory": [before: string, after: string, isChangeable?: boolean],
}>();

const histories = historiesStore();
</script>

<template>
	<GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue" :slider-length="props.sliderLength" @update:model-value="$emit('updateParameter', $event)" @update:start="(e) => { beforeUpdateValue = e }" @update:end="(value, isChangeable) => $emit('getHistory', 'any', value, isChangeable)" @update:using-spin="histories.sendUsingSpinSignal" />
</template>

<style scoped lang="scss">
/* style here */
</style>