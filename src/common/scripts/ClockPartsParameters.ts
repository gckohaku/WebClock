import type { InputDataContents } from "./InputDataContents";
import type { timeAssociate } from "./timeAssociate";


export class SingleUnitParameters {
	static readonly heading: string = "empty";
	parameters: InputDataContents[] = [];
	associateClock: string = "none";

	constructor() {
		
	}

	getHeading = (): string => {
		return SingleUnitParameters.heading;
	}
};

export type ClockPartsParameters = SingleUnitParameters[];