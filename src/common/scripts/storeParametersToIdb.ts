import { createStore, get, keys, set, type UseStore } from "idb-keyval";
import type { Ref } from "vue";
import type { ClockPartsParameters } from "./ClockPartsParameters";

const editParametersStore: UseStore = createStore("gckohaku-web-clock-db", "edit-data-properties");

export const storeParametersToIdb = async (keyName: string, parameters: ClockPartsParameters): Promise<void> => {
	await set(keyName, parameters, editParametersStore);
}

export const getParametersToIdb = async (keyName: string) => {
	await get(keyName, editParametersStore);
}

export const getKeyNamesFromIdb = async (): Promise<string[]> => {
	return (await keys<string>(editParametersStore));
}