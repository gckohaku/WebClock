<script setup lang="ts">
import {ref} from "vue";
import GcRangeSlider from "@/components/modules/GcRangeSlider.vue";
import GcNumberInput from "@/components/modules/GcNumberInput.vue";
const value = ref(50);
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>

	<GcRangeSlider v-model="value" max="100" min="0" id="value-slider" name="value" />
	<GcNumberInput v-model="value" max="100" min="0" step="1" id="value-num-in" name="value" />
	
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