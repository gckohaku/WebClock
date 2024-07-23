<script setup lang="ts">
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import { calcBorderArea } from '@/common/scripts/input_data_contents/calcBorderArea';
import { timeStore } from '@/stores/time';
import { nextTick, onMounted } from 'vue';
import { computed, onUpdated, ref, type Ref } from 'vue';
import { Head } from "@unhead/vue/components";
import { webFonts } from '@/common/scripts/fonts/webFonts';
import { format } from "@formkit/tempo";
import { replaceDateTimeFormats } from '@/common/scripts/dateTimeFormats';
import type { DateTime } from '@/common/scripts/DateTime';

export interface Props {
	params: SingleUnitParameters;
	clockSize: number;
	isRectView: boolean;
}

const props = defineProps<Props>();

const time = timeStore();

const halfClockSize = props.clockSize / 2;

const color = computed(() => props.params.getParameterValue("color"));
const size = computed(() => props.params.getParameterValue("size"));
const weight = computed(() => props.params.getParameterValue("width"));
const offsetX = computed(() => Number(props.params.getParameterValue("offsetX")) + halfClockSize);
const offsetY = computed(() => Number(props.params.getParameterValue("offsetY")) + halfClockSize);
const timeFormat = computed(() => props.params.getParameterValue("timeFormat"));

const digitValue = computed(() => Number(props.params.getParameterValue("length")));

const displayTime = computed(() => replaceDateTimeFormats(props.params.getParameterValue("timeFormat"), time.time as DateTime, props.params.getParameterValue("language").split(":")[0]));
const fontName = computed(() => props.params.getParameterValue("font"));
const font = computed(() => webFonts[fontName.value]);

const textObj: Ref<SVGGElement | null> = ref(null);

const rectX = ref(0);
const rectY = ref(0);
const rectWidth = ref(0);
const rectHeight = ref(0);

const updateRect = async () => {
	if (!props.isRectView) {
		return;
	}

	await nextTick();

	if (textObj.value) {
		const rect = calcBorderArea[props.params.heading](props.params, textObj.value);
		rectX.value = rect.x;
		rectY.value = rect.y;
		rectWidth.value = rect.width;
		rectHeight.value = rect.height;
	}
}

onMounted(updateRect);

onUpdated(updateRect);

console.log(displayTime.value, time.time.second);
</script>

<template>
	<Head>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
		<link :href="font.url" rel="stylesheet">
	</Head>

	<text :x="offsetX" :y="offsetY" :fill="color" :style="{ fontSize: size, fontWeight: weight, userSelect: 'none', fontFamily: font.fontFamily }" dominant-baseline="middle" text-anchor="middle" ref="textObj" class="time-text">{{ displayTime }}</text>

	<rect v-if="isRectView" :x="rectX + halfClockSize" :y="rectY + halfClockSize" :width="rectWidth" :height="rectHeight" fill-opacity="0" stroke-width="1" stroke-opacity="1" color="black" stroke="black" stroke-dasharray="3 3"></rect>
</template>

<style scoped lang="scss">
/* style here */
</style>