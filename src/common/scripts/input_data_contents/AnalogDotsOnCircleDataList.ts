import { InputDataContents } from "@/common/scripts/InputDataContents";
import { ref } from "vue";

export const analogDotsOnCircleDataList = {
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
	colors: {
		ofHour: new InputDataContents ({
			type: "color",
			heading: "短針の円の色",
			reactiveValue: ref("blue"),
		}),
	},
}