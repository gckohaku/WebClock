import type { ParametersProperties } from "./object_parameters/ParametersProperties";

export interface DisplayClockParameters {
	heading: string;
	parameters: {
		propertyCode: ParametersProperties;
		reactiveValue: string;
	}[];
}