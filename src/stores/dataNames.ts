import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import * as useIndexedDb from "@/common/scripts/IndexedDBRelational";

export const dataNamesStore = defineStore("dataNamesStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const dataNames: Ref<string[]> = ref([]);
	const currentDataName: Ref<string> = ref("");

	async function updateDataNames() {
		// await keyNamesFromIdb(dataNames).then(() => console.log(dataNames.value[0]));
		await useIndexedDb.getKeysFromParameters().then(keys => {dataNames.value = keys});
	}

	return { dataNames, currentDataName, updateDataNames };
});