import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";
import { clockPartsNames } from "./clockPartsNames";

export class DigitalVariableFontNumberParameters extends SingleUnitParameters {
	static readonly staticHeading: string = clockPartsNames.digital.digitalVariableFontNumber;

	heading: string = clockPartsNames.digital.digitalVariableFontNumber;

	constructor() {
		super();
		this.parameters = [
			new InputDataContents({
				type: "select",
				propertyCode: "relatedTime",
				heading: "連動させる時間",
				selectOptions: {
					"Digital": [
						"Year", "Month", "Day", "Hour", "Minute", "Second", "Millisecond",
					],
					"One Digit": [
						"Year[thousand]", "Year[hundred]", "Year[ten]", "Year[one]",
						"Month[ten]", "Month[one]",
						"Day[ten]", "Day[one]",
						"Hour[ten]", "Hour[one]",
						"Minute[ten]", "Minute[one]",
						"Second[ten]", "Second[one]",
						"Millisecond[tenth]", "Millisecond[hundredth]", "Millisecond[thousandth]",
					]
				},
				reactiveValue: "none",
			}),
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