import type { InputDataContents } from "./InputDataContents";
import type { timeAssociate } from "./timeAssociate";

export interface IParameterList {
	parameterType: string;
	associateClock: timeAssociate;
	parameters: InputDataContents[];
}