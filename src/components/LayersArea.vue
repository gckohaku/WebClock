<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import type { ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { layersStore } from '@/stores/layers';

const storeLayers = layersStore();

export interface Props {
	layers: ClockPartsParameters;
}

const props = defineProps<Props>();

const isInputPossible: Ref<boolean> = ref(false);

const clickOutsideRef = ref(null);
onClickOutside(clickOutsideRef, (e) => {
	isInputPossible.value = false;
});
</script>

<template>
	<div class="layers-container">
		<div v-for="(val, index) in props.layers" class="layer-content" :key="`${val}`">
			<div v-if="!(isInputPossible && index === storeLayers.currentSelect) " class="layer-unit" :class="(storeLayers.currentSelect === index) ? 'selecting' : ''" @click="storeLayers.currentSelect = index" @dblclick="isInputPossible = true">
				{{ index }}: {{ val.heading }}
			</div>

			<input v-else @focusout="isInputPossible = false" />
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