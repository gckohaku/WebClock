import { type Ref, ref, readonly } from "vue";
import { defineStore } from "pinia";
import { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";
import { layersStore } from "./layers";
import { clockParametersStore } from "./clockParameters";
import type { InputDataContents } from "@/common/scripts/InputDataContents";
import ListDevelopView from "@/views/ListDevelopView.vue";
import { arrayOfParametersProperties, type ParametersProperties } from "@/common/scripts/object_parameters/ParametersProperties";
import type { Vector2 } from "@/common/scripts/defines/Vector2";

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
			const targetParam: InputDataContents = getTargetParameter(operation);
			targetParam.reactiveValue = operation.from.toString();
		}
	}

	function redo(): void {
		// console.log("redo");
		if (redoStack.value.length > 0) {
			const operation: ClockOperationContent = redoStack.value.pop()!;
			operationHistory.value.push(operation);

			// TODO: 条件分岐を追加
			if (operation.to) {
				const targetParam: InputDataContents = getTargetParameter(operation);
				targetParam.reactiveValue = operation.to.toString();
				return;
			}
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