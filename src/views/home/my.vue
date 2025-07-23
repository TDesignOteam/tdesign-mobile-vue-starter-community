<template>
  <div class="my">
    <div class="my__meta">
      <div class="my__info" v-if="userStore.isLogin">
        <t-cell>
          <template #leftIcon>
            <t-avatar shape="circle" :image="userStore.loginInfo?.avatar" />
          </template>
          <template #default>
            <div class="my__person">
              <div class="my__name">{{ userStore.loginInfo?.name }}</div>
              <div class="my__tags">
                <t-tag>
                  <template #icon>
                    <DiscountIcon />
                  </template>
                  天秤座
                </t-tag>
                <t-tag>
                  <template #icon>
                    <LocationIcon />
                  </template>
                  深圳
                </t-tag>
              </div>
            </div>
          </template>
          <template #rightIcon>
            <EditIcon size="20px" color="#000000e6" @click="clickEdit"/>
          </template>
        </t-cell>
        <!-- <t-avatar class="my__avatar" :image="userStore.loginInfo?.avatar" size="large"></t-avatar> -->

      </div>
      <div class="my__info" @click.stop="onLogin" v-else>
        <t-avatar class="my__avatar" :icon="userIcon" size="large"></t-avatar>

        <span class="my__login-title">请先登录/注册</span>
      </div>
      <div class="my__entrance">
        <t-grid :column="4"  class="grid-demo">
          <t-grid-item :text="entrance.title" class="my__entrance-item"
                       v-for="entrance of entranceList"
                       :key="entrance.title"
                       :image="entrance.icon"
          >
          </t-grid-item>
        </t-grid>
      </div>
    </div>

    <div class="my__recommend">
      <div class="my__recommend-title">推荐服务</div>
      <div class="my__recommend-grid-wrap">
        <t-grid>
          <t-grid-item class="my__recommend-grid-item" :text="item.title" :image="item.img" v-for="(item, index) of recommendList" :key="`recommend-${index}`"/>
        </t-grid>
      </div>
    </div>

    <div class="my__settings">
      <t-cell class="my__settings-item" :title="item.title" :left-icon="item.icon" arrow hover v-for="item of settingsList" :key="item.title"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DiscountIcon, EditIcon, FileCopyIcon, LocationIcon, RootListIcon, SearchIcon, ServiceIcon, SettingIcon, UploadIcon, UserIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const userStore = useUserStore();
const userIcon = () => h(UserIcon);
const entranceList = [
  {
    icon: () => h(RootListIcon, { size: '24px' }),
    title: '全部发布',
  },
  {
    icon: () => h(SearchIcon, { size: '24px' }),
    title: '审核中',
  },
  {
    icon: () => h(UploadIcon, { size: '24px' }),
    title: '已发布',
  },
  {
    icon: () => h(FileCopyIcon, { size: '24px' }),
    title: '草稿箱',
  },
];
const recommendList = [
  {
    img: '/images/icon_wx.png',
    title: '微信',
  },
  {
    img: '/images/icon_qq.png',
    title: 'QQ',
  },
  {
    img: '/images/icon_doc.png',
    title: '腾讯文档',
  },
  {
    img: '/images/icon_map.png',
    title: '微信',
  },
  {
    img: '/images/icon_td.png',
    title: '数据中心',
  },
  {
    img: '/images/icon_td.png',
    title: '数据中心',
  },
  {
    img: '/images/icon_td.png',
    title: '数据中心',
  },
  {
    img: '/images/icon_td.png',
    title: '数据中心',
  },
];
const settingsList = [
  {
    title: '联系客服',
    icon: () => h(ServiceIcon),
  },
  {
    title: '设置',
    icon: () => h(SettingIcon),
  },
];
function onLogin() {
  router.push('/login');
}
function clickEdit() {
  console.log('clickEdit');
}
</script>

<style scoped lang="scss">
.my {
  background-color: #f3f3f3;
  padding: 16px 16px 76px;
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  &__meta {
    background: #fff;
    border-radius: 12px;
    padding-bottom: 16px;
  }
  &__info {
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #e7e7e7;
    padding: 16px 16px 20px;

    :deep(.t-cell__note) {
      justify-content: flex-start;
    }
  }
  &__avatar {
    margin-right: 16px;
  }
  &__login-title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    cursor: pointer;
  }
  &__entrance {
    padding-top: 16px;
    --td-grid-item-vertical-padding: 0;
  }
  &__entrance-item {
    &:first-child {
      border-right: 1px solid #e7e7e7;
    }
  }
  &__recommend {
    padding: 16px 0;
    border-radius: 12px;
    background: #fff;
    margin-top: 16px;
    --td-grid-item-vertical-padding: 16px 0 8px;
    --td-grid-item-text-line-height: 20px;
  }
  &__recommend-title {
    padding: 0 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color:#000000e6;
  }
  &__recommend-grid-item {
    &:nth-child(n+5):nth-child(-n+8) {
      --td-grid-item-vertical-padding: 16px 0 0px;
    }
  }
  &__settings {
    border-radius: 12px;
    background: #fff;
    margin-top: 16px;
  }
  &__settings-item {
    &:nth-child(1) {
      border-radius: 12px 12px 0 0;
    }
    &:last-child {
      border-radius: 0 0 12px 12px;
    }
  }
  &__name {
    line-height: 24px;
    font-size: 16px;
    color: #000000e6;
    font-weight: 600;
  }
  &__tags {
    display: flex;
    margin-top: 8px;
    --td-text-color-primary:  #000000e6;
    --td-tag-medium-font-size: 10px;
    --td-tag-medium-icon-size: 12px;
    :deep(.t-tag:first-child) {
      margin-right: 8px;
    }
  }
}
</style>
