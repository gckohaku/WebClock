import { ref, type Ref } from "vue";
import * as Gc from "./classDefineUtil";

type inputType = "slider" | "color" | "text" | "checkbox" | "switch" | "select";

export interface IInputDataContents {
	type: inputType;
	switchObject?: InputDataContents[];
	heading?: string;
	name?: string;
	id?: string;
	min?: string;
	max?: string;
	step?: string;
	reactiveValue: Ref<string>;
}

interface IInputDataContentsPartial extends Partial<Gc.Omit<IInputDataContents, "switchObject">> {
	switchObject?: {
		type: inputType;
		switchObject?: InputDataContents[];
		heading?: string;
		name?: string;
		id?: string;
		min?: string;
		max?: string;
		step?: string;
		reactiveValue: Ref<string>;
	}
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
	switchObject?: InputDataContents[];
	heading?: string;
	name?: string;
	id?: string;
	min?: string;
	max?: string;
	step?: string;
	reactiveValue: Ref<string>;

	constructor(init: IInputDataContents = defaultValues()) {
		const wd = Gc.withDefault(init as any, defaultValues());

		this.type = wd("type");
		this.switchObject = wd("switchObject");
		this.heading = wd("heading");
		this.name = wd("name");
		this.id = wd("id");
		this.min = wd("min");
		this.max = wd("max");
		this.step = wd("step");
		this.reactiveValue = wd("reactiveValue");
	}
}
