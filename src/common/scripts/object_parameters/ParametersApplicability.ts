import * as ClassDefines from "../utilities/classDefineUtilities";

export interface IParametersApplicability {
	offsetX: boolean;
	offsetY: boolean;
	width: boolean;
	height: boolean;
	lineWidth: boolean;
	size: boolean;
	color: boolean;
	accessory1_width: boolean;
	accessory1_height: boolean;
	accessory1_lineWidth: boolean;
	accessory1_size: boolean;
	accessory1_color: boolean;
}

const defaultValues = (): IParametersApplicability => ({
	offsetX: true,
	offsetY: true,
	width: false,
	height: false,
	lineWidth: false,
	size: false,
	color: false,
	accessory1_width: false,
	accessory1_height: false,
	accessory1_lineWidth: false,
	accessory1_size: false,
	accessory1_color: false,
});

export class ParametersApplicability implements IParametersApplicability {
	offsetX: boolean;
	offsetY: boolean;
	width: boolean;
	height: boolean;
	lineWidth: boolean;
	size: boolean;
	color: boolean;
	accessory1_width: boolean;
	accessory1_height: boolean;
	accessory1_lineWidth: boolean;
	accessory1_size: boolean;
	accessory1_color: boolean;

	constructor(init: IParametersApplicability = defaultValues()) {
		const wd = ClassDefines.withDefault(init as any, defaultValues());

		this.offsetX = wd("offsetX");
		this.offsetY = wd("offsetY");
		this.width = wd("width");
		this.height = wd("height");
		this.lineWidth = wd("lineWidth");
		this.size = wd("size");
		this.color = wd("color");
		this.accessory1_width = wd("accessory1_width");
		this.accessory1_height = wd("accessory1_height");
		this.accessory1_lineWidth = wd("accessory1_lineWidth");
		this.accessory1_size = wd("accessory1_size");
		this.accessory1_color = wd("accessory1_color");
	}
}