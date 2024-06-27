import { ref } from "vue";
import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";
import { Rectangle } from "@/common/scripts/defines/Rectangle"
import { clockPartsNames } from "./clockPartsNames";

export class DotsOnCircleParameters extends SingleUnitParameters {
	static readonly staticHeading: string = clockPartsNames.analog.dotsOnCircle;

	heading: string = clockPartsNames.analog.dotsOnCircle;
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
				type: "slider",
				propertyCode: "size",
				heading: "円の大きさ",
				min: "1",
				max: "300",
				reactiveValue: "150",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "width",
				heading: "円の幅",
				min: "0",
				max: "50",
				reactiveValue: "5",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "color",
				heading: "円の色",
				reactiveValue: "#000000",
			}),
			new InputDataContents({
				type: "slider",
				propertyCode: "accessory1_size",
				heading: "ドットの大きさ",
				reactiveValue: "10",
			}),
			new InputDataContents({
				type: "color",
				propertyCode: "accessory1_color",
				heading: "ドットの色",
				reactiveValue: "#000000",
			}),
			new InputDataContents({
				type: "select",
				propertyCode: "selectOption",
				heading: "円のスタイル",
				selectOptions: [
					{ value: "solid", viewText: "solid" },
					{ value: "dashed", viewText: "dashed" },
					{ value: "dotted", viewText: "dotted" },
				],
				reactiveValue: "solid",
			}),
			new InputDataContents({
				type: "text",
				propertyCode: "textParameter1",
				heading: "スタイルによるパラメータ",
				display: false,
				reactiveValue: "10 10",
			}),
		]
	}
}