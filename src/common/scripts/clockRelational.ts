import App from "@/App.vue"

import { timeStore } from "@/stores/time";
import type { SingleUnitParameters } from "./ClockPartsParameters";
import type { ParametersProperties } from "./object_parameters/ParametersProperties";
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';
import type { DateTime } from "./DateTime";

export const getParameterValue = (singleUnit: SingleUnitParameters, code: ParametersProperties): string => {
	return singleUnit.parameters.find(el => el.propertyCode === code)?.reactiveValue ?? "error";
}

export const getTimeValue = (type: string, time: string, date: DateTime): number => {
	if (type === "Analog") {
		return date.getTime({begin: timeKind[time], end: timeKind.millisecond});
	}
	else {
		return date.getTime({begin: timeKind[time], end: timeKind[time]});
	}
}

export const splitSelectTimeType = (select: string): string[] => {
	return select.split(":");
}

export const getNormalTimeValue = (selectString: string, date: DateTime): number => {
	
	const splitData: string[] = splitSelectTimeType(selectString);
	if (splitData.length < 2) {
		return 0;
	}
	const lowerTime: string = splitData[1].toLowerCase();
	return getTimeValue(splitData[0], lowerTime, date) / date.getFullValueTime(timeKind[lowerTime] * ((lowerTime === "hour") ? 0.5 : 1));
}