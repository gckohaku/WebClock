import type { InputDataContents } from "./InputDataContents";
import { Rectangle } from "./defines/Rectangle";
import type { timeAssociate } from "./timeAssociate";


export class SingleUnitParameters {
	static readonly staticHeading: string = "empty";

	layerName: string = "layer name";
	heading: string = "empty";
	parameters: InputDataContents[] = [];
	layerNumberUntilNow: number = 0;

	calcBorderArea(): Rectangle {
		return new Rectangle(0, 0, 0, 0);
	}
};

export type ClockPartsParameters = SingleUnitParameters[];