<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="w-full p-4 flex items-center">
    <!-- 使用 t-cell 显得有点复杂化了 -->
    <t-avatar size="64px">
      <template #icon>
        <UserIcon size="32px" />
      </template>
    </t-avatar>
    <div class="flex-1 pl-4 font-semibold">
      {{ t('pageMine.userUnlogged') }}
    </div>
  </div>
</template>
