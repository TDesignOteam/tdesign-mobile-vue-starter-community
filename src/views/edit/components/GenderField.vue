<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  maleLabel: string
  femaleLabel: string
  secretLabel: string
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
  <t-form-item :label="label" name="gender">
    <t-radio-group v-model="value" class="w-full flex justify-between" borderless>
      <t-radio :block="false" name="gender" :value="maleLabel" :label="maleLabel" />
      <t-radio :block="false" name="gender" :value="femaleLabel" :label="femaleLabel" />
      <t-radio :block="false" name="gender" :value="secretLabel" :label="secretLabel" />
    </t-radio-group>
  </t-form-item>
</template>

<style scoped></style>
