<script setup lang='ts'>
import ErrorPage from '../ErrorPage.vue'

defineOptions({
  name: '403',
})
</script>

<template>
  <ErrorPage code="403" />
</template>
