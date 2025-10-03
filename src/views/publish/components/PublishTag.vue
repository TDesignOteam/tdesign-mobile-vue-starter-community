<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getPublishTags } from '@/api/publish'

const { t } = useI18n()
const tags = ref<string[]>([])

onMounted(async () => {
  const res = await getPublishTags()
  if (res.success && res.data)
    tags.value = res.data.tags
})
</script>

<template>
  <div class="flex flex-row h-[52px] items-center flex-nowrap">
    <div class="summary text-[16px] px-[16px] flex-shrink-0 text-[var(--td-text-color-primary)]">
      {{ t('pages.publish.add_tags') }}
    </div>
    <div class="tag-demo overflow-hidden">
      <div class="overflow-x-scroll scrollbar-hidden scroll-smooth flex flex-row flex-nowrap">
        <t-check-tag
          v-for="(text, idx) in tags"
          :key="idx"
          class="mx-[6px]"
          variant="dark"
          size="medium"
          :content="text"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.scrollbar-hidden {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}
</style>
