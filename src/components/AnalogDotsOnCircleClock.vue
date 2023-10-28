<script setup lang="ts">
import { ref } from "vue"

import { analogDotsOnCircleDataList } from "@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import type { UnwrapNestedRefs } from "vue";
import type { InputDataContentsList } from "@/common/InputDataContentsList";

const props = defineProps<{
	lists: InputDataContentsList,
}>();

// スタイル用リアクティブ変数
// const clockSize = ref(300)

// const hourSize = ref(150);
const hourColor = ref("blue");
const hourStyle = ref("solid");

// const minuteSize = ref(200);
const minuteColor = ref("#4040ff");
const minuteStyle = ref("solid");

// const secondSize = ref(250);
const secondColor = ref("#8080ff");
const secondStyle = ref("solid");

const circleWidth = ref(3);

const dotSize = ref(16);
const hourDotSize = ref(20);
const minuteDotSize = ref(16);
const secondDotSize = ref(12);


const refHour = ref(0);
const refMinute = ref(0);
const refSecond = ref(0);

const getCurrentSecond = (time: Date): number => {
	const second = time.getSeconds();
	const millisecond = time.getMilliseconds();
	return second + millisecond / 1000;
}

const getCurrentMinute = (time: Date): number => {
	const minute = time.getMinutes();
	return minute + getCurrentSecond(time) / 60;
}

const getCurrentHour = (time: Date): number => {
	const hour = time.getHours();
	return hour + getCurrentMinute(time) / 60;
}

setInterval((): void => {
	const time = new Date();
	refSecond.value = getCurrentSecond(time);
	refMinute.value = getCurrentMinute(time);
	refHour.value = getCurrentHour(time);
}, 30);

// 記述量削減目的の変数
const sizes = props.lists.sizes;
const dotSizes = props.lists.dotSizes
const colors = props.lists.colors;
const widths = props.lists.widths;

// props のそれぞれの値の調整
// サイズの max の調整
if (sizes && sizes.ofClock) {
	if (sizes.ofHour) {
		sizes.ofHour.max = sizes.ofClock.max;
	}
	if (sizes.ofMinute) {
		sizes.ofMinute.max = sizes.ofClock.max;
	}
	if (sizes.ofSecond) {
		sizes.ofSecond.max = sizes.ofClock.max;
	}
}

// ドットの位置を計算
const hourDotX = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
		return clockSize / 2 + Math.cos(2 * Math.PI * refHour.value / 12 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const hourDotY = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
		return clockSize / 2 + Math.sin(2 * Math.PI * refHour.value / 12 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const minuteDotX = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
		return clockSize / 2 + Math.cos(2 * Math.PI * refMinute.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const minuteDotY = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
		return clockSize / 2 + Math.sin(2 * Math.PI * refMinute.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const secondDotX = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
		return clockSize / 2 + Math.cos(2 * Math.PI * refSecond.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const secondDotY = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
		return clockSize / 2 + Math.sin(2 * Math.PI * refSecond.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}
</script>

<template>
	<div class="analog-dots-on-circle-clock-container">
		<svg v-if="sizes && sizes.ofClock && colors && widths && dotSizes" :view-box="`0 0 ${sizes.ofClock.reactiveValue.value} ${sizes.ofClock.reactiveValue.value}`" stroke="black" fill="transparent" :width="sizes.ofClock.reactiveValue.value" :height="sizes.ofClock.reactiveValue.value">
			<circle v-if="sizes.ofHour && colors.ofHour && widths.ofHour" :cx="parseInt(sizes.ofClock.reactiveValue.value) / 2" :cy="parseInt(sizes.ofClock.reactiveValue.value) / 2" :r="parseInt(sizes.ofHour.reactiveValue.value) / 2" :stroke="colors.ofHour.reactiveValue.value" :stroke-width="widths.ofHour.reactiveValue.value" />
			<circle v-if="sizes.ofHour && dotSizes.ofHour && colors.ofHour && widths.ofHour" :cx="hourDotX(parseInt(sizes.ofHour.reactiveValue.value))" :cy="hourDotY(parseInt(sizes.ofHour.reactiveValue.value))" :r="parseInt(dotSizes.ofHour.reactiveValue.value) / 2" :fill="colors.ofHour.reactiveValue.value" stroke="transparent" />

			<circle v-if="sizes.ofMinute && colors.ofMinute && widths.ofMinute" :cx="parseInt(sizes.ofClock.reactiveValue.value) / 2" :cy="parseInt(sizes.ofClock.reactiveValue.value) / 2" :r="parseInt(sizes.ofMinute.reactiveValue.value) / 2" :stroke="colors.ofMinute.reactiveValue.value" :stroke-width="widths.ofMinute.reactiveValue.value" />
			<circle v-if="sizes.ofMinute && dotSizes.ofMinute && colors.ofMinute && widths.ofMinute" :cx="minuteDotX(parseInt(sizes.ofMinute.reactiveValue.value))" :cy="minuteDotY(parseInt(sizes.ofMinute.reactiveValue.value))" :r="parseInt(dotSizes.ofMinute.reactiveValue.value) / 2" :fill="colors.ofMinute.reactiveValue.value" stroke="transparent" />

			<circle v-if="sizes.ofSecond && colors.ofSecond && widths.ofSecond" :cx="parseInt(sizes.ofClock.reactiveValue.value) / 2" :cy="parseInt(sizes.ofClock.reactiveValue.value) / 2" :r="parseInt(sizes.ofSecond.reactiveValue.value) / 2" :stroke="colors.ofSecond.reactiveValue.value" :stroke-width="widths.ofSecond.reactiveValue.value" />
			<circle v-if="sizes.ofSecond && dotSizes.ofSecond && colors.ofSecond && widths.ofSecond" :cx="secondDotX(parseInt(sizes.ofSecond.reactiveValue.value))" :cy="secondDotY(parseInt(sizes.ofSecond.reactiveValue.value))" :r="parseInt(dotSizes.ofSecond.reactiveValue.value) / 2" :fill="colors.ofSecond.reactiveValue.value" stroke="transparent" />
		</svg>
	</div>
</template>

<style scoped lang="scss"></style>