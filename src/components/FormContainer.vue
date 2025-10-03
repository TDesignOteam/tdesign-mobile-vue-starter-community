<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="form-container">
    <div class="auth-header">
      <h1 class="title">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="form-content">
      <slot />
    </div>

    <div class="auth-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  margin-top: 4px;
}

.auth-header {
  text-align: left;
}

.title {
  height: 36px;
  color: var(--td-text-color-primary);
  font-size: 28px;
  font-weight: 600;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 36px;
  margin: 0 24px 0 20px;
}

.subtitle {
  margin: 16px 0 0 16px !important;
  font-size: 14px;
  color: #00000066;
  font-family: 'PingFang SC';
  margin: 0;
}

.switch-options {
  text-align: center;
  padding: 20px 0;

  :deep(.t-button) {
    font-size: 14px;
    color: var(--td-text-color-primary);
    font-family: 'PingFang SC';
  }
}
</style>
