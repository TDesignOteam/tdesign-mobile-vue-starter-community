<template>
  <div class="card">
    <t-image :src="img"  :style="{ width: '170px', height: '170px' }" mode="aspectFill"/>
    <div class="pt-[12px] pl-[12px] mb-[12px]">
      <div class="text-[14px] leading-[22px] h-[22px] mb-[8px]">{{ text }}</div>
      <div>
        <t-tag variant="light" theme="primary" class="mr-[8px]" size="small">AI绘画</t-tag>
        <t-tag variant="light" theme="success" size="small">版权素材</t-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  img?: string;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  img: '/images/home/card0.png',
  text: '少年，星空与梦想',
});
</script>

<style scoped lang="scss">
.card {
  display: inline-flex;
  flex-direction: column;
  width: 170px;
  height: 244px;
  border-radius: 9px;
  background: #ffffff;
}
</style>
