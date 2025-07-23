<template>
  <div class="release">
    <t-navbar title="发布动态" :fixed="false" left-arrow @left-click="clickBack" />
    <div class="release__main">
      <div>
        <t-upload
          :default-files="files"
          multiple
          :max="10"
        >
        </t-upload>
      </div>

      <t-textarea class="release__textarea" name="添加描述" label="添加描述" placeholder="分享你此刻的想法" :maxcharacter="500" indicator />

      <t-cell title="添加标签">
        <template #note>
          <t-check-tag v-for="tag of tagList" :key="tag.title" class="release__tag" :checked="selectedTags.includes(tag.title)"
                       @click="() => onClickTag(tag)"
          >
            {{ tag.title }}
          </t-check-tag>
        </template>
      </t-cell>

      <t-cell title="所在位置" :left-icon="() => h(LocationIcon)" arrow hover @click="onClickLocation"/>
    </div>
    <div class="release__submit">
      <t-button theme="light" size="large" :icon="() => h(FileCopyIcon, { size: '24px' })" @click="onSave">存草稿</t-button>
      <t-button theme="primary" size="large" :icon="() => h(UploadIcon, { size: '24px' })" @click="onPublish">发布</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FileCopyIcon, LocationIcon, UploadIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import { h, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function clickBack() {
  router.back();
}
const files = [
  {
    url: '/images/image1.png',
    name: 'uploaded1.png',
    type: 'image',
  },
  {
    url: '/images/image2.png',
    name: 'uploaded2.png',
    type: 'image',
  },
];
const tagList = [
  {
    title: '#AI绘画',
  },
  {
    title: '#版权素材',
  },
  {
    title: '#原创',
  },
  {
    title: '#风格灵动',
  },
];
const selectedTags = ref<string[]>(['#AI绘画']);
function onClickTag(tag: { title: string }) {
  if (selectedTags.value.includes(tag.title)) {
    selectedTags.value = selectedTags.value.filter(item => item !== tag.title);
  }
  else {
    selectedTags.value.push(tag.title);
  }
}
function onClickLocation() {
  Toast('获取当前位置...');
}

function onSave() {
  router.push('/?from=save');
}

function onPublish() {
  router.push('/?from=publish');
}
</script>

<style scoped lang="scss">
.release {
  &__main {
    margin-top: 12px;
  }
  &__textarea {
    height: 128px;
  }
  &__tag:not(:last-child) {
    margin-right: 12px;
  }
  :deep(.t-cell__title) {
    width: 64px;
    flex-shrink: 0;
  }
  :deep(.t-cell__note) {
    overflow-x: auto;
    justify-content: flex-start;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__submit {
    display: flex;
    justify-content: space-evenly;
    padding: 16px;
    position: fixed;
    bottom: 32px;
    width: 100%;
    :deep(.t-button) {
      width: 160px;
    }
  }
}
</style>
