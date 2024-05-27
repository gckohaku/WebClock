import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";
import { clockPartsNames } from "./clockPartsNames";

export class AnalogRoundedAlignedHandParameters extends SingleUnitParameters {
	static readonly staticHeading: string = clockPartsNames.analog.roundedAlignedHand;

	heading: string = clockPartsNames.analog.roundedAlignedHand;

	constructor() {
		super();
		this.parameters = [
			new InputDataContents({
				type: "select",
				propertyCode: "relatedTime",
				heading: "連動させる時間",
				selectOptions: {
					"Analog": [
						"Year", "Month", "Day", "Hour", "Minute", "Second", "Millisecond",
					],
					"Digital": [
						"Year", "Month", "Day", "Hour", "Minute", "Second", "Millisecond",
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
				heading: "針の太さ",
				min: "1",
				max: "50",
				reactiveValue: "12",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory2_size",
				heading: "印の大きさ",
				min: "1",
				max: "50",
				reactiveValue: "6",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "accessory2_color",
				heading: "印の色",
				reactiveValue: "#40ff40",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory1_length",
				heading: "先端の印の長さ",
				min: "1",
				max: "100",
				reactiveValue: "15",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory1_offsetY",
				heading: "先端の印の位置",
				min: "0",
				max: "300",
				reactiveValue: "0",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory1_lineWidth",
				heading: "先端の印の太さ",
				min: "1",
				max: "50",
				reactiveValue: "5",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "accessory1_color",
				heading: "先端の印の色",
				reactiveValue: "#40ff40",
			}),
		];
	}
}