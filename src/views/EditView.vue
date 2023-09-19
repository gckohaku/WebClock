<script setup lang="ts">
import {ref} from "vue";
const value = ref(0);
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>
	<input type="range" v-model="value" max="100" min="0" id="value" name="value">
	<p>{{ value }}</p>
	<div class="circle" :style="{width: value + 'px', height: value + 'px'}"></div>
</template>

<style scoped>
.circle {
	border-radius: 50%;
	border: solid blue 2px;
	background-color: transparent;
	box-sizing: content-box;
}
</style>