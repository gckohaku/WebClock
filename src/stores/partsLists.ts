import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import type { SingleUnitParameters } from "@/common/scripts/ClockPartsParameters";
import { AnalogRoundedAlignedHandParameters } from "@/common/scripts/input_data_contents/AnalogRoundedAlignedHandParameters";
import { AnalogRoundedIrregularityHandParameters } from "@/common/scripts/input_data_contents/AnalogRoundedIrregularityHandParameters";
import { DotsOnCircleParameters } from "@/common/scripts/input_data_contents/DotsOnCircleParameters";
import { DigitalVariableFontNumberParameters } from "@/common/scripts/input_data_contents/DigitalVariableFontNumberParameters";

export const partsListsStore = defineStore("partsListsStore", () => {
	const partsList: Ref<typeof SingleUnitParameters[]> = ref([DotsOnCircleParameters, AnalogRoundedIrregularityHandParameters, AnalogRoundedAlignedHandParameters, DigitalVariableFontNumberParameters]);

	return { partsList };
});