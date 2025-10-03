<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: any[]
  label: string
  action: string
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
  (e: 'change', value: any[]): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: any[]) => emit('update:modelValue', val),
})
</script>

<template>
  <t-form-item :label="label" name="photo">
    <t-upload
      v-model="value" class="upload-pic" multiple theme="image" :max="max || 9" :action="action"
      @change="emit('change', value as any)"
    />
  </t-form-item>
</template>

<style scoped></style>
