<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'open'): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <t-form-item arrow :label="label" name="birthday" content-align="right">
    <t-input
      v-model="value" borderless align="right" :placeholder="placeholder" readonly class="picker-input"
      @click="emit('open')"
    />
  </t-form-item>
</template>

<style scoped></style>
