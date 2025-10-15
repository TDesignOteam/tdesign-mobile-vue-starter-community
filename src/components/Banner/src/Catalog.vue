<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const router = useRouter()

const { t } = useI18n()

interface RouteItem {
  path: string
  title: string
}

const cataList = reactive<RouteItem[]>([])

function normalizePath(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}

function buildCataList() {
  cataList.length = 0

  function traverseRoutes(routes: readonly any[], basePath: string = ''): void {
    for (const route of routes) {
      if (route.meta?.i18n) {
        const fullPath = normalizePath(basePath + route.path)
        cataList.push({
          path: fullPath,
          title: t(route.meta.i18n),
        })
      }
      else if (route.meta?.title) {
        const fullPath = normalizePath(basePath + route.path)
        cataList.push({
          path: fullPath,
          title: route.meta.title,
        })
      }

      if (route.children?.length) {
        const newBasePath = route.path ? `${basePath}${route.path}/` : basePath
        traverseRoutes(route.children, newBasePath)
      }
    }
  }

  traverseRoutes(router.options.routes)
}

function handleRouteClick(item: RouteItem) {
  router.push(item.path)
}

onBeforeMount(() => {
  buildCataList()
})
</script>

<template>
  <div class="catalog">
    <h3 class="title">
      {{ t('menus.catalog') }}
    </h3>
    <div
      v-for="item in cataList"
      :key="item.path"
      class="item"
      @click="handleRouteClick(item)"
    >
      <span class="text">{{ item.title }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.catalog {
  width: 280px;
  padding: 16px;
  background-color: #ffffff;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
}

.item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.text {
  display: block;
  font-size: 18px;
  font-weight: 500;
  color: #333333;
  line-height: 1.5;
  margin-bottom: 4px;
}
</style>
