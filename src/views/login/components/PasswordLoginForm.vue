<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { passwordLogin } from '@/api/auth'
import { FormContainer } from '@/components'
import { useUserStore } from '@/store/user'
import AgreementCheckbox from './shared/AgreementCheckbox.vue'
import LoginButtons from './shared/LoginButtons.vue'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

const account = ref('')
const password = ref('')
const agreedToTerms = ref(false)

// 加载状态
const isLoading = ref(false)
const errorMessage = ref('')

const canLogin = computed(() => {
  return account.value.trim() && password.value.trim() && agreedToTerms.value && !isLoading.value
})

// 清除错误信息
watch([account, password], () => {
  errorMessage.value = ''
})

async function handleLogin() {
  if (!canLogin.value) {
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''

    const result = await passwordLogin({
      account: account.value.trim(),
      password: password.value,
    })

    if (result.success && result.data) {
      // 保存用户信息到store
      userStore.handleLoginSuccess(result.data.token, result.data.user)
      // 跳转到首页
      router.push('/home')
    }
    else {
      errorMessage.value = result.message
    }
  }
  catch (error) {
    errorMessage.value = t('pages.login.network_error')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <FormContainer :title="t('pages.login.welcome')">
    <!-- 账号输入 -->
    <div class="input-section">
      <div class="input-wrapper auth-input-container">
        <t-input
          v-model="account"
          :label="t('pages.login.account')"
          :placeholder="t('pages.login.account_placeholder')"
          class="account-input"
          borderless
          inputmode="email"
          autocomplete="username"
        />
      </div>
      <!-- 密码输入 -->
      <div class="input-wrapper auth-input-container">
        <t-input
          v-model="password"
          type="password"
          :label="t('pages.login.password')"
          :placeholder="t('pages.login.password_placeholder')"
          class="password-input"
          borderless
          autocomplete="current-password"
        />
      </div>
    </div>
    <AgreementCheckbox v-model="agreedToTerms" />
    <t-button
      size="large"
      theme="primary"
      class="login-button auth-primary-button"
      :disabled="!canLogin"
      :loading="isLoading"
      @click="handleLogin"
    >
      {{ t('common.buttons.login') }}
    </t-button>

    <!-- 错误信息显示 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div class="forgot-password auth-flex-center">
      <span class="forgot-text">{{ t('pages.login.forgot_password') }}</span>
      <span class="recovery-button">
        {{ t('pages.login.login') }}
      </span>
    </div>

    <template #footer>
      <LoginButtons type="password" />
    </template>
  </FormContainer>
</template>

<style lang="scss" scoped>
.input-section {
  margin: 24px 0 24px 0;
}
.item-text {
  height: 24px;
  width: 81px;
}
.input-wrapper {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 0;
    height: 0.5px;
    background-color: var(--td-component-border, var(--td-gray-color-4, #dcdcdc));
  }

  .account-input,
  .password-input {
    flex: 1;
    --td-spacer-2: 49px;
    background-color: transparent !important;
    :deep(.t-input__label) {
      padding-top: 3px;
    }
    :deep(.t-input__control) {
      font-family: 'PingFang SC';
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

.forgot-password {
  margin-left: 16px;

  .forgot-text {
    font-family: 'PingFang SC';
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: var(--td-text-color-primary);
  }

  .recovery-button {
    font-family: 'PingFang SC';
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #0052d9;
  }
}

.error-message {
  margin: 16px;
  padding: 12px;
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
  border-radius: 4px;
  color: #e34d59;
  font-size: 14px;
  text-align: center;
}
</style>
