import { isRef, ref, type Ref } from "vue";
import * as ClassDefines from "./utilities/classDefineUtilities";
import * as TypeUtilities from "./utilities/typeUtilities";

type inputType = "slider" | "color" | "text" | "checkbox" | "switch" | "select";

export interface IInputDataContents {
	type: inputType;
	heading?: string;
	name?: string;
	id?: string;
	min?: string;
	max?: string;
	step?: string;
	reactiveValue: Ref<string>;
}

const defaultValues = (): IInputDataContents => ({
	type: "slider",
	heading: "",
	name: "",
	id: "",
	min: "0",
	max: "100",
	step: "1",
	reactiveValue: ref("0"),
});

export class InputDataContents implements IInputDataContents {
	type: inputType;
	heading?: string;
	name?: string;
	id?: string;
	min?: string;
	max?: string;
	step?: string;
	reactiveValue: Ref<string>;

	constructor(init: IInputDataContents = defaultValues()) {
		const wd = ClassDefines.withDefault(init as any, defaultValues());

		this.type = wd("type");
		this.heading = wd("heading");
		this.name = wd("name");
		this.id = wd("id");
		this.min = wd("min");
		this.max = wd("max");
		this.step = wd("step");
		this.reactiveValue = wd("reactiveValue");
	}

	static isSameClass = (data: unknown): data is InputDataContents => {
		if (typeof data !== "object" || data === null) {
			return false;
		}

		const contents = data as Record<keyof InputDataContents, unknown>;


		if (
			TypeUtilities.isString(contents.type) &&
			TypeUtilities.isString(contents.heading) &&
			TypeUtilities.isString(contents.name) &&
			TypeUtilities.isString(contents.id) &&
			TypeUtilities.isString(contents.min) &&
			TypeUtilities.isString(contents.max) &&
			TypeUtilities.isString(contents.step) &&
			isRef(contents.reactiveValue) &&
			TypeUtilities.isString(contents.reactiveValue.value)
		) {
			return true;
		}

		return false;
	}
}
