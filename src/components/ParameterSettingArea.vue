<script setup lang="ts">
import { layersStore } from '@/stores/layers';
import { clockParametersStore } from '@/stores/clockParameters';
import { storeParametersToIdb } from '@/common/scripts/storeParametersToIdb';
import ParameterSettingUnit from './ParameterSettingUnit.vue';

export interface Props {
	length?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
	length: 100,
});

const storeParameters = clockParametersStore();
const storeLayers = layersStore();

</script>

<template>
	<ParameterSettingUnit v-if="storeParameters.currentParameterList[storeLayers.currentSelect]" :parameters="storeParameters.currentParameterList[storeLayers.currentSelect]" :slider-length="length" @update:model-value="storeParametersToIdb(storeParameters.dataTitle, JSON.parse(JSON.stringify(storeParameters.currentParameterList)))" />
</template>

<style scoped lang="scss">
// style here
</style>