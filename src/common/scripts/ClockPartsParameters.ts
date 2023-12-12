import type { InputDataContents } from "./InputDataContents";

export class SingleUnitParameters {
	static heading: string = "empty";
	parameters: InputDataContents[] = []

	constructor() {

	}
};

export type ClockPartsParameters = SingleUnitParameters[];