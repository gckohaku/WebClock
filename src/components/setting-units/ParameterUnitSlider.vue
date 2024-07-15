<script setup lang="ts">
import { historiesStore } from "@/stores/histories";
import GcInputSliderWithSpin from "../modules/GcInputSliderWithSpin.vue";
import {type InputDataContents} from "@/common/scripts/InputDataContents";
import { ref, type Ref } from "vue";

interface Props {
	param: InputDataContents;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"updateParameter": [value: string],
	"getHistory": [before: string, after: string, isChangeable?: boolean],
}>();

const histories = historiesStore();

let beforeUpdateValue: Ref<string> = ref("");
const sliderLength = 150;

const onUpdateParameter = (e: string) => {
	emit('updateParameter', e);
}

const onUpdateEnd  = (value: string, isChangeable: boolean) => {
	emit('getHistory', beforeUpdateValue.value, value, isChangeable);
}
</script>

<template>
	<GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue" :slider-length="sliderLength" @update:model-value="onUpdateParameter($event)" @update:start="(e) => { beforeUpdateValue = e }" @update:end="(value, isChangeable) => onUpdateEnd(value, isChangeable)" @update:using-spin="histories.sendUsingSpinSignal" />
</template>

<style scoped lang="scss">
/* style here */
</style>

