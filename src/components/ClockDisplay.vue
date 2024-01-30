<script setup lang="ts">
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import SvgCircleSolid from './svg-circles/SvgCircleSolid.vue';
import SvgCircleFill from './svg-circles/SvgCircleFill.vue';
import { timeStore } from '@/stores/time';
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';
import type { Rectangle } from '@/common/scripts/defines/Rectangle';
import { calcBorderArea } from '@/common/scripts/input_data_contents/calcBorderArea';
import { layersStore } from '@/stores/layers';
import DotsOnCircle from './objects/DotsOnCircle.vue';

export interface Props {
	parameters: ClockPartsParameters,
	clockSize: number;
}

const props = withDefaults(defineProps<Props>(), {

});

const storeLayers = layersStore();

const store = timeStore();
const halfClockSize: number = props.clockSize / 2;

const componentMap = new Map();
componentMap.set("衛星", DotsOnCircle);

const getRectParams = (params: SingleUnitParameters): Rectangle => {
	return calcBorderArea[params.heading](params);
}
</script>

<template>
	<div>
		<svg :view-box="`0 0 ${clockSize} ${clockSize}`" :width="clockSize" :height="clockSize">
			<g v-for="(val, index) in props.parameters" key="clock-display">
				<DotsOnCircle v-if="val.heading === '衛星'" :params="val" :clock-size="clockSize" />
				<rect :x="getRectParams(val).x + halfClockSize" :y="getRectParams(val).y + halfClockSize" :width="getRectParams(val).width" :height="getRectParams(val).height" fill-opacity="0" stroke-width="1" :stroke-opacity="(storeLayers.currentSelect === index) ? 1 : 0" color="black" stroke="black"></rect>
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>