<script setup lang="ts">
import GcInputSliderWithSpin from './modules/GcInputSliderWithSpin.vue';
import GcInputColorPicker from './modules/GcInputColorPicker.vue';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import type { UnwrapNestedRefs } from 'vue';
import type { ClockProperties } from '@/common/ClockProperties';
import { InputDataContents } from '@/common/scripts/InputDataContents';
import { get, set } from 'idb-keyval';
import { customStores } from '@/common/scripts/customStores';
import { getClockParameter } from '@/common/scripts/customStores';
import { analogDotsOnCircleDataList } from '@/common/scripts/input_data_contents/AnalogDotsOnCircleDataList';

export interface Props {
	parameters: ClockProperties,
	sliderLength?: string,
}

const props = withDefaults(defineProps<Props>(), {
	sliderLength: "50px",
});

const emit = defineEmits<{
	"update:modelValue": [value: string],
}>();

onMounted(async () => {
	for (const [outerKey, item] of Object.entries(props.parameters)) {
		for (const [innerKey, param] of Object.entries(item)) {
			// console.log(InputDataContents.isSameClass(param));
			// console.log(param);
			if (InputDataContents.isSameClass(param)) {
				// console.log(await getClockParameter("analogDotsOnCircleClock", `${outerKey}.${innerKey}`, "156"));
				// get(`${outerKey}.${innerKey}`, customStores['analogDotsOnCircleClock']).then((val) => console.log(val)).catch((err) => console.log("error!"));
				// param.reactiveValue.value = param.reactiveValue.value;
				// console.log(param.reactiveValue.value)
				getClockParameter("analogDotsOnCircleClock", `${outerKey}.${innerKey}`, "156").then((val) => {console.log(val); param.reactiveValue.value = val});
				
			}
		}
	}
});

</script>

<template>
	<template v-for="(item, outerKey) in props.parameters">
		<template v-for="(param, innerKey) in item">
			<div v-if="param">
				<div v-if="(typeof param !== 'string')">
					<p>{{ (param as InputDataContents).heading }}</p>
					<div v-if="(param as InputDataContents).type === 'slider'">
						<GcInputSliderWithSpin :name="(param as InputDataContents).name" :id="(param as InputDataContents).id" :max="(param as InputDataContents).max" :min="(param as InputDataContents).min" :step="(param as InputDataContents).step" :model-value="(param as InputDataContents).reactiveValue.value" :slider-length="($props.sliderLength as string)" @update:model-value="$emit('update:modelValue', (param as InputDataContents).reactiveValue.value = $event); set(`${outerKey}.${innerKey}`, $event, customStores['analogDotsOnCircleClock']); get('widths.ofHour', customStores['analogDotsOnCircleClock']).then((val) => console.log(val))" />
					</div>
					<div v-else-if="(param as InputDataContents).type === 'color'">
						<GcInputColorPicker v-model="(param as InputDataContents).reactiveValue.value" @update:model-value="emit('update:modelValue', (param as InputDataContents).reactiveValue.value = $event); set(`${outerKey}.${innerKey}`, $event, customStores['analogDotsOnCircleClock']); get('widths.ofHour', customStores['analogDotsOnCircleClock']).then((val) => console.log(val))" />
					</div>
					<p v-else>まだ制作していないタイプの設定だよ</p>
				</div>
				<div v-else>
					<p>{{ param }}</p>
				</div>
			</div>
		</template>
	</template>
</template>

<style scoped lang="scss">
/* style here */
</style>