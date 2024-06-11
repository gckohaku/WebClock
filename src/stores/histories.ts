import { type Ref, ref, readonly } from "vue";
import { defineStore } from "pinia";
import { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";
import { layersStore } from "./layers";
import { clockParametersStore } from "./clockParameters";
import type { InputDataContents } from "@/common/scripts/InputDataContents";
import ListDevelopView from "@/views/ListDevelopView.vue";
import { arrayOfParametersProperties } from "@/common/scripts/object_parameters/ParametersProperties";

export const historiesStore = defineStore("historiesStore", () => {
	const operationHistory: Ref<ClockOperationContent[]> = ref([]);
	const redoStack: Ref<ClockOperationContent[]> = ref([]);

	const historySize: number = 100;

	const parameters = clockParametersStore();
	const layers = layersStore();

	function addOperation(content: ClockOperationContent) {
		if (redoStack.value.length > 0) {
			redoStack.value.length = 0;
		}

		operationHistory.value.push(content);
		keepHistoriesMaxLength();
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

	return { operationHistory, redoStack, addOperation, undo, redo };
});