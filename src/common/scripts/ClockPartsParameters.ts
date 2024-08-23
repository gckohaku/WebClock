import { errorHeaders } from "../errorHeaders";
import type { InputDataContents } from "./InputDataContents";
import { Rectangle } from "./defines/Rectangle";
import type { ParametersProperties } from "./object_parameters/ParametersProperties";


export class SingleUnitParameters {
	static readonly staticHeading: string = "empty";

	layerName: string = "レイヤー #";
	heading: string = "empty";
	parameters: InputDataContents[] = [];

	// calcBorderArea(): Rectangle {
	// 	return new Rectangle(0, 0, 0, 0);
	// }

	getParameterValue(code: ParametersProperties): string {
		const param = this.parameters.find((e) => e.propertyCode === code)

		if (param) {
			return param.reactiveValue;
		}

		console.warn(`${errorHeaders.singleUnitParametersError}\n${code} is undefined param`);
		return "error";
	}
};

export type ClockPartsParameters = SingleUnitParameters[];