import { timeStore } from "@/stores/time";
import type { SingleUnitParameters } from "./ClockPartsParameters";
import type { ParametersProperties } from "./object_parameters/ParametersProperties";
import { arrayOfKindOfDateTime as timeKind } from '@/common/scripts/timeAssociate';
import type { DateTime } from "./DateTime";

export const getParameterValue = (singleUnit: SingleUnitParameters, code: ParametersProperties): string => {
	return singleUnit.parameters.find(el => el.propertyCode === code)?.reactiveValue ?? "error";
}

export const getTimeValue = (type: string, time: string, date: DateTime): number => {
	if (typeof time !== "string") {
		return Number.NEGATIVE_INFINITY;
	}

	if (type === "analog") {
		return date.getTime({begin: timeKind[time], end: timeKind.millisecond});
	}
	else if (type === "digital") {
		return date.getTime({begin: timeKind[time], end: timeKind[time]});
	}
	else {
		const matchTime = time.match(/(?<kind>\w+)\[(?<digit>\w+)\]/);
		if (matchTime) {
			if(matchTime.groups) {
				const kind = matchTime.groups.kind;
				const digit = matchTime.groups.digit;
				const actuaryTime = date.getTime({begin: timeKind[kind], end: timeKind[kind]});

				if (digit === "one" || digit === "thousandth") {
					return actuaryTime % 10;
				}
				if (digit === "ten" || digit === "hundredth") {
					return Math.floor(actuaryTime % 100 / 10);
				}
				if (digit === "hundred" || digit === "tenth") {
					return Math.floor(actuaryTime % 1000 / 100);
				}
				if (digit === "thousand") {
					return Math.floor(actuaryTime / 1000);
				}
			}
		}
	}

	return -1;
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