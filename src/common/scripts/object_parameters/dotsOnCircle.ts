import { ParametersApplicability, type IParametersApplicability } from "./ParametersApplicability";
import {type SingleUnitParameters } from "../ClockPartsParameters";

export const dotsOnCircleParamApplicability = new ParametersApplicability(<IParametersApplicability>{
	lineWidth: true,
	size: true,
	color: true,
	accessory1_size: true,
	accessory1_color: true,
});
