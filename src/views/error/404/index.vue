<script setup lang='ts'>
import notFoundIllustration from '@/assets/svgs/404.svg'
import ErrorPage from '../ErrorPage.vue'

defineOptions({
  name: '404',
})
</script>

<template>
  <ErrorPage code="404" :image-src="notFoundIllustration" />
</template>
