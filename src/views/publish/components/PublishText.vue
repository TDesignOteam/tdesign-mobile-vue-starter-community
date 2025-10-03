<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const value = ref('')
</script>

<template>
  <t-textarea
    v-model="value"
    class="textarea-publish"
    :name="t('pages.publish.add_description')"
    :label="t('pages.publish.add_description')"
    :placeholder="t('pages.publish.share_thoughts')"
    :maxlength="500"
    indicator
  />
</template>

<style lang="scss" scoped>
.textarea-publish {
  height: 132px;
  :deep(.t-textarea__label) {
    overflow: visible;
  }
}
</style>
