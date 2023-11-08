import { ref } from "vue";
import type { SingleUnitParameters } from "../ClockPartsParameters";
import { InputDataContents } from "../InputDataContents";

export const dotsOnCircleParameters: SingleUnitParameters = [
	new InputDataContents({
		type: "slider",
		heading: "オフセットX",
		min: "1",
		max: "300",
		reactiveValue: ref("50"),
	}),
	new InputDataContents({
		type: "slider",
		heading: "オフセットY",
		min: "1",
		max: "300",
		reactiveValue: ref("50"),
	}),
	new InputDataContents({
		type: "slider",
		heading: "円の大きさ",
		min: "1",
		max: "300",
		reactiveValue: ref("50"),
	}),
	new InputDataContents({
		type: "slider",
		heading: "円の幅",
		min: "0",
		max: "50",
		reactiveValue: ref("50"),
	}),
	new InputDataContents({
		type: "color",
		heading: "円の色",
		reactiveValue: ref("#000000"),
	}),
	new InputDataContents({
		type: "slider",
		heading: "ドットの大きさ",
		reactiveValue: ref("50"),
	}),
	new InputDataContents({
		type: "slider",
		heading: "ドットの色",
		min: "1",
		max: "300",
		reactiveValue: ref("#000000"),
	}),
	new InputDataContents({
		type: "select",
		heading: "円のスタイル",
		selectOptions: ["solid", "dashed", "dotted"],
		reactiveValue: ref("solid"),
	}),
]