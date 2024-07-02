import { SingleUnitParameters } from "@/common/scripts/ClockPartsParameters";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";
import { InputDataContents } from "@/common/scripts/InputDataContents";
import { Vector2 } from "@/common/scripts/defines/Vector2";
import { arrayOfParametersProperties, type ParametersProperties } from "@/common/scripts/object_parameters/ParametersProperties";
import { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { clockParametersStore } from "./clockParameters";
import { dataNamesStore } from "./dataNames";
import { layersStore } from "./layers";

export const historiesStore = defineStore("historiesStore", () => {
	const operationHistory: Ref<ClockOperationContent[]> = ref([]);
	const redoStack: Ref<ClockOperationContent[]> = ref([]);

	const isChangeableTale: Ref<boolean> = ref(false);
	const changeableLayer: Ref<number> = ref(0);
	const changeableTarget: Ref<ParametersProperties | "layer" | "offsetPosition"> = ref("size");
	let currentTimeoutId: number = -1;

	const historySize: number = 100;
	const switchChangeableTime: number = 2000;

	const parameters = clockParametersStore();
	const layers = layersStore();
	const dataNames = dataNamesStore();

	function addOperation(content: ClockOperationContent, isChangeable: boolean = false) {
		isChangeableTale.value = isChangeable;
		if (isChangeable) {
			changeableLayer.value = content.layer;
			changeableTarget.value = content.target;
			currentTimeoutId = setTimeout(() => {
				isChangeableTale.value = false;
			}, switchChangeableTime);
		}

		if (redoStack.value.length > 0) {
			redoStack.value.length = 0;
		}

		operationHistory.value.push(content);
		keepHistoriesMaxLength();
	}

	function changeLastData(data: string | Vector2): void {
		if (!isChangeableTale.value) {
			throw `This operation data is Not changeable.`;
		}

		clearTimeout(currentTimeoutId);

		const tale = operationHistory.value.pop();
		if (tale) {
			if (data === tale.from) {
				isChangeableTale.value = false;
			}
			else {
				operationHistory.value.push(new ClockOperationContent(tale.operation, tale.layer, tale.target, tale.from, data));
				currentTimeoutId = setTimeout(() => {
					isChangeableTale.value = false;
				}, switchChangeableTime);
			}
		}
	}

	function inquiryChangeable(layer: number, target: typeof changeableTarget.value) {
		return (isChangeableTale.value && changeableLayer.value === layer && changeableTarget.value === target);
	}

	function sendUsingSpinSignal() {
		clearTimeout(currentTimeoutId);
	}

	function undo(): void {
		if (operationHistory.value.length > 0) {
			const operation: ClockOperationContent = operationHistory.value.pop()!;
			redoStack.value.push(operation);

			// TODO: 条件分岐を追加
			if (operation.target === "offsetPosition") {
				const params = parameters.currentParameterList[operation.layer];
				const offsetX: InputDataContents = params.parameters.find(p => p.propertyCode === "offsetX")!;
				const offsetY: InputDataContents = params.parameters.find(p => p.propertyCode === "offsetY")!;

				if (operation.from instanceof Vector2) {
					offsetX.reactiveValue = operation.from.x.toString();
					offsetY.reactiveValue = operation.from.y.toString();
				}
			}
			else if (operation.target === "layer") {
				if (operation.operation === "change") {
					if (typeof operation.from === "string") {
						parameters.currentParameterList[operation.layer].layerName = operation.from;
					}
				}
				else if (operation.operation === "swap" && typeof operation.from === "number" && typeof operation.to === "number") {
					const list = parameters.currentParameterList;
					const from = operation.from;
					const to = operation.to;
					[list[from], list[to]] = [list[to], list[from]];
				}
				else if (operation.from instanceof SingleUnitParameters) {
					if (operation.operation === "remove") {
						parameters.currentParameterList.splice(operation.layer, 0, operation.from);
					}
					else if (operation.operation === "add") {
						parameters.currentParameterList.pop();
					}
				}
			}
			else {
				const targetParam: InputDataContents = getTargetParameter(operation);
				targetParam.reactiveValue = operation.from.toString();
			}


			useIndexedDb.storeParameters(dataNames.currentDataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		}
	}

	function redo(): void {
		if (redoStack.value.length > 0) {
			const operation: ClockOperationContent = redoStack.value.pop()!;
			operationHistory.value.push(operation);

			// TODO: 条件分岐を追加
			if (operation.target === "offsetPosition") {
				const params = parameters.currentParameterList[operation.layer];
				const offsetX: InputDataContents = params.parameters.find(p => p.propertyCode === "offsetX")!;
				const offsetY: InputDataContents = params.parameters.find(p => p.propertyCode === "offsetY")!;

				if (operation.to instanceof Vector2) {
					offsetX.reactiveValue = operation.to.x.toString();
					offsetY.reactiveValue = operation.to.y.toString();
				}
			}
			else if (operation.target === "layer") {
				if (operation.operation === "change") {
					if (typeof operation.to === "string") {
						parameters.currentParameterList[operation.layer].layerName = operation.to;
					}
				}
				else if (operation.operation === "swap" && typeof operation.from === "number" && typeof operation.to === "number") {
					const list = parameters.currentParameterList;
					const from = operation.from;
					const to = operation.to;
					[list[from], list[to]] = [list[to], list[from]];
				}
				else if (operation.from instanceof SingleUnitParameters) {
					if (operation.operation === "remove") {
						parameters.currentParameterList.splice(operation.layer, 1);
					}
					else if (operation.operation === "add") {
						parameters.currentParameterList.push(operation.from);
					}
				}
			}
			else {
				const targetParam: InputDataContents = getTargetParameter(operation);

				if (operation.to) {
					targetParam.reactiveValue = operation.to.toString();
				}
			}


			useIndexedDb.storeParameters(dataNames.currentDataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		}
	}

	function removeHistories() {
		operationHistory.value.length = 0;
		redoStack.value.length = 0;
	}

	const keepHistoriesMaxLength = (): void => {
		if (operationHistory.value.length > historySize) {
			operationHistory.value.shift();
		}
	}

	const getTargetParameter = (operation: ClockOperationContent): InputDataContents => {
		if (!operation.target) {
			throw `Undefined "operation.target" Error.`;
		}
		else if (operation.target === "layer" || operation.target === "offsetPosition" || !arrayOfParametersProperties.includes(operation.target)) {
			throw `"operation.target" Type Error.\n${operation.target} is not "ParametersProperties".`;
		}

		const list = parameters.currentParameterList;

		if (list.length <= operation.layer) {
			throw `Invalid "operation.layer" Error.`;
		}

		return list[operation.layer].parameters.find((e) => e.propertyCode === operation.target)!;
	}

	return { operationHistory, redoStack, addOperation, changeLastData, inquiryChangeable, sendUsingSpinSignal, undo, redo, removeHistories };
});