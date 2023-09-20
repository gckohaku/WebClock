<script setup lang="ts">
    export interface Props {
        name: string,
        id: string,
        modelValue: any,
    };

    const props = defineProps<Props>();
    defineEmits(['update:modelValue']);
</script>

<template>
    <input type="range" :name="props.name" :id="props.id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<style scoped>
    
</style>