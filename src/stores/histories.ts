import { type Ref, ref, readonly } from "vue";
import { defineStore } from "pinia";
import type { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";

export const histories = defineStore("histories", () => {
	const operationHistory: Ref<ClockOperationContent[]> = ref([]);
	const redoStack: Ref<ClockOperationContent[]> = ref([]);

	const historySize: number = 100;

	function addOperation(content: ClockOperationContent) {
		operationHistory.value.push(content)
		if (operationHistory.value.length > historySize) {
			operationHistory.value.shift();
		}
	}

	function undo(): void {
		if (operationHistory.value.length) {
			redoStack.value.push(operationHistory.value.pop()!);
		}
	}

	function redo(): void {
		if (redoStack.value.length) {
			operationHistory.value.push(redoStack.value.pop()!);
		}
	}

	return { operationHistory, redoStack, addOperation, undo, redo };
});