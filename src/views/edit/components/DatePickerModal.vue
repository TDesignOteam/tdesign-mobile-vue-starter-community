<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  dateValue: string
  title: string
  format?: string
  start?: string
  end?: string
  mode?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:dateValue', value: string): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const visibleProxy = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const dateProxy = computed({
  get: () => props.dateValue,
  set: (val: string) => emit('update:dateValue', val),
})

const pickerMode = computed(() => props.mode ?? ['date'])
const pickerFormat = computed(() => props.format ?? 'YYYY-MM-DD')
</script>

<template>
  <t-popup v-model="visibleProxy" placement="bottom">
    <t-date-time-picker
      v-model="dateProxy"
      :mode="pickerMode"
      :title="props.title"
      :format="pickerFormat"
      :start="props.start"
      :end="props.end"
      @confirm="emit('confirm')"
      @cancel="emit('cancel')"
    />
  </t-popup>
</template>

<style scoped>
</style>
