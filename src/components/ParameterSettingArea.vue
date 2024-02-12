<script setup lang="ts">
import { layersStore } from '@/stores/layers';
import { clockParametersStore } from '@/stores/clockParameters';
import ParameterSettingUnit from './ParameterSettingUnit.vue';
import { dataNamesStore } from '@/stores/dataNames';
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";

export interface Props {
	length?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
	length: 100,
});

const storeParameters = clockParametersStore();
const storeLayers = layersStore();
const storeDataNames = dataNamesStore();
</script>

<template>
	<ParameterSettingUnit v-if="storeParameters.currentParameterList[storeLayers.currentSelect]" :parameters="storeParameters.currentParameterList[storeLayers.currentSelect]" :slider-length="length" @update:model-value="useIndexedDb.storeParameters(storeDataNames.currentDataId, JSON.parse(JSON.stringify(storeParameters.currentParameterList)))" />
</template>

<style scoped lang="scss">
// style here
</style>