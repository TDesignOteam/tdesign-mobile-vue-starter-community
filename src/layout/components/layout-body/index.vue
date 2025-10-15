<script setup lang='ts'>
defineOptions({
  name: 'LayoutBody',
})

const props = defineProps<{
  hideHeader: boolean
  showFooter: boolean
  showBackground: boolean
  backgroundColor: string
}>()

const getClassList = computed<string[]>(() => {
  const classList = ['layout-body', 'h-full']
  if (!props.hideHeader) {
    classList.push('pt-[48px]')
  }

  if (props.showFooter) {
    classList.push('pb-[56px]')
  }

  if (props.showBackground) {
    classList.push('show-background')
  }

  return classList
})
</script>

<template>
  <section :class="getClassList" :style="{ 'background-color': props.backgroundColor }">
    <router-view class="body-wrapper" />
  </section>
</template>

<style lang='scss' scoped>
.layout-body {
  overflow-y: scroll;
}

.show-background {
  // 二倍图处理
  background: image-set(url('@/assets/bg.png') 1x, url('@/assets/bg@2x.png') 2x) no-repeat;
  background-size: contain;
}
</style>
