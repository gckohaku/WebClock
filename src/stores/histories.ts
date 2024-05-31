import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import type { ClockOperationContent } from "@/common/scripts/related-operation-history/ClockOperationContent";

export const histories = defineStore("histories", () => {
	const operationHistory: Ref<ClockOperationContent[]> = ref([]);
	const redoStack: Ref<ClockOperationContent[]> = ref([]);

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

	return { operationHistory, redoStack, undo, redo };
});