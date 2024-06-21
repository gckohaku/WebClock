import * as ClassDefines from "./utilities/classDefineUtilities";

interface IClockSettingData {
	dataName: string;
	canvasSize?: {width: number, height: number};
	selectedLayer?: number;
}

const defaultValues = (): IClockSettingData => ({
	dataName: "",
	canvasSize: {width: 600, height: 600},
	selectedLayer: 0,
});

export class ClockSettingData implements IClockSettingData {
	dataName: string;
	canvasSize?: {width: number, height: number};
	selectedLayer?: number;

	constructor(init: IClockSettingData = defaultValues()) {
		const wd = ClassDefines.withDefault(init as any, defaultValues());

		this.dataName = wd("dataName");
		this.canvasSize = wd("canvasSize");
		this.selectedLayer = wd("selectedLayer");
	}
}