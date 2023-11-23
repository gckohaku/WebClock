<script setup lang="ts">
import { ParameterApplicability } from '@/common/scripts/ParametersApplicability'; 

const test = new ParameterApplicability();

for (const key in test) {
	console.log(test[key]);
}
</script>

<template>
	<p>test</p>
</template>

<style scoped lang="scss">
/* style here */
</style>