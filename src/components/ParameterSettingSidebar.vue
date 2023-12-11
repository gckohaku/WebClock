<script setup lang="ts">
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import type { ClockProperties } from '@/common/ClockProperties';
import { InputDataContents } from '@/common/scripts/InputDataContents';
import { get, set } from 'idb-keyval';
import { customStores } from '@/common/scripts/customStores';
import { getClockParameter } from '@/common/scripts/customStores';
import { analogDotsOnCircleDataList } from '@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList';
import type { SingleUnitParameters } from '@/common/scripts/ClockPartsParameters';

export interface Props {
	parameters: SingleUnitParameters,
	sliderLength?: string,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "50px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string],
}>();

onMounted(async () => {
	// for (const [outerKey, item] of Object.entries(props.parameters)) {
	// 	for (const [innerKey, param] of Object.entries(item)) {
	// 		// console.log(InputDataContents.isSameClass(param));
	// 		// console.log(param);
	// 		if (param instanceof InputDataContents) {
	// 			// console.log(await getClockParameter("analogDotsOnCircleClock", `${outerKey}.${innerKey}`, "156"));
	// 			// get(`${outerKey}.${innerKey}`, customStores['analogDotsOnCircleClock']).then((val) => console.log(val)).catch((err) => console.log("error!"));
	// 			// param.reactiveValue.value = param.reactiveValue.value;
	// 			// console.log(param.reactiveValue.value)
	// 			getClockParameter("analogDotsOnCircleClock", `${outerKey}.${innerKey}`, "156").then((val) => { console.log(val); param.reactiveValue.value = val });

	// 		}
	// 	}
	// }
});

</script>

<template>
	<template v-for="item in props.parameters">
		<template v-for="param in item">
			<div v-if="param && (param instanceof InputDataContents)">
				<!-- <p>{{ param }}</p> -->
				<div v-if="param.type === 'slider'">
					<GcInputSliderWithSpin :name="param.name" :id="param.id" :max="param.max" :min="param.min" :step="param.step" :model-value="param.reactiveValue.value" :slider-length="props.sliderLength" @update:model-value="$emit('update:modelValue', param.reactiveValue = $event); console.log(param.reactiveValue);" />
				</div>
				<div v-else-if="param.type === 'color'">
					<GcInputColorPicker v-model="param.reactiveValue.value" @update:model-value="emit('update:modelValue', param.reactiveValue = $event);" />
				</div>
				<p v-else>まだ制作していないタイプの設定だよ</p>
			</div>
		</template>
	</template>
</template>

<style scoped lang="scss">
/* style here */
</style>