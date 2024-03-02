import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";

export class AnalogRoundedIrregularityHandParameters extends SingleUnitParameters {
	static readonly staticHeading: string = "丸針 (Aタイプ)";

	heading: string = "丸針 (Aタイプ)";

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
				min: "1",
				max: "300",
				reactiveValue: "#000000",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "length",
				heading: "長さ",
				min: "1",
				max: "300",
				reactiveValue: "150",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "size",
				heading: "根本の大きさ",
				min: "1",
				max: "300",
				reactiveValue: "150",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory1_size",
				heading: "先端の大きさ",
				min: "1",
				max: "300",
				reactiveValue: "150",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory2_size",
				heading: "印の大きさ",
				min: "1",
				max: "300",
				reactiveValue: "150",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "accessory2_color",
				heading: "印の色",
				min: "1",
				max: "300",
				reactiveValue: "#000000",
			}),
		];
	}
}