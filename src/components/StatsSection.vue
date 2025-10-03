<script setup lang="ts">
interface StatItem {
  label: string
  icon: string
  count: number
}

interface Props {
  stats: StatItem[]
}

defineProps<Props>()

defineEmits<{
  statClick: [stat: StatItem, index: number]
}>()
</script>

<template>
  <div class="stats-section">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="stat-item"
      @click="$emit('statClick', stat, index)"
    >
      <div class="stat-icon">
        <t-icon :name="stat.icon" size="24" color="var(--td-text-color-primary)" />
      </div>
      <div class="stat-label">
        {{ stat.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-section {
  padding: 20px 16px;
  display: flex;
  justify-content: space-around;
  position: relative;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    position: relative;

    &:hover {
      background-color: var(--td-bg-color-page);
    }

    // 只在第二个item前添加分割线
    &:nth-child(2)::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 68px;
      background-color: #e7e7e7;
    }

    .stat-icon {
      margin-bottom: 8px;
      padding: 8px;
      background-color: var(--td-bg-color-page);
      border-radius: 6px;
    }

    .stat-label {
      font-size: 12px;
      color: var(--td-text-color-primary);
      font-weight: 400;
    }
  }
}
</style>
