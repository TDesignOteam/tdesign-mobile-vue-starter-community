<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSearchHook } from './hooks'

const { t } = useI18n()

const {
  searchValue,
  historyTags,
  searchSuggestions,
  onCancel,
  onChange,
  clearHistory,
  getSearchSuggList,
  onHistoryTagClick,
  onSuggestionClick,
  onEnterKeyPress,
} = useSearchHook()

onMounted(() => {
  getSearchSuggList()
})
</script>

<route lang="json5">
{
  meta: {
    title: '搜索页面',
    i18n: 'menus.search',
  }
}
</route>

<template>
  <div class="h-full overflow-y-auto bg-white">
    <!--  固定的在顶部的导航栏，没有border-bottom -->
    <Banner :title="t('pageSearch.title')" :border="false" />

    <!-- 搜索输入模块 -->
    <div class="p-2 px-4">
      <div class="flex items-center gap-3 justify-between">
        <t-search
          v-model="searchValue"
          clearable
          shape="round"
          :maxlength="20"
          :placeholder="t('pageSearch.placeholder')"
          class="flex-1 h-[40px]"
          @change="onChange"
          @keypress.enter="onEnterKeyPress"
        />

        <button
          class="min-w-[32px] h-[24px] cursor-pointer border-none bg-transparent !text-[#0052D9]"
          @click="onCancel"
        >
          {{ t('pageSearch.btnCancel') }}
        </button>
      </div>
    </div>

    <!-- 历史记录模块 -->
    <div class="p-4">
      <div class="flex justify-between items-center mb-3">
        <span class="text-lg font-semibold">
          {{ t('pageSearch.LHistory') }}
        </span>
        <t-icon
          name="delete"
          size="20px"
          class="cursor-pointer text-td-text-color-secondary"
          @click="clearHistory"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <t-tag
          v-for="(tag, index) in historyTags"
          :key="`${tag}-${index}`"
          variant="light"
          @click="onHistoryTagClick(tag)"
        >
          {{ tag }}
        </t-tag>
      </div>
    </div>

    <!-- 搜索发现模块 -->
    <div class="p-4">
      <div class="flex justify-between items-center mb-3">
        <span class="text-lg font-semibold">
          {{ t('pageSearch.LFind') }}
        </span>
      </div>
      <div class="flex flex-col gap-2 items-start">
        <t-tag
          v-for="(suggestion, index) in searchSuggestions"
          :key="index"
          variant="light"
          class="max-w-full"
          @click="onSuggestionClick(suggestion)"
        >
          <template #icon>
            <t-icon name="search" />
          </template>
          {{ suggestion }}
        </t-tag>
      </div>
    </div>
  </div>
</template>
