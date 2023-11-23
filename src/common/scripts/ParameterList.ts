import type { InputDataContents } from "./InputDataContents";

type associateType = "hour" | "minute" | "second" | "millisecond" | "floatHour" | "floatMinute" | "floatSecond" | "floatHourUntilSecond" | "floatHourUntilMinute" | "floatMinuteUntilSecond"

export interface IParameterList {
	heading: string;
	associateClock: associateType;
	parameters: InputDataContents[];
	isApplicable: {[key: string]: boolean}
}