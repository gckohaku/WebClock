import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { keyNamesFromIdb } from "@/common/scripts/storeParametersToIdb";

export const dataNamesStore = defineStore("dataNamesStore", () => {
	// 型アサーションは型推論が適切に行えるように (参考: https://github.com/vuejs/core/issues/2981)
	const dataNames: Ref<string[]> = ref([]);

	async function updateDataNames() {
		await keyNamesFromIdb(dataNames).then(() => console.log(dataNames.value[0]));
	}

	return { dataNames, updateDataNames };
});