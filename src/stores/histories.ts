import { InputDataContents } from "@/common/scripts/InputDataContents";
import { Vector2 } from "@/common/scripts/defines/Vector2";
import { arrayOfParametersProperties, type ParametersProperties } from "@/common/scripts/object_parameters/ParametersProperties";
import { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { clockParametersStore } from "./clockParameters";
import { layersStore } from "./layers";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational"
import { dataNamesStore } from "./dataNames";

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
				console.log("disable changeable");
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
					console.log("disable changeable");
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
		// console.log("undo");
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
			}
			else {
				const targetParam: InputDataContents = getTargetParameter(operation);
				targetParam.reactiveValue = operation.from.toString();
			}


			useIndexedDb.storeParameters(dataNames.currentDataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		}
	}

	function redo(): void {
		// console.log("redo");
		if (redoStack.value.length > 0) {
			const operation: ClockOperationContent = redoStack.value.pop()!;
			operationHistory.value.push(operation);


			if (operation.to) {
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
				}
				else {
					const targetParam: InputDataContents = getTargetParameter(operation);
					targetParam.reactiveValue = operation.to.toString();
				}

			}

			useIndexedDb.storeParameters(dataNames.currentDataId, JSON.parse(JSON.stringify(parameters.currentParameterList)));
		}
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

	return { operationHistory, redoStack, addOperation, changeLastData, inquiryChangeable, sendUsingSpinSignal, undo, redo };
});