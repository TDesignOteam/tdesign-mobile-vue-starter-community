// Props（属性）
// - items: 列表数据（必填）
// - itemSize?: 单项高度估计值（Dynamic: 最小高度；Recycle/Grid: 行高），默认 80
// - keyField?: 唯一键字段名，默认 'id'
// - bufferPx?: 视口缓冲像素（Dynamic 直接使用；Recycle 会按行高换算为“项数”），默认 200
// - addRecycleBuffer?: 仅 Recycle 模式下附加的额外缓冲项数，用于精细调优
// - pageMode?: 是否使用“页面滚动”模式（默认 false；false 表示自身容器滚动）
// - mode?: 'dynamic' | 'recycle'（由外部手动切换模式，默认 dynamic）
// - gridItems?: 每行列数（仅在 recycle 模式下用于开启栅格，需固定 itemSize）
// - itemSecondarySize?: 栅格单元的次要尺寸（Grid 宽度），与 gridItems 搭配使用
// - listClass/itemClass/listTag/itemTag: 透传给底层虚拟列表以自定义类名与标签
// - 其他 HTML Attributes（如 class/style）将通过 $attrs 透传到内部根组件
//
// Events（事件）
// - update(startIndex, endIndex, visibleStartIndex?, visibleEndIndex?)
//   可见区域变化时触发：
//   - startIndex/endIndex：当前渲染区间（包含缓冲区）
//   - visibleStartIndex/visibleEndIndex：真实视口内区间
//
// Slots（插槽）
// - 默认插槽：v-slot="{ item, index, active }"
//   说明：在 Recycle/Grid 模式会额外提供 active；Dynamic 模式下 active 由内部组件管理
<script setup lang='ts'>
import { computed } from 'vue'
import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface Props<T = any> {
  items: T[]
  itemSize?: number
  keyField?: string
  bufferPx?: number
  pageMode?: boolean
  mode?: 'dynamic' | 'recycle'
  listClass?: string
  itemClass?: string
  listTag?: string
  itemTag?: string
  addRecycleBuffer?: number
  // Recycle/Grid 模式（固定尺寸/栅格）
  gridItems?: number
  itemSecondarySize?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', startIndex: number, endIndex: number, visibleStartIndex?: number, visibleEndIndex?: number): void
}>()

const keyField = computed(() => props.keyField ?? 'id')
const bufferPx = computed(() => props.bufferPx ?? 200)
const pageMode = computed(() => props.pageMode ?? false)
const minItemSize = computed(() => props.itemSize ?? 80)
const isRecycleMode = computed(() => props.mode === 'recycle')

// 对于 RecycleScroller：其 buffer 表示“项数”，不是像素
// 将像素缓冲转换为项数缓冲（按行高换算，再乘以列数）
const recycleBuffer = computed(() => {
  const px = bufferPx.value
  const rows = Math.max(2, Math.ceil(px / (minItemSize.value || 1)))
  const cols = isRecycleMode.value ? Math.max(1, Number(props.gridItems) || 1) : 1
  return rows * cols + (props.addRecycleBuffer ?? 0)
})

function onUpdate(startIndex: number, endIndex: number, visibleStartIndex?: number, visibleEndIndex?: number) {
  emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex)
}
</script>

<template>
  <template v-if="isRecycleMode">
    <!-- @vue-ignore -->
    <RecycleScroller
      v-slot="{ item, index, active }" class="vl-container" v-bind="$attrs"
      :items="props.items" :item-size="minItemSize" :buffer="recycleBuffer" :key-field="keyField"
      :page-mode="pageMode" :list-class="props.listClass" :item-class="props.itemClass" :list-tag="props.listTag"
      :item-tag="props.itemTag" :grid-items="props.gridItems" :item-secondary-size="props.itemSecondarySize"
      :emit-update="true" @update="onUpdate"
    >
      <slot :item="item" :index="index" :active="active" />
    </RecycleScroller>
  </template>
  <template v-else>
    <!-- @vue-ignore -->
    <DynamicScroller
      v-slot="{ item, index, active }" class="vl-container" v-bind="$attrs"
      :items="props.items" :min-item-size="minItemSize" :buffer="bufferPx" :key-field="keyField"
      :page-mode="pageMode" :list-class="props.listClass" :item-class="props.itemClass" :list-tag="props.listTag"
      :item-tag="props.itemTag" :emit-update="true" @update="onUpdate"
    >
      <DynamicScrollerItem :item="item" :index="index" :active="active">
        <slot :item="item" :index="index" />
      </DynamicScrollerItem>
    </DynamicScroller>
  </template>
</template>

<style scoped lang='scss'>
.vl-container {
  height: 100%;
  overflow-y: auto;
}
</style>
