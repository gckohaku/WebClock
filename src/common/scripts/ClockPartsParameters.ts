import type { InputDataContents } from "./InputDataContents";
import type { associateType } from "./associateType";

export class SingleUnitParameters {
	static heading: string = "empty";
	dynamicHeading: string = "empty";
	parameters: InputDataContents[] = []
	associateClock: associateType = "none";

	constructor() {
		
	}
};

export type ClockPartsParameters = SingleUnitParameters[];