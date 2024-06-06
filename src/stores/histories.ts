import { type Ref, ref, readonly } from "vue";
import { defineStore } from "pinia";
import { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";
import { layersStore } from "./layers";
import { clockParametersStore } from "./clockParameters";
import type { InputDataContents } from "@/common/scripts/InputDataContents";

export const historiesStore = defineStore("historiesStore", () => {
	const operationHistory: Ref<ClockOperationContent[]> = ref([]);
	const redoStack: Ref<ClockOperationContent[]> = ref([]);

	const historySize: number = 100;

	const parameters = clockParametersStore();
	const layers = layersStore();

	function addOperation(content: ClockOperationContent) {
		operationHistory.value.push(content)
		if (operationHistory.value.length > historySize) {
			operationHistory.value.shift();
		}
	}

	function undo(): void {
		if (operationHistory.value.length) {
			const operation: ClockOperationContent = operationHistory.value.pop()!;
			const targetParam: InputDataContents = parameters.currentParameterList[operation.layer].parameters.find((e) => e.propertyCode === operation.target);
			redoStack.value.push(operation);
		}
	}

	function redo(): void {
		if (redoStack.value.length) {
			operationHistory.value.push(redoStack.value.pop()!);
		}
	}

	return { operationHistory, redoStack, addOperation, undo, redo };
});