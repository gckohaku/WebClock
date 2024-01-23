<script setup lang="ts">
import { layersStore } from '@/stores/layers';
import { clockParametersStore } from '@/stores/clockParameters';
import ParameterSettingUnit from './ParameterSettingUnit.vue';

export interface Props {
	length?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
	length: 100,
});

const storeLayers = layersStore();
const storeParameters = clockParametersStore();
</script>

<template>
	<ParameterSettingUnit :parameters="storeParameters.currentParameterList[storeLayers.currentSelect]" :slider-length="length" />
</template>

<style scoped lang="scss">
// style here
</style>