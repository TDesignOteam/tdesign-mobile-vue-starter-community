<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { useSearch } from './composables/useSearch'

defineOptions({
  name: 'Searchpage',
})

const { t, taglist, findlist, searchQuery, handleCancelClick, handleClearHistoryClick } = useSearch()
</script>

<template>
  <div class="page">
    <div class="search-container">
      <t-search
        v-model="searchQuery" :clearable="true" shape="round" class="search"
        :placeholder="t('common.search.placeholder')"
      >
        <template #left-icon>
          <TIcon name="search" size="18px" />
        </template>
      </t-search>
      <div class="cancel" @click="handleCancelClick">
        {{ t('pages.search.cancel') }}
      </div>
    </div>
    <div class="recode">
      <div class="recode-title">
        {{ t('pages.search.history') }}
        <TIcon name="delete" class="deleteIcon" @click="handleClearHistoryClick" />
      </div>
      <div class="recode-detail">
        <t-tag v-for="(tag, index) in taglist" :key="index" variant="light" class="tag">
          {{ tag }}
        </t-tag>
      </div>
    </div>
    <div class="find">
      {{ t('pages.search.discoveries.title') }}
    </div>
    <div class="find-detail">
      <t-tag v-for="(find, index) in findlist" :key="index" variant="light" class="find-content">
        <template #icon>
          <TIcon name="search" />
        </template>
        {{ find }}
      </t-tag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  background-color: var(--td-bg-color-container);
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    opacity: 1;
    background: var(--td-bg-color-container);
    .search {
      flex: 1;
      height: 40px;
      padding: 8px 16px;
      opacity: 1;

      background: var(--td-bg-color-container);
    }
    .cancel {
      min-width: 40px;
      height: 24px;
      opacity: 1;
      color: #0052d9;
      font-size: 16px;
      font-weight: 400;
      font-family: 'PingFang SC';
      text-align: center;
      line-height: 24px;
      margin: 16px;
      white-space: nowrap;
    }
  }
  .recode {
    .recode-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 1;
      font-size: 18px;
      font-weight: 600;
      font-family: 'PingFang SC';
      text-align: left;
      line-height: 26px;
      color: var(--td-text-color-primary);
      margin: 16px;
    }
    .recode-detail {
      font-size: 14px;
      color: var(--td-text-color-primary);
      margin: 16px;
      .tag {
        margin: 10px 8px 0 0;
      }
    }
  }
  .find {
    opacity: 1;
    font-size: 18px;
    font-weight: 600;
    font-family: 'PingFang SC';
    text-align: left;
    line-height: 26px;
    color: var(--td-text-color-primary);
    margin: 24px auto 16px 16px;
  }
  .find-detail {
    display: flex;
    flex-wrap: wrap;

    .find-content {
      margin: 10px 8px 0 16px;
    }
  }
}
</style>
