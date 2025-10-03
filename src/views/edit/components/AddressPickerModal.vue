<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  columns: any[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', val: any, context: any): void
  (e: 'pick', val: any, context: any): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <t-popup v-model="(props.modelValue as any)" placement="bottom" @update:model-value="(v:boolean) => $emit('update:modelValue', v)">
    <t-picker
      :title="props.title"
      :columns="props.columns"
      @confirm="(val:any, ctx:any) => emit('confirm', val, ctx)"
      @cancel="emit('cancel')"
      @pick="(val:any, ctx:any) => emit('pick', val, ctx)"
    />
  </t-popup>
</template>

<style scoped>
</style>
