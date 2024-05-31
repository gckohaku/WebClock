import { parametersPropertiesArray, type ParametersProperties } from "../object_parameters/ParametersProperties";
import { type SingleUnitParameters } from "../ClockPartsParameters";

type OperationType = "change" | "add" | "remove";

export class ClockOperationContent<
	Operation extends OperationType,
	Target extends ParametersProperties | "layer",
	From extends string | SingleUnitParameters,
	To extends string
> {
	readonly operation: Operation;
	readonly target: Target;
	readonly from: From;
	readonly to?: To;

	constructor(operation: Operation, target: Target, from: From, to: To);
	constructor(operation: Operation, target: Target, from: From);

	constructor(operation: Operation, target: Target, from: From, to?: To) {
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