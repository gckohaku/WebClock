import { ref } from "vue";
import { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";

export class DotsOnCircleParameters extends SingleUnitParameters {
	static heading: string = "衛星";
	constructor() {
		super();
		this.dynamicHeading = "衛星";
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
				reactiveValue: "15",
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
				selectOptions: ["solid", "dashed", "dotted"],
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