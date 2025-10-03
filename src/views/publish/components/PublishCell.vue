<script lang="ts" setup>
import { LocationIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locationIcon = () => h(LocationIcon, { size: '24px', class: 't-icon-location' })
</script>

<template>
  <t-cell-group bordered>
    <t-cell :title="t('pages.publish.location')" class="cell text-[100px]" :left-icon="locationIcon" arrow hover />
  </t-cell-group>
</template>

<style lang="scss" scoped>
</style>
