<script setup lang="ts">
import Header from '@/components/Header.vue';
import IndexView from '@/views/IndexView.vue';

</script>

<template>
	<Header></Header>
	
	<div class="content">
		<IndexView />
	</div>
</template>

<style scoped>
.content {
	max-width: 1280px;
	margin: auto;
	height: calc(100dvh - 48px);
}
</style>
