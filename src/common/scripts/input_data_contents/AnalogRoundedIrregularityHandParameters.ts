import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";
import { clockPartsNames } from "./clockPartsNames";

export class AnalogRoundedIrregularityHandParameters extends SingleUnitParameters {
	static readonly staticHeading: string = clockPartsNames.analog.roundedIrregularityHand;

	heading: string = clockPartsNames.analog.roundedIrregularityHand;

	constructor() {
		super();
		this.parameters = [
			new InputDataContents({
				type: "select",
				propertyCode: "relatedTime",
				heading: "連動させる時間",
				selectOptions: {
					"Analog": [
						{ value: "analog:year", viewText: "Year" },
						{ value: "analog:month", viewText: "Month" },
						{ value: "analog:day", viewText: "Day" },
						{ value: "analog:hour", viewText: "Hour" },
						{ value: "analog:minute", viewText: "Minute" },
						{ value: "analog:second", viewText: "Second" },
						{ value: "analog:millisecond", viewText: "Millisecond" },
					],
					"Digital": [
						{ value: "digital:year", viewText: "Year" },
						{ value: "digital:month", viewText: "Month" },
						{ value: "digital:day", viewText: "Day" },
						{ value: "digital:hour", viewText: "Hour" },
						{ value: "digital:minute", viewText: "Minute" },
						{ value: "digital:second", viewText: "Second" },
						{ value: "digital:millisecond", viewText: "Millisecond" },
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
				type: "color",
				propertyCode: "color",
				heading: "色",
				reactiveValue: "#000000",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "length",
				heading: "長さ",
				min: "1",
				max: "300",
				reactiveValue: "100",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "size",
				heading: "根本の大きさ",
				min: "1",
				max: "50",
				reactiveValue: "15",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory1_size",
				heading: "先端の大きさ",
				min: "1",
				max: "50",
				reactiveValue: "5",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory2_size",
				heading: "印の大きさ",
				min: "1",
				max: "50",
				reactiveValue: "10",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "accessory2_color",
				heading: "印の色",
				reactiveValue: "#40ff40",
			}),
		];
	}
}