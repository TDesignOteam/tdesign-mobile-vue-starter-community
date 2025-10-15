<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="w-[189px] h-[32px] px-3 flex items-center rounded-full bg-[#f3f3f3] text-[#00000066]">
    <SearchIcon size="16px" />
    <div class="text-sm ml-1 truncate">
      {{ t('pageHome.search') }}
    </div>
  </div>
</template>
