import { arrayOfParametersProperties, type ParametersProperties } from "../object_parameters/ParametersProperties";
import { SingleUnitParameters } from "../ClockPartsParameters";
import { Vector2 } from "../defines/Vector2";

type OperationType = "change" | "add" | "remove";
type TargetType = ParametersProperties | "layer" | "offsetPosition";
// type FromType = string | SingleUnitParameters | Vector2;
// type ToType = string | Vector2;

export class ClockOperationContent {
	readonly operation: OperationType;
	readonly layer: number;
	readonly target: TargetType;
	readonly from: string | SingleUnitParameters | Vector2;
	readonly to?: string | Vector2;

	constructor(operation: OperationType, layer: number, target: TargetType, from: string | SingleUnitParameters | Vector2, to: string | Vector2);
	constructor(operation: OperationType, layer: number, target: TargetType, from: string | SingleUnitParameters | Vector2);

	constructor(operation: OperationType, layer: number, target: TargetType, from: string | SingleUnitParameters | Vector2, to?: string | Vector2) {
		if (target === "layer") {
			if (operation === "remove" && !(from instanceof SingleUnitParameters)) {
					throw `Invalid Parameters Combination.\nIf "target" is "layer" and "operation" is "remove", must be the type of "from" is "SingleUnitParameters".`;
				}
			}
		else if (target === "offsetPosition") {
			if (operation !== "change" && (!(from instanceof Vector2) || !(to instanceof Vector2))) {
				throw `Invalid Parameters Combination.\nIf "target" is "offsetPosition" and "operation" is "change", must be the type of "from" and "to" are "Vector2".`;
			}
		}
		else if (arrayOfParametersProperties.includes(target)) {
			if (operation !== "change") {
				throw `Invalid Parameters Combination.\nIf the type of "target" is "ParametersProperties", must be "operation" is "change".`;
			}
		}
		else {
			throw `invalid target (${target})`;
		}

		this.operation = operation;
		this.layer = layer;
		this.target = target;
		this.from = from;
		if (to !== undefined) {
			this.to = to;
		}
	}
}