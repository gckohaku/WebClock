<script setup lang="ts">
import type { InputDataContents } from "@/common/scripts/InputDataContents";
import { nextTick, ref, type Ref } from "vue";

interface Props {
	param: InputDataContents;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"updateParameter": [value: string],
	"getHistory": [before: string, after: string, isChangeable?: boolean],
}>();

const beforeUpdateValue: Ref<string> = ref("");

const formatArea = ref<InstanceType<typeof HTMLInputElement> | null>(null);

const onFocus = (e: FocusEvent) => {
	const target = e.currentTarget as HTMLInputElement;

	beforeUpdateValue.value = target.value;
}

const onUpdateParameter = (e: Event) => {
	const target = e.target as HTMLInputElement;
	const value: string = target.value;

	emit("updateParameter", value);
}

const onUpdateEnd = (e: Event) => {
	const target = e.target as HTMLInputElement;
	const afterValue: string = target.value;

	emit("getHistory", beforeUpdateValue.value, afterValue);
}

const onKeydownEnter = (e: KeyboardEvent) => {
	const formatAreaValue = formatArea.value;

	if (!formatAreaValue) {
		return;
	}

	const target = e.target as HTMLInputElement;
	const afterValue: string = target.value;

	formatAreaValue.blur();

	emit("getHistory", beforeUpdateValue.value, afterValue);
}
</script>

<template>
	<input type="text" :name="param.name" :id="param.id" :value="param.reactiveValue" @focus="(e) => onFocus(e)" @input="(e) => onUpdateParameter(e)" @change="(e) => onUpdateEnd(e)" @keydown.enter="(e) => onKeydownEnter(e)" ref="formatArea" />
</template>

<style scoped lang="scss">
/* style here */
</style>