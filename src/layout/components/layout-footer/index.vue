<script setup lang='tsx'>
import type { FooterMenuProp } from './types'
// 这里使用到了tsx，使用自动引入的话虽然能正常加载，但是eslint似乎不认
import { ChatIcon, HomeIcon, UserIcon } from 'tdesign-icons-vue-next'

import { useI18n } from 'vue-i18n'
import { getUnReadCountApi } from '@/api/message'
import { $t } from '@/plugins/i18n'

defineOptions({
  name: 'LayoutFooter',
})

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const currMenu = ref()

const menuList = reactive<FooterMenuProp[]>([
  {
    path: '/home',
    label: $t('menus.home'),
    icon: <HomeIcon />,
  },
  {
    path: '/message',
    label: $t('menus.message'),
    icon: <ChatIcon />,
    badge: 0,
  },
  {
    path: '/profile',
    label: $t('menus.mine'),
    icon: <UserIcon />,
  },
])

function changeMenu(val: FooterMenuProp['path']) {
  router.push(val)
}

/** 更新未读数量 */
function updateUnCount() {
  getUnReadCountApi().then((res) => {
    menuList[1].badge = res.data
  })
}

onMounted(() => {
  currMenu.value = route.path
  updateUnCount()
})

watch(() => route.path, (val) => {
  currMenu.value = val
})
</script>

<template>
  <t-tab-bar v-model="currMenu" theme="tag" :split="false" @change="changeMenu">
    <t-tab-bar-item
      v-for="item in menuList"
      :key="item.path"
      :value="item.path"
      :badge-props="{ count: item.badge }"
    >
      {{ t(item.label) }}
      <template #icon>
        <component :is="item.icon" size="20px" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<style lang='scss' scoped>
:deep(.t-tab-bar-item) {
  padding: 0 6px; // 设计稿是多少，这就是多少
}
</style>
