<script setup lang="ts">
import { VueElement, onMounted, ref } from "vue"

// スタイル用リアクティブ変数
const clockSize = ref(300)

const hourSize = ref(150);
const hourColor = ref("blue");
const hourStyle = ref("solid");

const minuteSize = ref(200);
const minuteColor = ref("#4040ff");
const minuteStyle = ref("solid");

const secondSize = ref(250);
const secondColor = ref("#8080ff");
const secondStyle = ref("solid");

const circleWidth = ref(3);

const dotSize = ref(16);

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

</script>

<template>
	<div class="clock-container">
		<div class="clock-body">
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
</template>

<style scoped lang="scss">
$clockSize: v-bind('clockSize + "px"');

$hourSize: v-bind('hourSize + "px"');
$hourColor: v-bind('hourColor');
$hourStyle: v-bind('hourStyle');

$minuteSize: v-bind('minuteSize + "px"');
$minuteColor: v-bind('minuteColor');
$minuteStyle: v-bind('minuteStyle');

$secondSize: v-bind('secondSize + "px"');
$secondColor: v-bind('secondColor');
$secondStyle: v-bind('secondStyle');

$circleWidth: v-bind('circleWidth + "px"');

$dotSize: v-bind('dotSize + "px"');

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
	.clock-body {
		position: relative;
		@include setSize(v-bind(joinUnit(clockSize, "px")));
		box-sizing: border-box;

		.hour-hand {
			position: absolute;
			@include setSize(v-bind(joinUnit(hourSize, "px")));
			@include center($hourSize);

			.circle {
				@include setSize(100%);
				@include noBgCircle($circleWidth, $hourColor, $hourStyle);

				.hour-dot {
					position: absolute;
					@include setSize($dotSize);
					@include bgCircle($hourColor);
					top: v-bind('(circleWidth / 2 - dotSize / 2) + "px"');
					left: v-bind('(hourSize / 2 - dotSize / 2) + "px"');
					transform-origin: 50% calc($hourSize / 2 - $circleWidth / 2 + $dotSize / 2);
					transform: rotate(v-bind('(hour / 12) + "turn"'));
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

				.minute-dot {
					position: absolute;
					@include setSize($dotSize);
					@include bgCircle($minuteColor);
					top: v-bind('(circleWidth / 2 - dotSize / 2) + "px"');
					left: v-bind('(minuteSize / 2 - dotSize / 2) + "px"');
					transform-origin: 50% calc($minuteSize / 2 - $circleWidth / 2 + $dotSize / 2);
					transform: rotate(v-bind('(minute / 60) + "turn"'));
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

				.second-dot {
					position: absolute;
					@include setSize($dotSize);
					@include bgCircle($secondColor);
					top: v-bind('(circleWidth / 2 - dotSize / 2) + "px"');
					left: v-bind('(secondSize / 2 - dotSize / 2) + "px"');
					transform-origin: 50% calc($secondSize / 2 - $circleWidth / 2 + $dotSize / 2);
					transform: rotate(v-bind('(second / 60) + "turn"'));
				}

			}
		}
	}
}
</style>