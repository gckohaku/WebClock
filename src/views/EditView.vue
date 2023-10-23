<script setup lang="ts">
import { ref } from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
import GcSliderInputList from "@/components/modules/GcSliderInputList.vue";
const value = ref(50);
const value2 = ref(100);
const value3 = ref(150);

const tests = ref([25, 25, 25, 50, 100, 75, 30]);

const headings = ["円1", "円2", "円3", "円4", "円5", "circle 6", "circle seven"];

const testList: Array<InputDataList> = [
	{
		max: "50",
	},
	{
		max: "300",
		step: "5",
	},
	{
		max: "150",
	},
	{
		max: "200",
	},
	{
		min: "100",
		max: "200",
		step: "2",
	},
	{
		max: "130",
	},
	{

	}
];
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>


	<div class="circle-wrapper">
		<p class="size">{{ value }}</p>
		<div class="circle" :style="{ width: value + 'px', height: value + 'px' }"></div>

		<p class="size">{{ value2 }}</p>
		<div class="circle" :style="{ width: value2 + 'px', height: value2 + 'px' }"></div>

		<p class="size">{{ value3 }}</p>
		<div class="circle" :style="{ width: value3 + 'px', height: value3 + 'px' }"></div>
	</div>

	<GcSliderInputList :headings="headings" :lists="testList" :values="tests" slider-length=""></GcSliderInputList>

	<div class="circle-wrapper">
		<div class="circle-container" v-for="index in tests.length">
			<div class="circle-unit" v-if="tests[index - 1]">
				<p class="size">{{ tests[index - 1] }}</p>
				<div class="circle" :style="{ width: tests[index - 1] + 'px', height: tests[index - 1] + 'px' }"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.circle-wrapper {
	display: flex;
	flex-wrap: wrap;
	grid-template-rows: 1em 310px;
	grid-template-columns: repeat(3, 310px);
	justify-items: center;
}

.circle-unit {
	width: 310px;
	height: 310px;
}

.circle {
	border-radius: 50%;
	border: solid blue 2px;
	background-color: transparent;
	box-sizing: content-box;
	align-self: center;
}
</style>