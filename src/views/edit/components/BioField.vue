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
  <t-form-item :label="label" name="bio">
    <t-textarea
      v-model="value" class="w-full h-[100px]" indicator :maxlength="maxlength || 50"
      :placeholder="placeholder"
    />
  </t-form-item>
</template>

<style scoped></style>
