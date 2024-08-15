<script setup lang="ts">
import Header from '@/components/Header.vue';
import EditView from '@/views/EditView.vue';
</script>

<template>
	<Header></Header>
	
	<div class="router-content">
		<EditView />
	</div>
</template>

<style scoped>
header {
	line-height: 1.5;
	height: 48px;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;
	background-color: #f0f0f0;
}

header .wrapper {
	display: flex;
	justify-content: center;
	margin: auto;
	align-items: center;
	height: 100%;
}

/* .fix-height {
	width: 100%;
	height: 48px;
} */

nav {
	font-size: 12px;
	text-align: center;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

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
