import { createStore, get, keys, set, type UseStore } from "idb-keyval";
import type { Ref } from "vue";
import type { ClockPartsParameters } from "./ClockPartsParameters";

const editParametersStore: UseStore = createStore("gckohaku-web-clock-db", "edit-data-properties");

export const storeParameters = async (keyName: string, parameters: Ref<ClockPartsParameters>): Promise<void> => {
	await set(keyName, parameters, editParametersStore);
}

export const getParameters = async (keyName: string) => {
	await get(keyName, editParametersStore);
}

export const getKeyNames = async (): string[] => {
	return await keys<string>();
}