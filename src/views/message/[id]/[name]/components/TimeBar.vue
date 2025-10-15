<script setup lang='ts'>
import dayjs from 'dayjs'

defineProps<{
  time: dayjs.ConfigType
}>()
</script>

<template>
  <div class="w-full py-2 text-center text-xs text-[#00000066]">
    {{ dayjs(time).format('HH:mm') }}
  </div>
</template>
