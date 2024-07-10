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
						{ value: "digital:year", viewText: "Year" },
						{ value: "digital:month", viewText: "Month" },
						{ value: "digital:day", viewText: "Day" },
						{ value: "digital:hour", viewText: "Hour" },
						{ value: "digital:minute", viewText: "Minute" },
						{ value: "digital:second", viewText: "Second" },
						{ value: "digital:millisecond", viewText: "Millisecond" },
					],
					"One Digit": [
						{ value: "oneDigit:year[thousand]", viewText: "Year[thousand]" },
						{ value: "oneDigit:year[hundred]", viewText: "Year[hundred]" },
						{ value: "oneDigit:year[ten]", viewText: "Year[ten]" },
						{ value: "oneDigit:year[one]", viewText: "Year[one]" },
						{ value: "oneDigit:month[ten]", viewText: "Month[ten]" },
						{ value: "oneDigit:month[one]", viewText: "Month[one]" },
						{ value: "oneDigit:day[ten]", viewText: "Day[ten]" },
						{ value: "oneDigit:day[one]", viewText: "Day[one]" },
						{ value: "oneDigit:hour[ten]", viewText: "Hour[ten]" },
						{ value: "oneDigit:hour[one]", viewText: "Hour[one]" },
						{ value: "oneDigit:minute[ten]", viewText: "Minute[ten]" },
						{ value: "oneDigit:minute[one]", viewText: "Minute[one]" },
						{ value: "oneDigit:second[ten]", viewText: "Second[ten]" },
						{ value: "oneDigit:second[one]", viewText: "Second[one]" },
						{ value: "oneDigit:millisecond[tenth]", viewText: "Millisecond[tenth]" },
						{ value: "oneDigit:millisecond[hundredth]", viewText: "Millisecond[hundredth]" },
						{ value: "oneDigit:millisecond[thousandth]", viewText: "Millisecond[thousandth]" },
					]
				},
				reactiveValue: "none",
			}),
			new InputDataContents({
				type: "font",
				propertyCode: "font",
				heading: "フォント",
				reactiveValue: "M PLUS 1",
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