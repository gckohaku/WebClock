import * as ClassDefines from "./utilities/classDefineUtilities";

interface IClockSettingData {
	dataName: string;
	canvasSize?: {width: number, height: number};
	selectedLayer?: number;
}

const defaultValues = (): IClockSettingData => ({
	dataName: "",
	canvasSize: {width: 300, height: 300},
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