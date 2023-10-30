import type { ClockProperties } from "@/common/ClockProperties";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import { ref } from "vue";

export const analogDotsOnCircleDataList = <ClockProperties>{
	sizes: {
		ofClock: new InputDataContents({
			type: "slider",
			heading: "時計の大きさ",
			max: "300",
			reactiveValue: ref("300"),
		}),
		ofHour: new InputDataContents({
			type: "slider",
			heading: "短針の円の大きさ",
			reactiveValue: ref("150"),
		}),
		ofMinute: new InputDataContents({
			type: "slider",
			heading: "長針の円の大きさ",
			reactiveValue: ref("200"),
		}),
		ofSecond: new InputDataContents({
			type: "slider",
			heading: "秒針の円の大きさ",
			reactiveValue: ref("250"),
		}),
	},
	dotSizes: {
		ofHour: new InputDataContents({
			type: "slider",
			heading: "短針のドットの大きさ",
			min: "1",
			max: "50",
			reactiveValue: ref("20"),
		}),
		ofMinute: new InputDataContents({
			type: "slider",
			heading: "長針のドットの大きさ",
			min: "1",
			max: "50",
			reactiveValue: ref("16"),
		}),
		ofSecond: new InputDataContents({
			type: "slider",
			heading: "秒針のドットの大きさ",
			min: "1",
			max: "50",
			reactiveValue: ref("12"),
		}),
	},
	colors: {
		ofHour: new InputDataContents ({
			type: "color",
			heading: "短針の円の色",
			reactiveValue: ref("#0000ff"),
		}),
		ofMinute: new InputDataContents ({
			type: "color",
			heading: "短針の円の色",
			reactiveValue: ref("#4040ff"),
		}),
		ofSecond: new InputDataContents ({
			type: "color",
			heading: "短針の円の色",
			reactiveValue: ref("#8080ff"),
		}),
	},
	widths: {
		ofHour: new InputDataContents ({
			type: "slider",
			heading: "短針の線の幅",
			min: "1",
			max: "20",
			reactiveValue: ref("3"),
		}),
		ofMinute: new InputDataContents ({
			type: "slider",
			heading: "長針の線の幅",
			min: "1",
			max: "20",
			reactiveValue: ref("3"),
		}),
		ofSecond: new InputDataContents ({
			type: "slider",
			heading: "秒針の線の幅",
			min: "1",
			max: "20",
			reactiveValue: ref("3"),
		}),
	},
}