import type { InputDataContents } from "./InputDataContents";
import type { timeAssociate } from "./timeAssociate";


export class SingleUnitParameters {
	static heading: string = "empty";
	dynamicHeading: string = "empty";
	parameters: InputDataContents[] = []
	associateClock: string = "none";

	constructor() {
		
	}
};

export type ClockPartsParameters = SingleUnitParameters[];