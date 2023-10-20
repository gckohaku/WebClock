<script setup lang="ts">
import {ref} from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
const value = ref(50);
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>

	<GcInputSliderWithSpin v-model="value" max="50" min="20" id="value-slider" name="value" />
	
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