import type { ParametersProperties } from "./object_parameters/ParametersProperties";

export class DataStoredInputData {
	heading: string = "";
	parameters: {
		propertyCode: ParametersProperties;
		reactiveValue: string;
	}[] = [];
};