// import { createStore, del, get, keys, set, type UseStore } from "idb-keyval";
// import type { Ref } from "vue";
// import type { ClockPartsParameters } from "./ClockPartsParameters";

// const editParametersStore: UseStore = createStore("gckohaku-web-clock-db", "edit-data-properties");

// export const storeParametersToIdb = async (keyName: string, parameters: ClockPartsParameters): Promise<void> => {
// 	await set(keyName, parameters, editParametersStore);
// }

// export const parametersFromIdb = async <T>(keyName: string, target: Ref<T>): Promise<void> => {
// 	await get<T>(keyName, editParametersStore).then((params) => { if (typeof params !== "undefined") { target.value = params } });
// }

// export const keyNamesFromIdb = async (target: Ref<string[]>): Promise<void> => {
// 	await keys<string>(editParametersStore).then((names) => { target.value = names });
// }

// export const beforeEditDataIdStore: UseStore = createStore("gckohaku-before-edit-db", "before-edit-data-id");

// export const storeEditDataId = async (id: string): Promise<void> => {
// 	await set("beforeEditDataId", id, beforeEditDataIdStore)
// }

// export const beforeReloadParametersFromIdb = async (titleTarget: Ref<string>, paramsTarget: Ref<ClockPartsParameters>) => {
// 	await get("beforeEditDataId", beforeEditDataIdStore).then(async (id: string) => {
// 		titleTarget.value = id;
// 		await get(id, editParametersStore).then((params: ClockPartsParameters) => {
// 			if (typeof params === "undefined") {
// 				paramsTarget.value = [];
// 			}
// 			else {
// 				paramsTarget.value = params;
// 			}
// 		});
// 	});
// }

// export const deleteDataFromIdb = async (id: string): Promise<void> => {
// 	await del(id, editParametersStore);
// 	await storeEditDataId("");
// }