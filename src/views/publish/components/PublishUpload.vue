<script setup lang="ts">
import type {
  ProgressContext,
  SuccessContext,
  UploadChangeContext,
  UploadFile,
  UploadRemoveContext,
} from 'tdesign-mobile-vue'
import { ref } from 'vue'
import upload4 from '@/assets/images/upload4.png'
import upload6 from '@/assets/images/upload6.png'

function onFail({ file, e }: { file: UploadFile, e: ProgressEvent }): any {
  console.log('[onFail] ', { file, e })
  return null
}
const gridConfig = {
  column: 4,
}
function onProgress({ file, percent, type, e }: ProgressContext) {
  console.log('[onProgress] ', { file, percent, type, e })
}
function onChange(files: Array<UploadFile>, { e, response, trigger, index, file }: UploadChangeContext) {
  console.log('[onChange]', { files, e, response, trigger, index, file })
}
function onPreview({ file, e }: { file: UploadFile, e: MouseEvent }) {
  console.log('[onPreview]', { file, e })
}
function onSuccess({ file, fileList, response, e }: SuccessContext) {
  console.log('[onSuccess]', { file, fileList, e, response })
}
function onRemove({ index, file, e }: UploadRemoveContext) {
  console.log('[onRemove]', { index, file, e })
}
function onSelectChange(files: Array<UploadFile>) {
  console.log('[onSelectChange]', files)
}
function onClickUpload({ e }: { e: MouseEvent }) {
  console.log('[onClickUpload]', e)
}
const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo'
const files = ref([
  {
    url: upload4,
    name: 'uploaded1.png',
    type: 'image',
    removeBtn: false,
  },
  {
    url: upload6,
    name: 'uploaded2.png',
    type: 'image',
  },
  {
    url: upload4,
    name: 'uploaded3.png',
    type: 'image',
  },
])
</script>

<template>
  <div class="upload-demo">
    <t-upload
      :default-files="files" multiple :max="10" :grid-config="gridConfig" :action="action" :on-fail="onFail"
      :on-progress="onProgress" :on-change="onChange" :on-preview="onPreview" :on-success="onSuccess"
      :on-remove="onRemove" :on-select-change="onSelectChange" :on-click-upload="onClickUpload"
    />
  </div>
</template>

<style scoped lang="scss">
.upload-demo {
  background: var(--bg-color-demo, --bg-color-container);

  .upload-title {
    font-size: 16px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
    padding: 12px 16px 0;
  }
}
</style>
