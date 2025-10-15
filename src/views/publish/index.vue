<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePublishHook } from './hooks'

const { t } = useI18n()

const {
  tags,
  formData,
  uploadConfig,
  onPublish,
  getTagList,
  onValidate,
  onSaveDraft,
  onTagChange,
  onAddLocation,
} = usePublishHook(t)

onMounted(() => {
  getTagList()
})
</script>

<template>
  <div class="h-full bg-white flex flex-col pb-20">
    <!-- 固定在顶部的导航栏，没有border-bottom -->
    <Banner :title="t('pagePublish.title')" :border="false" />

    <div class="overflow-y-auto">
      <!-- 图片上传模块 -->
      <div>
        <t-upload
          v-model="formData.files"
          v-bind="uploadConfig"
          class="bg-transparent"
          @validate="onValidate"
        />
      </div>

      <!-- 添加描述模块 -->
      <div>
        <t-textarea
          v-model="formData.content"
          name="content"
          :label="t('pagePublish.LDesc')"
          :placeholder="t('pagePublish.plhDesc')"
          :maxlength="500"
          indicator
          class="h-[132px]"
        />
      </div>

      <t-divider class="ml-4 !mt-0" />

      <!-- 标签选择模块 -->
      <div class="px-4 py-[6px]">
        <div class="flex items-center gap-8">
          <div class="text-base text-gray-800 flex items-center">
            {{ t('pagePublish.LLabel') }}
          </div>
          <div class="flex overflow-x-auto hide-scrollbar gap-3 flex-1 tag-container">
            <t-check-tag
              v-for="(tag, index) in tags"
              :key="index"
              :checked="formData.tags.includes(tag.id)"
              variant="dark"
              size="medium"
              class="rounded-full text-xs h-8 px-4 border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm flex-shrink-0"
              @change="(checked) => onTagChange(tag.id, checked)"
            >
              {{ tag.label }}
            </t-check-tag>
          </div>
        </div>
      </div>

      <t-divider class="ml-4 !mb-0" />
      <!-- 位置信息模块 -->
      <t-cell :title="t('pagePublish.LLocate')" arrow @click="onAddLocation">
        <template #left-icon>
          <LocationIcon />
        </template>
      </t-cell>
      <div />
    </div>

    <!-- 底部操作按钮模块 -->
    <div class="w-full fixed bottom-0 left-0 p-4 flex gap-3">
      <t-button size="large" theme="light" class="flex-1" @click="onSaveDraft">
        <template #icon>
          <FileCopyIcon size="22px" />
        </template>
        {{ t('pagePublish.btnSave') }}
      </t-button>
      <t-button size="large" theme="primary" class="flex-1" @click="onPublish">
        <template #icon>
          <UploadIcon size="22px" />
        </template>
        {{ t('pagePublish.btnPub') }}
      </t-button>
    </div>
  </div>
</template>
