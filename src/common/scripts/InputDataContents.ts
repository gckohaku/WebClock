import { ref, type Ref } from "vue";

export interface InputDataContents {
	type: string = "slider";
	switchObject?: InputDataContents[];
	heading?: string = "";
	name?: string = "";
	id?: string = "";
	min?: string = "0";
	max?: string = "100";
	step?: string = "1";
	reactiveValue: Ref<string> = ref("0");
}