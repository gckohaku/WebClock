<script setup lang="ts">
import { onMounted, onUpdated, ref, type Ref } from 'vue';

import type { ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import { layersStore } from '@/stores/layers';

const storeLayers = layersStore();

export interface Props {
	layers: ClockPartsParameters;
}

const props = defineProps<Props>();

const isInputPossible: Ref<boolean> = ref(false);

const dblClickAction = () => {
	isInputPossible.value = true;

	// console.log(inputRef.value[storeLayers.currentSelect].children[0]);

	// focusInput();
}

// input へのフォーカス関連
let inputRef = ref();

const focusInput = () => {
	inputRef.value[storeLayers.currentSelect].focus();
}
</script>

<template>
	<div class="layers-container">
		<div v-for="(val, index) in props.layers" class="layer-content" :key="`${val}`" ref="inputRef">
			<!-- <div v-if="!(isInputPossible && index === storeLayers.currentSelect)" class="layer-unit" :class="(storeLayers.currentSelect === index) ? 'selecting' : ''" @click="storeLayers.currentSelect = index" @dblclick="dblClickAction">
				{{ index }}: {{ val.heading }}
			</div>

			<input v-else @focusout="isInputPossible = false" ref="inputRef" /> -->

			<input type="text" class="layer-unit" :class="(storeLayers.currentSelect === index) ? 'selecting' : ''" :value="`${index}: ${val.heading}`" :readonly="(isInputPossible && index === storeLayers.currentSelect) ? false : true" @click="storeLayers.currentSelect = index" @focusout="isInputPossible = false" @dblclick="dblClickAction" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.layers-container {
	.layer-content {
		height: 20px;

		.layer-unit {
			cursor: pointer;
			box-sizing: border-box;
			display: block;
			width: 100%;
			height: 100%;
			padding: 2px;
			background-color: #f0f0f0;
			border: none;


			&:hover {
				outline: blue 1px solid;
				outline-offset: -1px;
			}

			&.selecting {
				background-color: #e0e0e0;

				&:not(:read-only) {
					background-color: white;
				}
			}
		}
	}
}
</style>