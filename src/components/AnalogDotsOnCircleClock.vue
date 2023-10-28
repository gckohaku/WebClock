<script setup lang="ts">
import { ref } from "vue"

import { analogDotsOnCircleDataList } from "@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import type { UnwrapNestedRefs } from "vue";

const props = defineProps<{
	lists: { [key: string]: { [key: string]: InputDataContents } },
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


const hour = ref(0);
const minute = ref(0);
const second = ref(0);

// 値と単位を連結
const joinUnit = (value: number, unit: string): string => {
	return String(value + unit)
}

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
	second.value = getCurrentSecond(time);
	minute.value = getCurrentMinute(time);
	hour.value = getCurrentHour(time);
}, 30);

// 記述量削減目的の変数
const sizes = props.lists.sizes;
const colors = props.lists.colors;

// props のそれぞれの値の調整
// サイズの max の調整
sizes.ofHour.max = sizes.ofClock.max;
sizes.ofMinute.max = sizes.ofClock.max;
sizes.ofSecond.max = sizes.ofClock.max;

// パスの定義
const circlePath = (size: string) => {
	const numSize: number = parseInt(size);
	const numClockSize: number = parseInt(sizes.ofClock.reactiveValue.value);
	return `M ${numClockSize / 2} ${numClockSize / 2 - numSize / 2} A ${numSize / 2} ${numSize / 2} 0 1 ${numClockSize / 2} ${numClockSize / 2 - numSize / 2}`;
}
</script>

<template>
	<div class="clock-container">
		<div class="analog-dots-on-circle-clock-body">
			<div class="hour-hand">
				<div class="circle">
					<div class="hour-dot"></div>
				</div>

			</div>
			<div class="minute-hand">
				<div class="circle">
					<div class="minute-dot"></div>
				</div>

			</div>
			<div class="second-hand">
				<div class="circle">
					<div class="second-dot"></div>
				</div>

			</div>
		</div>
	</div>
	<div class="analog-dots-on-circle-clock-container">
		<svg :view-box="`0 0 ${sizes.ofClock.reactiveValue.value} ${sizes.ofClock.reactiveValue.value}`" stroke="black" fill="transparent" stroke-width="5" :width="sizes.ofClock.reactiveValue.value" :height="sizes.ofClock.reactiveValue.value">
			<circle :cx="parseInt(sizes.ofClock.reactiveValue.value) / 2" :cy="parseInt(sizes.ofClock.reactiveValue.value) / 2" :r="parseInt(sizes.ofHour.reactiveValue.value) / 2" :stroke="colors.ofHour.reactiveValue.value" />
		</svg>
	</div>
</template>

<style scoped lang="scss">
$clockSize: v-bind('sizes.ofClock.reactiveValue.value + "px"');

$hourSize: v-bind('sizes.ofHour.reactiveValue.value + "px"');
$hourColor: v-bind('hourColor');
$hourStyle: v-bind('hourStyle');

$minuteSize: v-bind('sizes.ofMinute.reactiveValue.value + "px"');
$minuteColor: v-bind('minuteColor');
$minuteStyle: v-bind('minuteStyle');

$secondSize: v-bind('sizes.ofSecond.reactiveValue.value + "px"');
$secondColor: v-bind('secondColor');
$secondStyle: v-bind('secondStyle');

$circleWidth: v-bind('circleWidth + "px"');

$dotSize: v-bind('dotSize + "px"');
$hourDotSize: v-bind('hourDotSize + "px"');
$minuteDotSize: v-bind('minuteDotSize + "px"');
$secondDotSize: v-bind('secondDotSize + "px"');

@mixin setSize($size) {
	width: $size;
	height: $size;
}

@mixin bgCircle($cColor) {
	background-color: $cColor;
	border-radius: 50%;
}

@mixin noBgCircle($cWidth: 3px, $cColor: black, $cBorderStyle: solid) {
	background-color: transparent;
	border-radius: 50%;
	border: $cWidth $cBorderStyle $cColor;
}

@mixin center($handSize) {
	top: calc(calc($clockSize - $handSize) / 2);
	left: calc(calc($clockSize - $handSize) / 2);
}

.clock-container {
	margin: auto;

	.analog-dots-on-circle-clock-body {
		position: relative;
		@include setSize($clockSize);
		box-sizing: border-box;
		z-index: 100;

		.hour-hand {
			position: absolute;
			@include setSize($hourSize);
			@include center($hourSize);

			.circle {
				@include setSize(100%);
				@include noBgCircle($circleWidth, #0000c0, $hourStyle);
				transform: rotate(v-bind('(hour / 12) + "turn"'));
				box-sizing: border-box;

				.hour-dot {
					position: absolute;
					@include setSize($hourDotSize);
					@include bgCircle($hourColor);
					top: calc(calc($circleWidth * -1) / 2 - $hourDotSize / 2);
					left: calc($hourSize / 2 - $hourDotSize / 2);
					transform-origin: 50% calc($hourSize / 2 - $circleWidth / 2 + $hourDotSize / 2);
					z-index: 200;
				}
			}



		}

		.minute-hand {
			position: absolute;
			@include setSize($minuteSize);
			@include center($minuteSize);

			.circle {
				@include setSize(100%);
				@include noBgCircle($circleWidth, $minuteColor, $minuteStyle);
				transform: rotate(v-bind('(minute / 60) + "turn"'));
				box-sizing: border-box;

				.minute-dot {
					position: absolute;
					@include setSize($minuteDotSize);
					@include bgCircle($minuteColor);
					top: calc(calc($circleWidth * -1) / 2 - $minuteDotSize / 2);
					left: calc($minuteSize / 2 - $minuteDotSize / 2);
					z-index: 300;
				}

			}


		}


		.second-hand {
			position: absolute;
			@include setSize($secondSize);
			@include center($secondSize);

			.circle {
				@include setSize(100%);
				@include noBgCircle($circleWidth, $secondColor, $secondStyle);
				transform: rotate(v-bind('(second / 60) + "turn"'));
				box-sizing: border-box;

				.second-dot {
					position: absolute;
					@include setSize($secondDotSize);
					@include bgCircle($secondColor);
					top: calc(calc($circleWidth * -1) / 2 - $secondDotSize / 2);
					left: calc($secondSize / 2 - $secondDotSize / 2);
					z-index: 400;
				}

			}
		}
	}
}
</style>