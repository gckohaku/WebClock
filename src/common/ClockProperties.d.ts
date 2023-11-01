import type { InputDataContents } from "./scripts/InputDataContents"

type ClockProperties = {[key: string]: {[key: string]: (InputDataContents | string)}};

interface ClockProperties {
	sizes?: {
		heading?: string;
		ofClock?: InputDataContents;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
	dotSizes?: {
		heading?: string;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
	colors?: {
		heading?: string;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
	dotColors?: {
		heading?: string;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
	widths?: {
		heading?: string;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
}