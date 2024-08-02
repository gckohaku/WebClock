<script setup lang="ts">
import { popUpDataStore } from '@/stores/popUpData';
import { makeDestructurable } from '@vueuse/core';
import { type Ref, ref } from 'vue';

const textArea: Ref<HTMLTextAreaElement | null> = ref(null);

const popUpData = popUpDataStore();

const disableModal = () => {
	popUpData.inputTextModalVisible = false;
}

const onEnterClick = () => {
	disableModal();
	const areaElement = textArea.value;

	if (areaElement) {
		popUpData.inputTextModalEvent.fire(areaElement.value);
	}
}
</script>

<template>
	<div class="modal-wrapper">
		<div class="modal-container">
			<p>パラメータ文字列を入力</p>
			<textarea ref="textArea"></textarea>
			<button>enter</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.modal-wrapper {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100dvh;
	display: grid;
	place-items: center;

	.modal-container {
		width: max(500px, 50%);
		height: 70%;

		background-color: rgba($color: #000, $alpha: .3);
	}
}
</style>