<script setup lang="ts">
const props = defineProps<{
  label: string
  displayValue: string
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'open'): void
}>()
</script>

<template>
  <t-form-item arrow :label="label" name="address" content-align="right">
    <t-input
      :model-value="props.displayValue" borderless align="right" :placeholder="placeholder" readonly
      class="picker-input" @click="emit('open')"
    />
  </t-form-item>
</template>

<style scoped></style>
