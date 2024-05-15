import type { ParametersProperties } from "./object_parameters/ParametersProperties";

export class DataStoredInputData {
	heading: string = "";
	layerName: string = "Layer Name";
	parameters: {
		propertyCode: ParametersProperties;
		reactiveValue: string;
	}[] = [];
};