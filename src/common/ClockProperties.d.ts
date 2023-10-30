import type { InputDataContents } from "./scripts/InputDataContents"

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