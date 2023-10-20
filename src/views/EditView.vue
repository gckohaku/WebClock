<script setup lang="ts">
import {ref} from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
const value = ref(50);
const value2 = ref(100);
const value3 = ref(150);
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>

	<GcInputSliderWithSpin v-model="value" max="300" min="0" id="value-slider" name="value" />
	<GcInputSliderWithSpin v-model="value2" max="300" min="0" id="value-slider" name="value2" />
	<GcInputSliderWithSpin v-model="value3" max="300" min="0" id="value-slider" name="value3" />
	
	<p>{{ value }}</p>
	<div class="circle" :style="{width: value + 'px', height: value + 'px'}"></div>
	<p>{{ value2 }}</p>
	<div class="circle" :style="{width: value2 + 'px', height: value2 + 'px'}"></div>
	<p>{{ value3 }}</p>
	<div class="circle" :style="{width: value3 + 'px', height: value3 + 'px'}"></div>
</template>

<style scoped lang="scss">
.circle {
	border-radius: 50%;
	border: solid blue 2px;
	background-color: transparent;
	box-sizing: content-box;
}
</style>