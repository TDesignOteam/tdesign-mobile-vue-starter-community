import { ref } from 'vue'

export interface UseHomeGridOptions {
  /** 最小卡片宽度，用于计算列数 */
  minCardWidth?: number
  /** 卡片行高（含行间距），与 UI 尺寸保持一致 */
  itemSize?: number
  /** 外层容器左右留白合计，用于计算可用宽度 */
  horizontalPadding?: number
}

export function useHomeGrid(options: UseHomeGridOptions = {}) {
  const minCardWidth = options.minCardWidth ?? 170
  const itemSize = options.itemSize ?? 256
  const horizontalPadding = options.horizontalPadding ?? 24

  const contentRef = ref<HTMLElement | null>(null)
  const gridCols = ref(2)
  const itemSecondarySize = ref(182)

  function computeGridCols() {
    const width = contentRef.value?.clientWidth || window.innerWidth
    const innerWidth = Math.max(0, width - horizontalPadding)
    const cols = Math.max(1, Math.floor(innerWidth / minCardWidth))
    gridCols.value = cols
    itemSecondarySize.value = cols > 0 ? innerWidth / cols : innerWidth
  }

  let resizeObserver: ResizeObserver | null = null

  function setupResizeObserver(target?: HTMLElement | null) {
    const el = target ?? contentRef.value
    if (!el || typeof ResizeObserver === 'undefined')
      return
    if (resizeObserver)
      resizeObserver.disconnect()
    resizeObserver = new ResizeObserver(() => computeGridCols())
    resizeObserver.observe(el)
  }

  function teardownResizeObserver() {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }

  return {
    // refs
    contentRef,
    gridCols,
    itemSecondarySize,
    itemSize,
    // methods
    computeGridCols,
    setupResizeObserver,
    teardownResizeObserver,
  }
}
