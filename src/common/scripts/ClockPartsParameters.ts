import type { InputDataContents } from "./InputDataContents";
import type { timeAssociate } from "./timeAssociate";


export class SingleUnitParameters {
	static readonly staticHeading: string = "empty";

	heading: string = "empty";
	parameters: InputDataContents[] = [];
	associateClock: string = "none";
};

export type ClockPartsParameters = SingleUnitParameters[];