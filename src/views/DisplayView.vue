<script setup lang="ts">
import type { DisplayClockParameters } from '@/common/scripts/DisplayClockParameters';
import { stringDecompression } from '@/common/scripts/utilities/stringEncodings';



const params: DisplayClockParameters = stringDecompression();
</script>

<template>
	{{ URLSearchParams }}
</template>

<style scoped lang="scss">
/* style here */
</style>