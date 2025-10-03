<script setup lang='ts'>
import serverErrorIllustration from '@/assets/svgs/500.svg'
import ErrorPage from '../ErrorPage.vue'

defineOptions({
  name: '500',
})
</script>

<template>
  <ErrorPage
    code="500"
    :image-src="serverErrorIllustration"
  />
</template>
