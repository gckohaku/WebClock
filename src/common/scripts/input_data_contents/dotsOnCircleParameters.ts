import { ref } from "vue";
import type { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";

export const dotsOnCircleParameters: SingleUnitParameters = [
	new InputDataContents({
		type: "slider",
		propertyCode: "offsetX",
		heading: "オフセットX",
		min: "1",
		max: "300",
		reactiveValue: ref("0"),
	}),
	new InputDataContents({
		type: "slider",
		propertyCode: "offsetY",
		heading: "オフセットY",
		min: "1",
		max: "300",
		reactiveValue: ref("0"),
	}),
	new InputDataContents({
		type: "slider",
		propertyCode: "size",
		heading: "円の大きさ",
		min: "1",
		max: "300",
		reactiveValue: ref("150"),
	}),
	new InputDataContents({
		type: "slider",
		propertyCode: "width",
		heading: "円の幅",
		min: "0",
		max: "50",
		reactiveValue: ref("5"),
	}),
	new InputDataContents({
		type: "color",
		propertyCode: "color",
		heading: "円の色",
		reactiveValue: ref("#000000"),
	}),
	new InputDataContents({
		type: "slider",
		propertyCode: "accessory1_size",
		heading: "ドットの大きさ",
		reactiveValue: ref("15"),
	}),
	new InputDataContents({
		type: "slider",
		propertyCode: "accessory1_color",
		heading: "ドットの色",
		min: "1",
		max: "300",
		reactiveValue: ref("#000000"),
	}),
	new InputDataContents({
		type: "select",
		propertyCode: "accessory1_selectOption",
		heading: "円のスタイル",
		selectOptions: ["solid", "dashed", "dotted"],
		reactiveValue: ref("solid"),
	}),
	new InputDataContents({
		type: "text",
		propertyCode: "accessory1_parameterInSelectOption",
		heading: "スタイルによるパラメータ",
		reactiveValue: ref("10 10"),
	}),
]