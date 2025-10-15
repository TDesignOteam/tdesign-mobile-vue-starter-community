<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Other from './components/Other.vue'
import PasswordForm from './components/PasswordForm.vue'
import PhoneForm from './components/PhoneForm.vue'
import RecoverPwd from './components/RecoverPwd.vue'
import TermsForm from './components/TermsForm.vue'
import VerifyCodeForm from './components/VerifyCodeForm.vue'
import { useLoginHook } from './hooks'

const { t } = useI18n()

const {
  form,
  title,
  btnText,
  currStep,
  allowClick,
  handleClick,
} = useLoginHook(t)
</script>

<route lang="json5">
{
  meta: {
    title: '登录页',
    i18n: 'menus.login',
    showBackground: true,
    backgroundColor: '#fff'
  }
}
</route>

<template>
  <div class="h-full overflow-y-auto px-4">
    <Banner transparent :border="false" />
    <!-- 字体在 Windows 上有点怪，到了手机上刚刚好 -->
    <div class="text-[28px] font-semibold ml-1 mb-6">
      {{ title }}
    </div>

    <PasswordForm
      v-if="currStep === 1"
      v-model:account="form.account"
      v-model:password="form.password"
      class="mb-6"
    />

    <PhoneForm
      v-if="currStep === 2"
      v-model:phone="form.phone"
      v-model:region="form.region"
      class="mb-8"
    />

    <VerifyCodeForm
      v-if="currStep === 3"
      v-model:ver-code="form.verCode"
      v-model:ver-code-id="form.verCodeId"
      :region="form.region"
      :phone="form.phone"
    />

    <TermsForm v-if="currStep !== 3" v-model="form.isAgree" />

    <t-button
      block
      :disabled="!allowClick"
      theme="primary"
      size="large"
      class="!my-7"
      @click="handleClick"
    >
      {{ btnText }}
    </t-button>

    <RecoverPwd v-if="currStep === 1" class="" />

    <Other v-if="currStep !== 3" v-model="currStep" class="mt-8" />
  </div>
</template>
