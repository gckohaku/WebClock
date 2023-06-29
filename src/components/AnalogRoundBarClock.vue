<script setup lang="ts">
import { ref } from "vue"

// スタイル用リアクティブ変数
const clockSize = ref(300)

const hourSize = ref(150);
const hourColor = ref("blue");

const minuteSize = ref(200);
const minuteColor = ref("#4040ff");

const secondSize = ref(250);
const secondColor = ref("#8080ff");

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

</script>

<template>
	<div class="clock-container">
		<div class="analog-round-bar-clock-body">
			<div class="clock-cover">
				<div class="hour-hand">
					<div class="hour-accent"></div>
				</div>
				<div class="minute-hand">
					<div class="minute-accent"></div>
				</div>
				<div class="second-hand">
					<div class="second-accent"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$clockSize: v-bind('clockSize + "px"');

$hourSize: v-bind('hourSize + "px"');
$hourColor: v-bind('hourColor');

$minuteSize: v-bind('minuteSize + "px"');
$minuteColor: v-bind('minuteColor');

$secondSize: v-bind('secondSize + "px"');
$secondColor: v-bind('secondColor');

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

	.analog-round-bar-clock-body {
		position: relative;
		@include setSize(v-bind(joinUnit(clockSize, "px")));
		box-sizing: border-box;
		z-index: 100;

		.clock-cover {

			.hour-hand {
				position: absolute;
				@include setSize(v-bind(joinUnit(hourSize, "px")));
				@include center($hourSize);

				.hour-accent {
					position: absolute;
					@include setSize($hourDotSize);
					@include bgCircle($hourColor);
					top: calc(calc($circleWidth * -1) / 2 - $hourDotSize / 2);
					left: calc($hourSize / 2 - $hourDotSize / 2);
					transform-origin: 50% calc($hourSize / 2 - $circleWidth / 2 + $hourDotSize / 2);
					z-index: 200;
				}
			}



			.minute-hand {
				position: absolute;
				@include setSize($minuteSize);
				@include center($minuteSize);

				.minute-dot {
					position: absolute;
					@include setSize($minuteDotSize);
					@include bgCircle($minuteColor);
					top: calc(calc($circleWidth * -1) / 2 - $minuteDotSize / 2);
					left: calc($minuteSize / 2 - $minuteDotSize / 2);
					z-index: 300;
				}

			}




			.second-hand {
				position: absolute;
				@include setSize($secondSize);
				@include center($secondSize);

				.second-accent {
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