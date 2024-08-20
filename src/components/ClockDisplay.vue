<script setup lang="ts">
import { stringDecompression } from '@/common/scripts/utilities/stringEncodings';
import { onBeforeMount, onMounted, ref, type Ref } from 'vue';
import DotsOnCircle from './objects/DotsOnCircle.vue';
import AnalogRoundedAlignedHand from './objects/AnalogRoundedAlignedHand.vue';
import DigitalVariableFontNumber from './objects/DigitalVariableFontNumber.vue';
import { DotsOnCircleParameters } from '@/common/scripts/input_data_contents/DotsOnCircleParameters';
import { AnalogRoundedIrregularityHandParameters } from '@/common/scripts/input_data_contents/AnalogRoundedIrregularityHandParameters';
import { AnalogRoundedAlignedHandParameters } from '@/common/scripts/input_data_contents/AnalogRoundedAlignedHandParameters';
import { DigitalVariableFontNumberParameters } from '@/common/scripts/input_data_contents/DigitalVariableFontNumberParameters';
import type { DisplayClockParameters } from '@/common/scripts/DisplayClockParameters';
import { Vector2 } from '@/common/scripts/defines/Vector2';
import AnalogRoundedIrregularityHand from './objects/AnalogRoundedIrregularityHand.vue';
import { timeStore } from '@/stores/time';

const time = timeStore();

const queryParamData = (new URLSearchParams(window.location.search)).get("d");

if (!queryParamData) {
	throw new Error(`クエリパラメータ "d" が存在しない`);
}

const clockParamsData: Ref<DisplayClockParameters[] | null> = ref(null);
const clockSize = new Vector2(300, 300)

const clockComponentsMap = new Map();
clockComponentsMap.set(DotsOnCircleParameters.staticHeading, DotsOnCircle);
clockComponentsMap.set(AnalogRoundedIrregularityHandParameters.staticHeading, AnalogRoundedIrregularityHand);
clockComponentsMap.set(AnalogRoundedAlignedHandParameters.staticHeading, AnalogRoundedAlignedHand);
clockComponentsMap.set(DigitalVariableFontNumberParameters.staticHeading, DigitalVariableFontNumber);

onBeforeMount(async () => {
	clockParamsData.value = JSON.parse(await stringDecompression(queryParamData));
});

onMounted(() => {
	setInterval(() => time.update(), 16);
});
</script>

<template>
	<div class="clock-display-container">
		<svg class="clock-display-area" :view-box="`0 0 ${clockSize.x} ${clockSize.y}`" :width="clockSize.x" :height="clockSize.y">
			<g v-for="(params, index) of clockParamsData" :key="index" ref="displayZone">
				<component :is="clockComponentsMap.get(params.heading)" :params="params" :clock-size="clockSize"></component>
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>