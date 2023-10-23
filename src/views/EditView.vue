<script setup lang="ts">
import { ref } from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
import GcSliderInputList from "@/components/modules/GcSliderInputList.vue";
const value = ref(50);
const value2 = ref(100);
const value3 = ref(150);

const tests = ref([25, 25, 25]);

const testList: Array<InputDataList> = [
	{
		name: "",
		id: "",
		min: "",
		max: "50",
		step: "",
	},
	{
		name: "",
		id: "",
		min: "",
		max: "100",
		step: "5",
	},
	{
		name: "",
		id: "",
		min: "",
		max: "150",
		step: "",
	}
]
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


	<div class="circle-wrapper">
		<p class="size">{{ value }}</p>
		<div class="circle" :style="{ width: value + 'px', height: value + 'px' }"></div>

		<p class="size">{{ value2 }}</p>
		<div class="circle" :style="{ width: value2 + 'px', height: value2 + 'px' }"></div>

		<p class="size">{{ value3 }}</p>
		<div class="circle" :style="{ width: value3 + 'px', height: value3 + 'px' }"></div>
	</div>

	<GcSliderInputList :lists="testList" :values="tests"></GcSliderInputList>

	<div class="circle-wrapper">
		<p class="size">{{ tests[0] }}</p>
		<div class="circle" :style="{ width: tests[0] + 'px', height: tests[0] + 'px' }"></div>

		<p class="size">{{ tests[1] }}</p>
		<div class="circle" :style="{ width: tests[1] + 'px', height: tests[1] + 'px' }"></div>

		<p class="size">{{ tests[2] }}</p>
		<div class="circle" :style="{ width: tests[2] + 'px', height: tests[2] + 'px' }"></div>
	</div>
</template>

<style scoped lang="scss">
.circle-wrapper {
	display: grid;
	grid-template-rows: 1em 310px;
	grid-template-columns: repeat(3, 310px);
	justify-items: center;
}

.size {
	grid-row: 1 / 2;
}

.circle {
	grid-row: 2 / 3;
	border-radius: 50%;
	border: solid blue 2px;
	background-color: transparent;
	box-sizing: content-box;
	align-self: center;
}
</style>