<script setup lang="ts">
import { useDirectiveTest } from './hooks'

// 该页面仅供功能演示，不作国际化处理

defineOptions({
  name: 'DirectiveTest',
})

const {
  copyText,
  tapCount,
  longpressResult,
  swipeResult,
  handleTap,
  handleLongPress,
  handleSwipe,
  debounceCount,
  handleDebounceClick,
  throttleCount,
  handleThrottleClick,
  imageLoaded,
  handleImageLoad,
} = useDirectiveTest()
</script>

<route lang="json5">
{
  meta: {
    title: '自定义指令',
  }
}
</route>

<template>
  <div class="bg-gray-100 h-full overflow-y-auto">
    <Banner title="指令测试" func="back" />

    <div class="p-4">
      <!-- Copy 指令测试 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          📋 Copy 指令测试
        </h3>
        <t-input v-model="copyText" placeholder="修改文本内容" class="mb-3" />
        <t-button v-copy="copyText" size="small" theme="primary">
          复制文本
        </t-button>
        <div class="text-gray-500 text-xs mt-2">
          点击按钮复制文本，复制成功会在控制台显示
        </div>
      </div>

      <!-- Touch 指令测试 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          👆 Touch 指令测试
        </h3>

        <!-- 单独事件测试 -->
        <div class="space-y-4">
          <!-- 点击测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试点击 (tap):
            </p>
            <p class="text-blue-600 text-xs mb-2 h-4">
              {{ tapCount > 0 ? `已点击 ${tapCount} 次` : '' }}
            </p>
            <div
              v-touch:tap="handleTap"
              class="bg-blue-100 p-4 rounded text-center text-blue-600 cursor-pointer hover:bg-blue-200 transition-colors"
            >
              点击这里
            </div>
          </div>

          <!-- 长按测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试长按 (300ms):
            </p>
            <p class="text-green-600 text-xs mb-2 h-4">
              {{ longpressResult }}
            </p>
            <div
              v-touch:longpress="handleLongPress"
              class="bg-green-100 p-4 rounded text-center text-green-600 cursor-pointer hover:bg-green-200 transition-colors"
            >
              长按这里
            </div>
          </div>

          <!-- 滑动测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试滑动 (上下左右):
            </p>
            <p class="text-purple-600 text-xs mb-2 h-4">
              {{ swipeResult }}
            </p>
            <div
              v-touch:swipe="handleSwipe"
              class="bg-purple-100 p-4 rounded text-center text-purple-600 cursor-pointer hover:bg-purple-200 transition-colors"
            >
              在这里滑动 (上/下/左/右)
            </div>
          </div>
        </div>
      </div>

      <!-- Debounce/Throttle 指令测试 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          ⏱️ Debounce/Throttle 指令测试
        </h3>

        <div class="space-y-4">
          <!-- 防抖测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试防抖 (停止点击 500ms 后触发):
            </p>
            <p class="text-cyan-600 text-xs mb-2 h-4">
              触发次数: {{ debounceCount }}
            </p>
            <t-button v-debounce="handleDebounceClick" size="small">
              防抖点击
            </t-button>
          </div>

          <!-- 节流测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试节流 (每 500ms 最多触发一次):
            </p>
            <p class="text-teal-600 text-xs mb-2 h-4">
              触发次数: {{ throttleCount }}
            </p>
            <t-button v-throttle="handleThrottleClick" size="small">
              节流点击
            </t-button>
          </div>
        </div>
      </div>

      <!-- ImgLazy 指令测试 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          🖼️ ImgLazy 指令测试
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          向下滚动看图片懒加载效果
        </p>

        <div class="border border-gray-200 rounded p-3">
          <p class="text-gray-600 text-xs mb-2">
            测试图片: https://picsum.photos/300/200?random=1
          </p>
          <div class="relative w-full h-48 bg-gray-200 rounded overflow-hidden">
            <!-- Loading 状态 -->
            <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
              <t-loading text="加载中..." />
            </div>
            <!-- 懒加载图片 -->
            <img
              v-img-lazy="'https://picsum.photos/300/200?random=1'"
              alt="懒加载图片"
              class="w-full h-full object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': !imageLoaded }"
              @load="handleImageLoad"
            >
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
        <h4 class="text-gray-800 font-medium mb-2">
          💡 使用说明：
        </h4>
        <div class="text-gray-600 text-sm space-y-1">
          <div class="my-2 font-bold">
            Copy 指令：
          </div>
          <p>• v-copy="text" - 复制指定文本</p>

          <div class="my-2 font-bold">
            Touch 指令：
          </div>
          <p>• v-touch:tap="handler" - 点击事件</p>
          <p>• v-touch:longpress="handler" - 长按事件 (300ms)</p>
          <p>• v-touch:swipe="handler" - 滑动事件</p>

          <div class="my-2 font-bold">
            Debounce/Throttle 指令：
          </div>
          <p>• v-debounce:500="handler" - 防抖 (默认500ms)</p>
          <p>• v-throttle:500="handler" - 节流 (默认500ms)</p>

          <div class="my-2 font-bold">
            ImgLazy 指令：
          </div>
          <p>• v-img-lazy="imageUrl" - 图片懒加载</p>
        </div>
      </div>
    </div>
  </div>
</template>
