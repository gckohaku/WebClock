import type { ParametersProperties } from "./object_parameters/ParametersProperties";

export interface DataStoredInputData {
	heading: string;
	parameters: {
		propertyCode: ParametersProperties;
		heading: string;
		reactiveValue: string;
	}[]
};