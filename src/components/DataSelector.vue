<script setup lang="ts">
import { popUpDataStore } from '@/stores/popUpData';
import { onMounted, ref, type Ref } from 'vue';


export interface Props {
	title?: string;
	description?: string;
	data: string[];
	okText?: string;
	cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
	title: "",
	description: "",
	data: () => Array<string>(),
	okText: "OK",
	cancelText: "キャンセル",
});

const storePopUp = popUpDataStore();

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

onMounted(() => {
	isDataNameSelects.value.length = props.data.length;
	isDataNameSelects.value.fill(false);
});
</script>

<template>
	<div class="selector-wrapper" @click="; disableSelector()" >
		<div class="selector-container" @click.stop>
			<p v-if="props.title !== ''" class="selector-title">{{ props.title }}</p>
			<p v-if="props.description !== ''" class="description">{{ props.description }}</p>

			<div class="content-container">
				<div v-for="(datum, index) of data" class="selectable-content" :class="[isDataNameSelects[index] ? 'select' : '']" @click.stop="isDataNameSelects = isDataNameSelects.fill(false); isDataNameSelects[index] = true">{{ datum }}</div>
			</div>

			<div class="button-container">
				<button @click.stop="if(isDataNameSelects.includes(true)){ emit('select', selectDatum(data[isDataNameSelects.indexOf(true)])); disableSelector();}">{{ props.okText }}</button>
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