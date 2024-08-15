<script setup lang="ts">
import Header from '@/components/Header.vue';
import IndexView from '@/views/IndexView.vue';

</script>

<template>
	<Header></Header>
	
	<div class="router-content">
		<IndexView />
		aaaaaaa
	</div>
</template>

<style scoped>
.router-content {
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
