<script setup lang="ts">
import { getDataNames, getEditSettings } from '@/common/scripts/IndexedDBRelational';
import { clockParametersStore } from '@/stores/clockParameters';
import { dataNamesStore } from '@/stores/dataNames';
import { popUpDataStore } from '@/stores/popUpData';
import { onMounted, ref, type Ref } from 'vue';


export interface Props {
	title?: string;
	description?: string;
	okText?: string;
	cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
	title: "",
	description: "",
	okText: "OK",
	cancelText: "キャンセル",
});

const storePopUp = popUpDataStore();
const storeDataNames = dataNamesStore();
const storeParameters = clockParametersStore();

const dataNameList: Ref<string[]> = ref([]);
const isDataNameSelects: Ref<boolean[]> = ref([]);

const emit = defineEmits<{
	select: [data: string];
}>();

const selectDatum = (datum: string): string => {
	return datum;
}

const disableSelector = () => {
	storePopUp.setDataSelectorVisible(false);
	isDataNameSelects.value.fill(false)
}

const getDataName = (key: string): void => {
	
}

onMounted(() => {
	isDataNameSelects.value.length = storeDataNames.dataNames.length;
	isDataNameSelects.value.fill(false);
});
</script>

<template>
	<div class="selector-wrapper" @click="; disableSelector()" >
		<div class="selector-container" @click.stop>
			<p v-if="props.title !== ''" class="selector-title">{{ props.title }}</p>
			<p v-if="props.description !== ''" class="description">{{ props.description }}</p>

			<div class="content-container">
				<div v-for="(datum, index) of storeDataNames.dataNames" class="selectable-content" :class="[isDataNameSelects[index] ? 'select' : '']" @click.stop="isDataNameSelects = isDataNameSelects.fill(false); isDataNameSelects[index] = true">{{ getEditSettings(datum).then((data =>  data)) }}</div>
			</div>

			<div class="button-container">
				<button @click.stop="if(isDataNameSelects.includes(true)){ emit('select', selectDatum(storeDataNames.dataNames[isDataNameSelects.indexOf(true)])); disableSelector();}">{{ props.okText }}</button>
				<button @click.stop="disableSelector()">{{ props.cancelText }}</button>
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
				color: white;
				cursor: pointer;
				

				&.select {
					background-color: blue;
				}

				&:hover {
					outline: solid red 1px;
				}
			}
		}
	}
}
</style>