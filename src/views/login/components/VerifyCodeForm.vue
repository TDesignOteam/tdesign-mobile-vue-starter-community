<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { sendVerifyCode } from '@/api/auth'
import { FormContainer } from '@/components'
import { useUserStore } from '@/store/user'
import { cleanPhoneNumber, validateCode } from '@/utils/validators'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 从路由参数获取手机号信息
const phoneNumber = ref(route.query.phone as string || '188****8888')
const countryCode = ref(route.query.countryCode as string || '+86')

const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null
let countdownEndAt: number | null = null
const verifyCode = ref('')
const codeValid = ref(false)

// 加载状态
const isLoading = ref(false)
const errorMessage = ref('')

// 显示的手机号
const displayPhone = computed(() => {
  const phone = phoneNumber.value
  if (phone.startsWith('+')) {
    const purePhone = phone.replace(/^\+\d{1,2}/, '')
    if (purePhone.length >= 7) {
      return `${purePhone.slice(0, 3)}****${purePhone.slice(-4)}`
    }
  }
  else if (phone.length === 11) {
    return `${phone.slice(0, 3)}****${phone.slice(-4)}`
  }
  return phone
})

// 监听验证码变化并验证
watch(
  verifyCode,
  (newValue) => {
    // 清除错误信息
    errorMessage.value = ''

    if (newValue) {
      // 清理输入值
      const cleanValue = cleanPhoneNumber(newValue)
      if (cleanValue !== newValue) {
        verifyCode.value = cleanValue
        return
      }
      // 验证验证码
      codeValid.value = validateCode(cleanValue)
    }
    else {
      codeValid.value = false
    }
  },
  { immediate: true },
)

async function handleVerify() {
  if (!codeValid.value || isLoading.value) {
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    const phoneForBackend = phoneNumber.value.replace(/^\+/, '')
    const user = {
      id: Date.now().toString(),
      name: `企鹅${phoneForBackend.slice(-4) || '用户'}`,
      phone: phoneForBackend,
    }
    userStore.handleLoginSuccess('mock-token', user)
    router.push('/home')
  }
  catch (error) {
    console.error(error)
    errorMessage.value = t('pages.login.login')
  }
  finally {
    isLoading.value = false
  }
}

async function handleResend() {
  if (countdown.value > 0) {
    return
  }

  try {
    // 去掉手机号前面的加号发送给后端
    const phoneForBackend = phoneNumber.value.replace(/^\+/, '')
    const result = await sendVerifyCode({
      phone: phoneForBackend,
    })

    if (result.success) {
      const cd = (result as any).data?.countdown ?? 60
      countdownEndAt = Date.now() + cd * 1000
      startCountdown()
    }
    else {
      errorMessage.value = result.message || t('pages.login.send_code_failed')
    }
  }
  catch (error) {
    console.error('Failed to resend code:', error)
    errorMessage.value = t('pages.login.network_error')
  }
}

function startCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }

  const tick = () => {
    if (!countdownEndAt) {
      countdown.value = 0
      return
    }
    const remainMs = countdownEndAt - Date.now()
    const next = Math.max(0, Math.ceil(remainMs / 1000))
    countdown.value = next
    if (next <= 0) {
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }

  // 立即计算一次，保证 UI 立刻切换
  tick()
  countdownTimer = setInterval(tick, 500)
}

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<template>
  <FormContainer
    :title="t('pages.login.enter_code')"
    :subtitle="t('pages.login.code_sent', { phone: displayPhone })"
  >
    <div class="verify-section">
      <t-input
        v-model="verifyCode"
        :placeholder="t('pages.login.code_placeholder')"
        class="auth-input-container"
        type="tel"
        inputmode="numeric"
        pattern="[0-9]*"
        autocomplete="one-time-code"
        maxlength="6"
        :tips="errorMessage"
        status="error"
      >
        <template #suffix>
          <div class="suffix auth-flex-center">
            <div class="auth-divider auth-divider--24" />
            <div
              class="verify"
              :class="{ 'verify-disabled': countdown > 0 }"
              aria-role="button"
              @click="handleResend"
            >
              {{
                countdown > 0
                  ? t('pages.login.resend_countdown', { seconds: countdown })
                  : t('common.buttons.send_code')
              }}
            </div>
          </div>
        </template>
      </t-input>
    </div>

    <t-button
      size="large"
      theme="primary"
      class="verify-button auth-primary-button"
      :disabled="!codeValid || isLoading"
      :loading="isLoading"
      @click="handleVerify"
    >
      {{ t('common.buttons.login') }}
    </t-button>
  </FormContainer>
</template>

<style lang="scss" scoped>
.verify {
  text-align: center;
  margin-left: 16px;
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #0052d9;
  cursor: pointer;
  user-select: none;
}

.verify-disabled {
  color: #b5c7ff;
  cursor: not-allowed;
}
.verify-section {
  text-align: center;
  padding: 20px 0;
  margin-top: 24px;
}
</style>
