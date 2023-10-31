<script setup lang="ts">
export interface Props {
    name?: string;
    id?: string;
    modelValue: any;
};

const props = withDefaults(defineProps<Props>(), {
    name: "",
    id: "",
})

const emit = defineEmits<{
    "update:modelValue": [value: string],
}>();
</script>

<template>
    <input type="color" :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>

<style scoped lang="scss">
/* style here */
</style>