import { parametersPropertiesArray, type ParametersProperties } from "../object_parameters/ParametersProperties";
import { type SingleUnitParameters } from "../ClockPartsParameters";

type OperationType = "change" | "add" | "remove";

export class ClockOperationContent
// <
// 	Operation extends OperationType,
// 	Target extends ParametersProperties | "layer",
// 	From extends string | SingleUnitParameters,
// 	To extends string
// >
{
	readonly operation: OperationType;
	readonly target: ParametersProperties | "layer";
	readonly from: string | SingleUnitParameters;
	readonly to?: string;

	constructor(operation: OperationType, target: ParametersProperties | "layer", from: string | SingleUnitParameters, to: string);
	constructor(operation: OperationType, target: ParametersProperties | "layer", from: string | SingleUnitParameters);

	constructor(
		operation: OperationType,
		target: ParametersProperties | "layer",
		from: string | SingleUnitParameters,
		to?: string
	) {
		if (target === "layer") {
			if (operation === "remove") {
				if (typeof from === "string") {
					throw "invalid parameters combination";
				}
			}
		}
		else if (parametersPropertiesArray.includes(target)) {
			if (operation === "add" || operation === "remove") {
				throw "invalid parameters combination";
			}
		}

		this.operation = operation;
		this.target = target;
		this.from = from;
		if (to !== undefined) {
			this.to = to;
		}
	}
}