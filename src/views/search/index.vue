<template>
  <div class="search">
    <t-navbar title="搜索" :fixed="false" left-arrow @left-click="clickBack" />
    <div class="search__input">
      <t-search action="取消" shape="round" placeholder="请搜索你想要的内容" @action-click="clickBack" v-model="inputValue"/>
    </div>
    <div class="search__history-line">
      <span class="search__history-title">历史记录</span>
      <DeleteIcon size="24px" @click="onClickDelete"/>
    </div>
    <div class="search__history-content">
      <t-tag v-for="tag of tagList" :key="tag" class="search__history-tag" @click="() => onClickHistoryTag(tag)">{{ tag }}</t-tag>
    </div>
    <div class="search__recommend-line">
      <span class="search__recommend-title">搜索发现</span>
    </div>
    <div class="search__recommend-content">

      <t-tag v-for="tag of recommendList" :key="tag" class="search__recommend-tag"
             @click="() => onClickRecommend(tag)"
      >
        <template #icon>
          <SearchIcon />
        </template>
        {{ tag }}
      </t-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DeleteIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { DialogPlugin } from 'tdesign-mobile-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const inputValue = ref('');

function clickBack() {
  router.back();
}

const tagList = ref(['AI绘画', 'Stable Diffusion', '版权素材', '星空', 'illustration', 'TDesign']);
const recommendList = ref([
  '考研考编同时上岸应该怎么选？有哪些参考建议',
  '日常饮食中，如何选择优质蛋白',
  '你有没有网购维权成功的经历？求分享经验',
  '夏季带孩子旅游，你的必备物品有哪些',
  '在海外越卖越贵，中国汽车做对了什么',
  '当HR问你离职原因，怎么回答最能被接受',
]);
function onClickRecommend(value: string) {
  tagList.value.unshift(value);
  inputValue.value = value;
}
function onClickHistoryTag(value: string) {
  tagList.value.sort((a, b) => {
    if (a === value)
      return -1;
    if (b === value)
      return 1;
    return 0;
  });
  inputValue.value = value;
}
function onClickDelete() {
  DialogPlugin.confirm({
    title: '确认删除所有历史记录',
    content: '删除后不可恢复，请确认',
    cancelBtn: '取消',
    confirmBtn: '确认',
    onConfirm: () => {
      tagList.value = [];
    },
  });
}
</script>

<style scoped lang="scss">
.search {
  &__input {
    padding: 8px 16px;
  }
  &__history-line,
  &__recommend-line {
    margin: 24px 16px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__recommend-line {
    margin-top: 12px;
  }
  &__history-title,
  &__recommend-title {
    font-weight: 600;
    font-size: 18px;
    height: 26px;
    line-height: 26px;
  }
  &__history-content {
    margin: 0 16px;
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &__history-tag {
    margin-right: 12px;
    margin-bottom: 12px;
  }
  &__recommend-content {
    margin: 0 16px;
  }
  &__recommend-tag {
    margin-bottom: 12px;
  }
}
</style>
