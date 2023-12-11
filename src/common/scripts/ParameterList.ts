import type { InputDataContents } from "./InputDataContents";

type associateType = "hour" | "minute" | "second" | "millisecond" | "floatHour" | "floatMinute" | "floatSecond" | "floatHourUntilSecond" | "floatHourUntilMinute" | "floatMinuteUntilSecond" | "none";

export interface IParameterList {
	parameterType: string;
	associateClock: associateType;
	parameters: InputDataContents[];
}