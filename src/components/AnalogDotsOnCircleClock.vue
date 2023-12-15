<script setup lang="ts">
import { ref } from "vue"

import { analogDotsOnCircleDataList } from "@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import type { ClockProperties } from "@/common/ClockProperties";
import { DateTime } from "@/common/scripts/DateTime";
import SvgCircleSolid from "./svg-circles/SvgCircleSolid.vue";
import SvgCircleFill from "./svg-circles/SvgCircleFill.vue";
import { getRefValue } from "@/common/scripts/relatedToReactive"

const props = defineProps<{
	lists: ClockProperties,
}>();

const refHour = ref(0);
const refMinute = ref(0);
const refSecond = ref(0);

const time: DateTime = new DateTime();

const getCurrentSecond = (time: DateTime): number => {
	return time.second + time.millisecond / 1000;
}

const getCurrentMinute = (time: DateTime): number => {
	return time.minute + getCurrentSecond(time) / 60;
}

const getCurrentHour = (time: DateTime): number => {
	return time.hour + getCurrentMinute(time) / 60;
}

setInterval((): void => {
	time.update();
	refSecond.value = getCurrentSecond(time);
	refMinute.value = getCurrentMinute(time);
	refHour.value = getCurrentHour(time);
}, 30);

// 記述量削減目的の変数
const sizes = props.lists.sizes;
const dotSizes = props.lists.dotSizes
const colors = props.lists.colors;
const widths = props.lists.widths;
const dotColors = props.lists.dotColors;

// props のそれぞれの値の調整
// サイズの max の調整
if (sizes && sizes.ofClock) {
	if (sizes.ofHour) {
		sizes.ofHour.max = sizes.ofHour.max;
	}
	if (sizes.ofMinute) {
		sizes.ofMinute.max = sizes.ofMinute.max;
	}
	if (sizes.ofSecond) {
		sizes.ofSecond.max = sizes.ofSecond.max;
	}
}

// ドットの位置を計算
const hourDotX = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue);
		return clockSize / 2 + Math.cos(2 * Math.PI * refHour.value / 12 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const hourDotY = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue);
		return clockSize / 2 + Math.sin(2 * Math.PI * refHour.value / 12 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const minuteDotX = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue);
		return clockSize / 2 + Math.cos(2 * Math.PI * refMinute.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const minuteDotY = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue);
		return clockSize / 2 + Math.sin(2 * Math.PI * refMinute.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const secondDotX = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue);
		return clockSize / 2 + Math.cos(2 * Math.PI * refSecond.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}

const secondDotY = (radius: number): number => {
	if (sizes && sizes.ofClock) {
		const clockSize: number = parseInt(sizes.ofClock.reactiveValue);
		return clockSize / 2 + Math.sin(2 * Math.PI * refSecond.value / 60 - 0.5 * Math.PI) * radius / 2;
	}
	return radius;
}
</script>

<template>
	<div class="analog-dots-on-circle-clock-container">
		<svg v-if="sizes && colors && widths && sizes.ofClock && dotSizes && dotColors" :view-box="`0 0 ${sizes.ofClock.reactiveValue} ${sizes.ofClock.reactiveValue}`" stroke="black" fill="transparent" :width="sizes.ofClock.reactiveValue" :height="sizes.ofClock.reactiveValue">
			<!-- 
			線のスタイルとかも考えると、それぞれの要素をモジュール化したほうがいいかもしれない
			SvgCircleSolid
			SvgCircleDashed
			SvgCircleDotted
			-->

			<SvgCircleSolid v-if="sizes.ofHour && colors.ofHour && widths.ofHour" :cx="Number(getRefValue(sizes.ofClock)) / 2" :cy="Number(getRefValue(sizes.ofClock)) / 2" :r="(Number(getRefValue(sizes.ofHour)) / 2).toString()" :line-width="getRefValue(widths.ofHour)" :color="getRefValue(colors.ofHour)" />
			<SvgCircleFill v-if="sizes.ofHour && dotSizes.ofHour && colors.ofHour && dotColors.ofHour && widths.ofHour" :cx="hourDotX(Number(getRefValue(sizes.ofHour)))" :cy="hourDotY(Number(getRefValue(sizes.ofHour)))" :r="(Number(getRefValue(dotSizes.ofHour)) / 2).toString()" :color="getRefValue(dotColors.ofHour)" />

			<SvgCircleSolid v-if="sizes.ofMinute && colors.ofMinute && widths.ofMinute" :cx="Number(getRefValue(sizes.ofClock)) / 2" :cy="Number(getRefValue(sizes.ofClock)) / 2" :r="(Number(getRefValue(sizes.ofMinute)) / 2).toString()" :line-width="getRefValue(widths.ofMinute)" :color="getRefValue(colors.ofMinute)" />
			<SvgCircleFill v-if="sizes.ofMinute && dotSizes.ofMinute && colors.ofMinute && dotColors.ofMinute && widths.ofMinute" :cx="minuteDotX(Number(getRefValue(sizes.ofMinute)))" :cy="minuteDotY(Number(getRefValue(sizes.ofMinute)))" :r="(Number(getRefValue(dotSizes.ofMinute)) / 2).toString()" :color="getRefValue(dotColors.ofMinute)" />

			<SvgCircleSolid v-if="sizes.ofSecond && colors.ofSecond && widths.ofSecond" :cx="Number(getRefValue(sizes.ofClock)) / 2" :cy="Number(getRefValue(sizes.ofClock)) / 2" :r="(Number(getRefValue(sizes.ofSecond)) / 2).toString()" :line-width="getRefValue(widths.ofSecond)" :color="getRefValue(colors.ofSecond)" />
			<SvgCircleFill v-if="sizes.ofSecond && dotSizes.ofSecond && colors.ofSecond && dotColors.ofSecond && widths.ofSecond" :cx="secondDotX(Number(getRefValue(sizes.ofSecond)))" :cy="secondDotY(Number(getRefValue(sizes.ofSecond)))" :r="(Number(getRefValue(dotSizes.ofSecond)) / 2).toString()" :color="getRefValue(dotColors.ofSecond)" />
		</svg>
	</div>
</template>

<style scoped lang="scss"></style>