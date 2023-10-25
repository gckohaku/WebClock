import { InputDataContents } from "@/common/scripts/InputDataContents";
import { ref } from "vue";

export const analogDotsOnCircleDataList = {
	sizes: {
		ofClock: new InputDataContents({
			type: "slider",
			heading: "時計の大きさ",
			reactiveValue: ref("50"),
		}),
		ofHour: new InputDataContents({
			type: "slider",
			heading: "短針の円の大きさ",
			reactiveValue: ref("20"),
		}),
		ofMinute: new InputDataContents({
			type: "slider",
			heading: "長針の円の大きさ",
			reactiveValue: ref("75"),
		}),
		ofSecond: new InputDataContents({
			type: "slider",
			heading: "秒針の円の大きさ",
			reactiveValue: ref("10"),
		}),
	}
}