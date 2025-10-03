<script setup lang='ts'>
import { ref } from 'vue'

import PublishButtons from './components/PublishButtons.vue'

import PublishCell from './components/PublishCell.vue'

import PublishTag from './components/PublishTag.vue'

import PublishText from './components/PublishText.vue'

import PublishUpload from './components/PublishUpload.vue'

defineOptions({
  name: 'Publish',
})
</script>

<template>
  <div class="flex flex-col h-full justify-between bg-white">
    <div>
      <PublishUpload />
      <PublishText />
      <PublishTag />
      <PublishCell />
    </div>
    <PublishButtons />
  </div>
</template>

<style lang="scss" scoped>

</style>
