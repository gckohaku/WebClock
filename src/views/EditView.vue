<script setup lang="ts">
import { ref } from "vue";
import GcInputSliderWithSpin from "@/components/modules/GcInputSliderWithSpin.vue";
import GcSliderInputList from "@/components/modules/GcSliderInputList.vue";
import { InputDataContents } from "@/common/scripts/InputDataContents";
const value = ref(50);
const value2 = ref(100);
const value3 = ref(150);

const tests = ref([25, 25, 25, 50, 100, 75, 30]);

const headings = ["円1", "円2", "円3", "円4", "円5", "circle 6", "circle seven"];

const testList: Array<InputDataContents> = [
	{
		heading: "円1",
		max: "50",
		reactiveValue: ref("25"),
	},
	{
		heading: "円2",
		max: "300",
		step: "5",
		reactiveValue: ref("25"),
	},
	{
		heading: "円3",
		max: "150",
		reactiveValue: ref("25"),
	},
	{
		heading: "円4",
		max: "200",
		reactiveValue: ref("50"),
	},
	{
		heading: "円5",
		min: "100",
		max: "200",
		step: "2",
		reactiveValue: ref("100"),
	},
	{
		heading: "circle 6",
		max: "130",
		reactiveValue: ref("75"),
	},
	{
		heading: "circle seven",
		reactiveValue: ref("30"),
	}
];
</script>

<template>
	<p>edit</p>
	<select name="clockType" id="clock-type-select">
		<option value="Analog">Analog</option>
		<option value="Digital">Digital</option>
	</select>
	
	<GcSliderInputList :headings="headings" :lists="testList" :values="tests" slider-length=""></GcSliderInputList>

	<div class="circle-wrapper">
		<div class="circle-container" v-for="index in tests.length">
			<div class="circle-unit" v-if="tests[index - 1]">
				<p class="size">{{ tests[index - 1] }}</p>
				<div class="circle" :style="{ width: testList[index - 1].reactiveValue.value + 'px', height: testList[index - 1].reactiveValue.value + 'px' }"></div>
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