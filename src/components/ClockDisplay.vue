<script setup lang="ts">
import { SingleUnitParameters, type ClockPartsParameters } from '@/common/scripts/ClockPartsParameters';
import SvgCircleSolid from './svg-circles/SvgCircleSolid.vue';
import SvgCircleFill from './svg-circles/SvgCircleFill.vue';
import { timeStore } from '@/stores/time';
import type { ParametersProperties } from '@/common/scripts/object_parameters/ParametersProperties';
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';

export interface Props {
	parameters: ClockPartsParameters,
	clockSize: number;
}

const props = withDefaults(defineProps<Props>(), {
	
});

const store = timeStore();
const halfClockSize: number = props.clockSize / 2;

const getParameterValue = (singleUnit: SingleUnitParameters, code: ParametersProperties): string => {
	return singleUnit.parameters.find(el => el.propertyCode === code)?.reactiveValue ?? "error";
}

const getTimeValue = (type: string, time: string): number => {
	if (type === "Analog") {
		return store.time.getTime({begin: timeKind[time], end: timeKind.millisecond});
	}
	else {
		return store.time.getTime({begin: timeKind[time], end: timeKind[time]});
	}
}

const splitSelectTimeType = (select: string): string[] => {
	return select.split(":");
}

const getNormalTimeValue = (selectString: string): number => {
	
	const splitData: string[] = splitSelectTimeType(selectString);
	if (splitData.length < 2) {
		return 0;
	}
	const lowerTime: string = splitData[1].toLowerCase();
	return getTimeValue(splitData[0], lowerTime) / store.time.getFullValueTime(timeKind[lowerTime] * ((lowerTime === "hour") ? 0.5 : 1));
}
</script>

<template>
	<div>
		<svg :view-box="`0 0 ${clockSize} ${clockSize}`" :width="clockSize" :height="clockSize">
			<g v-for="val in props.parameters">
				<SvgCircleSolid :color="getParameterValue(val, 'color')" :cx="Number(getParameterValue(val, 'offsetX')) + halfClockSize" :cy="Number(getParameterValue(val, 'offsetY')) + halfClockSize" :r="Number(getParameterValue(val, 'size')) / 2" :line-width="getParameterValue(val, 'width')" />
				<SvgCircleFill :color="getParameterValue(val, 'accessory1_color')"
				:r="getParameterValue(val, 'accessory1_size')"
				:cx="halfClockSize + Number(getParameterValue(val, 'offsetX')) + (Number(getParameterValue(val, 'size')) / 2) * Math.cos(Math.PI * 2 * getNormalTimeValue(getParameterValue(val, 'relatedTime')) - Math.PI / 2)"
				:cy="halfClockSize + Number(getParameterValue(val, 'offsetY')) + (Number(getParameterValue(val, 'size')) / 2) * Math.sin(Math.PI * 2 * getNormalTimeValue(getParameterValue(val, 'relatedTime')) - Math.PI / 2)" />
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
/* style here */
</style>