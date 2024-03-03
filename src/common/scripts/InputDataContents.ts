import * as ClassDefines from "./utilities/classDefineUtilities";
import type { ParametersProperties } from "./object_parameters/ParametersProperties";

type inputType = "slider" | "color" | "text" | "checkbox" | "switch" | "select";

export interface IInputDataContents {
	readonly type: inputType;
	readonly display?: boolean;
	propertyCode: ParametersProperties;
	heading?: string;
	readonly name?: string;
	readonly id?: string;
	readonly min?: string;
	readonly max?: string;
	readonly step?: string;
	readonly selectOptions?: (string[] | {[key: string]: string[]});
	readonly inheritProperty?: Map<string | boolean, ParametersProperties>[];
	reactiveValue: string;
}

const defaultValues = (): IInputDataContents => ({
	type: "slider",
	display: true,
	propertyCode: "size",
	heading: "",
	name: "",
	id: "",
	min: "0",
	max: "100",
	step: "1",
	selectOptions: [],
	inheritProperty: [],
	reactiveValue: "0",
});

export class InputDataContents implements IInputDataContents {
	readonly type: inputType;
	readonly display?: boolean;
	propertyCode: ParametersProperties;
	heading?: string;
	readonly name?: string;
	readonly id?: string;
	readonly min?: string;
	readonly max?: string;
	readonly step?: string;
	readonly selectOptions?: (string[] | {[key: string]: string[]});
	readonly inheritProperty?: Map<string | boolean, ParametersProperties>[];
	reactiveValue: string;

	constructor(init: IInputDataContents = defaultValues()) {
		const wd = ClassDefines.withDefault(init as any, defaultValues());

		this.type = wd("type");
		this.display = wd("display");
		this.propertyCode = wd("propertyCode");
		this.heading = wd("heading");
		this.name = wd("name");
		this.id = wd("id");
		this.min = wd("min");
		this.max = wd("max");
		this.step = wd("step");
		this.selectOptions = wd("selectOptions");
		this.inheritProperty = wd("inheritProperty");
		this.reactiveValue = wd("reactiveValue");
	}
}
