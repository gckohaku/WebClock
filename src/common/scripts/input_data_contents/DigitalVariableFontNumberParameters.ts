import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents, type OptionType } from "../InputDataContents";
import { monthNames } from "../monthNames";
import { clockPartsNames } from "./clockPartsNames";

export class DigitalVariableFontNumberParameters extends SingleUnitParameters {
	static readonly staticHeading: string = clockPartsNames.digital.digitalVariableFontNumber;

	heading: string = clockPartsNames.digital.digitalVariableFontNumber;

	constructor() {
		super();
		this.parameters = [
			new InputDataContents({
				type: "slider",
				propertyCode: "offsetX",
				heading: "オフセットX",
				min: "-300",
				max: "300",
				reactiveValue: "0",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "offsetY",
				heading: "オフセットY",
				min: "-300",
				max: "300",
				reactiveValue: "0",
			}),
			new InputDataContents({
				type: "text",
				propertyCode: "timeFormat",
				heading: "フォーマット文字列",
				reactiveValue: "hh:mm:ss",
			}),
			new InputDataContents({
				type: "select",
				propertyCode: "language",
				heading: "言語",
				selectOptions: [...monthNames].map((m) => <OptionType>{ value: `${m[0]}:${m[1].languageName}`, viewText: `${m[1].languageName}` }),
				reactiveValue: "en:English",
			}),
			new InputDataContents({
				type: "font",
				propertyCode: "font",
				heading: "フォント",
				reactiveValue: "M PLUS 1",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "length",
				heading: "桁数",
				min: "1",
				max: "3",
				step: "1",
				reactiveValue: "2",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "size",
				heading: "フォントサイズ",
				min: "1",
				max: "100",
				step: "1",
				reactiveValue: "24",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "width",
				heading: "文字の太さ",
				min: "100",
				max: "900",
				step: "100",
				reactiveValue: "400",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "color",
				heading: "色",
				reactiveValue: "#000000",
			}),
		]
	}
}