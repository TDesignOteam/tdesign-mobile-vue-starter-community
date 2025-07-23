<template>
  <div class="home">
    <t-navbar :fixed="false" :title="titleMap[tabBarValue]">
      <template #left>
        <ViewListIcon size="24" @click="onShowDrawer"/>
        <TSearch class="home__search" v-if="tabBarValue === 'home'" shape="round" style="" placeholder="请搜索你想要的内容"
                 @focus="onTrySearch"
        />
      </template>
    </t-navbar>

    <router-view />

    <t-tab-bar v-model="tabBarValue" theme="tag" :split="false" @change="onChangeTabBar">
      <t-tab-bar-item v-for="item in tabBarList" :key="item.value" :value="item.value" :badgeProps="item.badgeProps">
        {{ item.label }}
        <template #icon>
          <t-icon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>

  <TDrawer v-model:visible="drawerVisible" placement="left" title="页面目录" :items="drawerItems" @item-click="onClickDrawerItem" />
</template>

<script lang="ts" setup>
import { ViewListIcon } from 'tdesign-icons-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
onMounted(() => {
  tabBarValue.value = (route.name as string) || 'my';
});

const drawerVisible = ref(false);
const drawerItems = [
  {
    title: '首页',
    path: '/',
  },
  {
    title: '搜索页',
    path: '/search',
  },
  {
    title: '发布页',
    path: '/release',
  },
  {
    title: '消息列表页',
    path: '/home/message',
  },
  {
    title: '对话页',
    path: '/chat',
  },
  {
    title: '个人中心页',
    path: '/home/my',
  },
  {
    title: '个人信息表单页',
    path: '/my-form',
  },
  {
    title: '设置页',
    path: '/setting',
  },
  {
    title: '数据图表页',
    path: '/data-center ',
  },
  {
    title: '登录注册页',
    path: '/login',
  },
];

function onClickDrawerItem(index: number, item: { path: string }) {
  router.push(item.path);
  drawerVisible.value = false;
}

function onShowDrawer() {
  drawerVisible.value = true;
}
function onTrySearch() {
  router.push('/search');
}

const tabBarValue = ref('home');

function onChangeTabBar(value: string) {
  tabBarValue.value = value;
  router.push({ name: value });
}

const tabBarList = ref([
  { value: 'home', label: '首页', icon: 'home' },
  { value: 'message', label: '聊天', icon: 'chat', badgeProps: { count: 2 } },
  { value: 'my', label: '我的', icon: 'user' },
]);

const titleMap: Record<string, string> = {
  home: '',
  message: '全部消息',
  my: '我的',

};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__search {
    --td-search-height: 32px;
    margin-left: 8px;
    width: calc(100vw - 100px);
  }
}
</style>
