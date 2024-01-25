<script setup lang="ts">
import type { ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { layersStore } from '@/stores/layers';

const storeLayers = layersStore();

export interface Props {
	layers: ClockPartsParameters;
}

const props = defineProps<Props>();
</script>

<template>
	<div class="layers-container">
		<div class="layer-unit"
		v-for="(val, index) in $props.layers" key="val"
		:class="(storeLayers.currentSelect === index) ? 'selecting' : ''"
		@click="storeLayers.currentSelect = index">
			{{ index }}: {{ val.heading }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.layers-container {
	.layer-unit {
		cursor: pointer;

		&:hover {
			outline: blue 1px solid;
			outline-offset: -1px;
		}

		&.selecting {
			background-color: lightblue;
		}
	}
}
</style>