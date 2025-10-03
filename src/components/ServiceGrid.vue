<script setup lang="ts">
interface ServiceItem {
  name: string
  icon: string
}

interface Props {
  title: string
  services: ServiceItem[][]
}

defineProps<Props>()

defineEmits<{
  serviceClick: [service: ServiceItem]
}>()
</script>

<template>
  <div class="service-card">
    <!-- 服务标题 -->
    <div class="service-header">
      <div class="service-title">
        {{ title }}
      </div>
    </div>

    <!-- 服务内容 -->
    <div class="service-content">
      <div
        v-for="(serviceRow, rowIndex) in services"
        :key="rowIndex"
        class="service-row"
      >
        <div
          v-for="(service, index) in serviceRow"
          :key="index"
          class="service-item"
          @click="$emit('serviceClick', service)"
        >
          <div class="service-icon-wrapper">
            <t-image :src="service.icon" :lazy="true" fit="cover" class="service-icon" :alt="service.name" />
          </div>
          <div class="service-name">
            {{ service.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-card {
  background: var(--td-mask-background);
  border-radius: 12px;
  margin: 16px 16px 18px 16px;
  min-height: 200px;

  .service-header {
    height: 20px;
    padding: 16px 20px 0;

    .service-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--td-text-color-primary);
    }
  }

  .service-content {
    .service-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      &:last-child {
        margin-bottom: 0;
      }

      .service-item {
        padding: 16px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
        min-height: 80px;
        justify-content: flex-start;

        &:active {
          background-color: #f5f5f5;
          transform: scale(0.98);
        }

        .service-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;

          .service-icon {
            width: 40px;
            height: 40px;
          }
        }

        .service-name {
          font-size: 12px;
          width: calc(100% - 16px);
          height: 20px;
          color: var(--td-text-color-primary);
          font-weight: 400;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 8px 8px;
        }
      }
    }
  }
}

// 移动端适配
@media (max-width: 414px) {
  .service-card {
    .service-header {
      padding: 16px 16px 0;
    }

    .service-content {
      .service-row {
        .service-item {
          min-height: 75px;

          .service-icon-wrapper {
            width: 36px;
            height: 36px;

            .service-icon {
              width: 36px;
              height: 36px;
            }
          }

          .service-name {
            font-size: 10px;
          }
        }
      }
    }
  }
}

@media (max-width: 375px) {
  .service-card {
    .service-content {
      .service-row {
        .service-item {
          min-height: 80px;

          .service-icon-wrapper {
            width: 40px;
            height: 40px;

            .service-icon {
              width: 40px;
              height: 40px;
            }
          }

          .service-name {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
