<script setup lang="ts">
import { ref, reactive } from 'vue';
import { DateTime } from '@/common/scripts/DateTime'

const date = reactive(new DateTime());

const clockSize = ref(300);

const hourFontSize = ref(36);
const hourFontColor = ref("#ff0000");

const minuteFontSize = ref(36);
const minuteFontColor = ref("#00ff00");

const secondFontSize = ref(24);
const secondFontColor = ref("#0000ff");

const firstColonFontSize = ref(36);
const firstColonFontColor = ref("#000000");

const secondColonFontSize = ref(36);
const secondColonFontColor = ref("#000000");

const millisecFontSize = ref(20);
const millisecFontColor = ref("#000000");

const dotFontSize = ref(20);
const dotFontColor = ref("#000000");

const prePadding = (targetNum: number, paddingChar: string, digitSize: number = 2): string => {
	return targetNum.toString().padStart(digitSize, paddingChar);
}

let count: number = -1;
let previousTime: DOMHighResTimeStamp;

const updateClock = (time: DOMHighResTimeStamp) => {
	if (count === -1) {
		previousTime = time;
		count = 0;
	}
	if (time - previousTime > 1000) {
		console.log(count * 1000 / (time - previousTime));
		count = 0;
		previousTime = time;
	}
	count++;

	date.update();
	window.requestAnimationFrame(updateClock);
}

window.requestAnimationFrame(updateClock);
</script>

<template>
	<div class="flex-wrapper">
		<div class="digital-regular-clock-body">
			<div class="clock-container">
				<span class="hour-place">{{ prePadding(date.hour, '0') }}</span><span class="first-colon">:</span><span class="minute-place">{{ prePadding(date.minute, '0') }}</span><span class="second-colon">:</span><span class="second-place">{{ prePadding(date.second, '0') }}</span><span class="float-dot">.</span><span class="millisec-place">{{ prePadding(date.millisecond, '0', 3) }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$clockSize: v-bind('clockSize + "px"');

$hourFontSize: v-bind('hourFontSize + "px"');
$hourFontColor: v-bind('hourFontColor');

$minuteFontSize: v-bind('minuteFontSize + "px"');
$minuteFontColor: v-bind('minuteFontColor');

$secondFontSize: v-bind('secondFontSize + "px"');
$secondFontColor: v-bind('secondFontColor');

$firstColonFontSize: v-bind('firstColonFontSize + "px"');
$firstColonFontColor: v-bind('firstColonFontColor');

$secondColonFontSize: v-bind('secondColonFontSize + "px"');
$secondColonFontColor: v-bind('secondColonFontColor');

$dotFontSize: v-bind('dotFontSize + "px"');
$dotFontColor: v-bind('dotFontColor');

$millisecFontSize: v-bind('millisecFontSize + "px"');
$millisecFontColor: v-bind('millisecFontColor');

.flex-wrapper {
	display: flex;
	@include setSize(100%);

	.digital-regular-clock-body {
		@include setSize($clockSize);
		display: flex;
		margin: auto;

		.clock-container {
			margin: auto;
			width: fit-content;
		}

		.hour-place {
			font-size: $hourFontSize;
			color: $hourFontColor;
		}

		.first-colon {
			font-size: $firstColonFontSize;
			color: $secondColonFontColor
		}

		.minute-place {
			font-size: $minuteFontSize;
			color: $minuteFontColor;
		}

		.second-colon {
			font-size: $secondColonFontSize;
			color: $secondColonFontColor;
		}

		.second-place {
			font-size: $secondFontSize;
			color: $secondFontColor;
		}

		.float-dot {
			font-size: $millisecFontSize;
			color: $millisecFontColor;
		}
	}
}
</style>