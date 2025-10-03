<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface Props {
  type: 'password' | 'phone'
}

const props = defineProps<Props>()
const router = useRouter()
const { t } = useI18n()

const buttonText = computed(() =>
  props.type === 'phone'
    ? t('pages.login.password_code_login')
    : t('pages.login.verify_code_login'),
)
const targetRoute = computed(() => props.type === 'phone' ? '/login/password' : '/login/phone')

function handleSwitchLogin() {
  router.push(targetRoute.value)
}
</script>

<template>
  <div class="login-buttons">
    <span class="other-method">{{ t('pages.login.other_methods') }}</span>
    <t-button
      variant="outline"
      theme="default"
      size="medium"
      shape="round"
      prefix-icon="false"
      suffix-icon="false"
      single-icon="false"
      press="false"
      class="switch-login-button"
      @click="handleSwitchLogin"
    >
      {{ buttonText }}
    </t-button>
    <t-button
      variant="outline"
      theme="default"
      size="medium"
      shape="circle"
      prefix-icon="false"
      suffix-icon="false"
      single-icon="false"
      press="false"
      class="other-login-button"
    >
      <t-icon name="logo-wechat-stroke-filled" size="17.5px" />
    </t-button>
    <t-button
      variant="outline"
      theme="default"
      size="medium"
      shape="circle"
      prefix-icon="false"
      suffix-icon="false"
      single-icon="false"
      press="false"
      class="other-login-button"
    >
      <t-icon name="logo-qq-filled" size="17.5px" />
    </t-button>
    <t-button
      variant="outline"
      theme="default"
      size="medium"
      shape="circle"
      prefix-icon="false"
      suffix-icon="false"
      single-icon="false"
      press="false"
      class="other-login-button"
    >
      <t-icon name="logo-wecom" size="17.5px" />
    </t-button>
  </div>
</template>

<style lang="scss" scoped>
.login-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
}

.other-method {
  opacity: 1;
  color: #00000099;
  font-size: 12px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 20px;
}

.switch-login-button {
  color: var(--td-text-color-primary);
  font-size: 14px;
  font-weight: 600;
  font-family: 'PingFang SC';
  text-align: center;
  line-height: 22px;
}

.other-login-button {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
