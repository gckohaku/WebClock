import type { InputDataContents } from "./InputDataContents";
import type { timeAssociate } from "./timeAssociate";


export class SingleUnitParameters {
	static readonly staticHeading: string = "empty";

	layerName: string = "layer name";
	heading: string = "empty";
	parameters: InputDataContents[] = [];
};

export type ClockPartsParameters = SingleUnitParameters[];