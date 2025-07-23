<template>
  <div class="home">

    <div>
      <TTabs @change="onChangeTab" :default-value="tabList[0].value">
        <TTabPanel :value="tab.value" v-for="tab of tabList" :key="tab.value">
          <template #label>
            <div>{{tab.title}}</div>
          </template>

          <t-pull-down-refresh
            v-model="refreshing"
            :loading-bar-height="66"
            :loading-props="{}"
            :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']"
            :refreshTimeout="99999999999999"
            @refresh="handleRefresh"
          >
            <div class="home__cards">
              <template v-for="(card, cardIndex) of currentCardList" :key="cardIndex">
                <div v-if="card.isSwiper" class="home__swiper">
                  <t-swiper :autoplay="true" height="244px" :navigation="{ type: 'dots-bar' }">
                    <t-swiper-item v-for="(item, index) in swiperList" :key="index">
                      <t-image :src="item" mode="cover"/>
                    </t-swiper-item>
                  </t-swiper>
                </div>
                <Card
                  v-else
                  :img="card.img"
                  :text="card.text"
                />
              </template>

            </div>
          </t-pull-down-refresh>
        </TTabPanel>
      </TTabs>
    </div>

    <t-fab style="right: 16px;bottom: 60px;" draggable="all" :icon="() => h(AddIcon, { size: '24px' })" text="发布" @click="onClickPublish" />

  </div>
</template>

<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next';
import { Message } from 'tdesign-mobile-vue';
import { computed, h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from '../../components/card/index.vue';

const router = useRouter();
const route = useRoute();

interface Card {
  img?: string;
  text?: string;
  isSwiper?: boolean;
}

const curTab = ref('');
const tabList = [
  {
    title: '推荐',
    value: 'recommend',
  },
  {
    title: '我的关注',
    value: 'mine',
  },
];

onMounted(() => {
  const { from } = route.query;
  if (from) {
    Message.success(({
      offset: [10, 16],
      content: from === 'save' ? '保存成功' : '发布成功',
      context: document.querySelector('.home__cards')!,
    }));
    router.replace('/');
  }
});

const cardList: Card[] = [
  {
    img: '/images/home/card0.png',
    text: '少年，星空与梦想',
  },
  {
    isSwiper: true,
  },
  {
    img: '/images/home/card1.png',
    text: '仰望星空的少女',
  },
  {
    img: '/images/home/card2.png',
    text: '仰望星空的少年',
  },
  {
    img: '/images/home/card3.png',
    text: '少年，星空与梦想',
  },
  {
    img: '/images/home/card4.png',
    text: '多彩的天空',
  },
];
const mineCardList: Card[] = [
  {
    img: '/images/home/card0.png',
    text: '少年，星空与梦想',
  },
  {
    img: '/images/home/card1.png',
    text: '仰望星空的少女',
  },
  {
    img: '/images/home/card2.png',
    text: '仰望星空的少年',
  },
];

const currentCardList = computed(() => curTab.value === 'mine' ? mineCardList : cardList);

const swiperList = Array.from({ length: 5 }).map((_, index) => `/images/home/card${index}.png`);

function onChangeTab(value: string) {
  console.log('value', value);
  curTab.value = value;
}

const refreshing = ref(false);
function handleRefresh() {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
}

function onClickPublish() {
  router.push('/release');
}
</script>

<style scoped lang="scss">
.home {
  :deep(.t-tabs__content) {
    background-color: #f3f3f3;
    padding-bottom: 56px;
  }
}

.home__cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px 6px;
  padding: 12px;
  background-color: #f3f3f3;
}

.home__swiper {
  width: 170px;

  .t-image {
    height: 100%;
  }
}
</style>
