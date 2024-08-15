<script setup lang="ts">
import Header from '@/components/Header.vue';
import EditView from '@/views/EditView.vue';
</script>

<template>
	<main class="content">
		<EditView />
	</main>
</template>

<style scoped>
.content {
	max-width: 1280px;
	margin: auto;
	height: calc(100dvh - 48px);
}

@media (min-width: 1280px) {
	header .wrapper {
		display: flex;
		justify-content: flex-start;
		max-width: 1280px;
		margin: auto;
		align-items: center;
		height: 100%;
	}

	nav {
		text-align: left;
		font-size: 1rem;
	}
}
</style>
