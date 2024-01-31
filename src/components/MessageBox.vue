<script setup lang="ts">
export interface Props {
	title?: string;
	message?: string;
	buttonType?: "Ok" | "YesNo";
}

const props = withDefaults(defineProps<Props>(), {
	title: "message box",
	message: "message content",
	buttonType: "Ok",
});
</script>

<template>
	<div class="message-box-wrapper" >
		<div class="message-box-container" @click.stop>
			<p class="title">{{ props.title }}</p>
			<p class="message">{{ props.message }}</p>

			<div v-if="buttonType === 'Ok'" class="button-container">
				<button>OK</button>
			</div>
			<div v-else-if="buttonType === 'YesNo'" class="button-container">
				<button>Yes</button>
				<button>No</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.message-box-wrapper {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100dvh;
	display: grid;
	place-items: center;

	.message-box-container {
		background-color: rgba($color: #000, $alpha: .3);
		max-width: max(500px, 50%);
		width: fit-content;

		.title {
			font-size: 0.9rem;
		}

		.message {

		}
	}
}
</style>