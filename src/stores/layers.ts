import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

export const layersStore = defineStore("layersStore", () => {
	const currentSelect: Ref<number> = ref(0);
	const layerNumberUntilNow: Ref<number> = ref(0);

	function incrementLayerNumber(): void {
		layerNumberUntilNow.value++;
	}

	return { currentSelect };
});