<script setup lang="ts">
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';
import { calcBorderArea } from '@/common/scripts/input_data_contents/calcBorderArea';
import { timeStore } from '@/stores/time';
import { nextTick, onMounted, type ComputedRef } from 'vue';
import { computed, onUpdated, ref, type Ref } from 'vue';
import { Head } from "@unhead/vue/components";
import { webFonts } from '@/common/scripts/fonts/webFonts';
import { replaceDateTimeFormats } from '@/common/scripts/dateTimeFormats';
import type { DateTime } from '@/common/scripts/DateTime';
import type { Vector2 } from '@/common/scripts/defines/Vector2';
import type { DisplayClockParameters } from '@/common/scripts/DisplayClockParameters';
import { getParameterValue } from '@/common/scripts/clockRelational';

export interface Props {
	params: SingleUnitParameters | DisplayClockParameters;
	clockSize: Vector2;
	isRectView?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	isRectView: false,
});

const time = timeStore();

const halfClockSizeX: ComputedRef<number> = computed(() => props.clockSize.x / 2);
const halfClockSizeY: ComputedRef<number> = computed(() => props.clockSize.y / 2);

const color = computed(() => getParameterValue(props.params, "color"));
const size = computed(() => getParameterValue(props.params, "size"));
const weight = computed(() => getParameterValue(props.params, "width"));
const offsetX = computed(() => Number(getParameterValue(props.params, "offsetX")) + halfClockSizeX.value);
const offsetY = computed(() => Number(getParameterValue(props.params, "offsetY")) + halfClockSizeY.value);
const timeFormat = computed(() => getParameterValue(props.params, "timeFormat"));

const digitValue = computed(() => Number(getParameterValue(props.params, "length")));

const displayTime = computed(() => replaceDateTimeFormats(getParameterValue(props.params, "timeFormat"), time.time as DateTime, getParameterValue(props.params, "language").split(":")[0]));
const fontName = computed(() => getParameterValue(props.params, "font"));
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

	<rect v-if="isRectView" :x="rectX + halfClockSizeX" :y="rectY + halfClockSizeY" :width="rectWidth" :height="rectHeight" fill-opacity="0" stroke-width="1" stroke-opacity="1" color="black" stroke="black" stroke-dasharray="3 3"></rect>
</template>

<style scoped lang="scss">
/* style here */
</style>