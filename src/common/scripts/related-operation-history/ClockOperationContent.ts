import {type ParametersProperties} from "../object_parameters/ParametersProperties";
import {type SingleUnitParameters} from "../ClockPartsParameters";

type OperationType = "change" | "add" | "remove";

export type ClockOperationContent<Operation extends OperationType, Target extends ParametersProperties | "layer", From extends string | SingleUnitParameters, To extends string> = To extends undefined ? [Operation, Target, From] : [Operation, Target, From, To]