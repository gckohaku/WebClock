<script setup lang="ts">
import { popUpDataStore } from '@/stores/popUpData';
import { ref, type Ref } from 'vue';


export interface Props {
	data: string[];
}

const props = withDefaults(defineProps<Props>(), {
	data: () => Array<string>(),
});

const storePopUp = popUpDataStore();

const isCtnMouseOn: Ref<boolean> = ref(false);
const isChoicesMouseOn: Ref<boolean> = ref(false);

const emit = defineEmits<{
	select: [data: string];
}>();

const selectDatum = (datum: string): string => {
	console.log(datum);
	storePopUp.setDataSelectorVisible(false);
	return datum;
}
</script>

<template>
	<div v-if="storePopUp.dataSelectorVisible" class="selector-wrapper" @click="storePopUp.setDataSelectorVisible(isCtnMouseOn && !isChoicesMouseOn)">
		<div class="selector-container" @mouseover="isCtnMouseOn = true" @mouseleave="isCtnMouseOn = false">
			<div class="content-container" @mouseover="isChoicesMouseOn = true" @mouseleave="isChoicesMouseOn = false">
				<div v-for="datum of data" class="selectable-content" @click="emit('select', selectDatum(datum))">{{ datum }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.selector-wrapper {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100dvh;
	display: grid;
	place-items: center;

	.selector-container {
		width: max(500px, 50%);
		height: 70%;

		background-color: rgba($color: #000, $alpha: .3);

		.content-container {
			.selectable-content {
				&:hover {
					outline: solid red 1px;
				}
			}
		}
	}
}
</style>