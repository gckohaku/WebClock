<script setup lang="ts">
import {ref} from "vue";
import RangeSlider from "@/components/RangeSlider.vue";
const value = ref(50);
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>

	<RangeSlider type="range" v-model="value" max="100" min="0" step="10" id="value" name="value" />
	<p>{{ value }}</p>
	<div class="circle" :style="{width: value + 'px', height: value + 'px'}"></div>
</template>

<style scoped lang="scss">
.circle {
	border-radius: 50%;
	border: solid blue 2px;
	background-color: transparent;
	box-sizing: content-box;
}
</style>