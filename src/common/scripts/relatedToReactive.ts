import { InputDataContents } from "./InputDataContents"

export const getRefValue = (data: InputDataContents): string => {
	return data.reactiveValue.value;
}