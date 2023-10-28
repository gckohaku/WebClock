import type { InputDataContents } from "./scripts/InputDataContents"

interface InputDataContentsList {
	sizes?: {
		ofClock?: InputDataContents;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
	colors?: {
		ofClock?: InputDataContents;
		ofHour?: InputDataContents;
		ofMinute?: InputDataContents;
		ofSecond?: InputDataContents;
	}
}