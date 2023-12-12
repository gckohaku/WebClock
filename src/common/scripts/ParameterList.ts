import type { InputDataContents } from "./InputDataContents";
import type { associateType } from "./associateType";

export interface IParameterList {
	parameterType: string;
	associateClock: associateType;
	parameters: InputDataContents[];
}