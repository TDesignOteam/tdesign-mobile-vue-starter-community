<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  placeholder: string
  maxlength?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <t-form-item :label="label" name="username">
    <t-input v-model="value" borderless :placeholder="placeholder" :maxlength="maxlength || 30" />
  </t-form-item>
</template>

<style scoped></style>
