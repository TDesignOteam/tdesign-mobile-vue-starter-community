import type { ComposerTranslation } from 'vue-i18n'
import type { LoginResponse } from './types'

import { useUserStoreHook } from '@/store'
import { setToken } from '@/utils/auth'
import { notifyError, notifySuccess } from '@/utils/notify'

export function useLoginHook(t: ComposerTranslation) {
  const currStep = ref(1)
  const router = useRouter()
  const userStore = useUserStoreHook()

  const form = reactive({
    account: '',
    password: '',
    phone: '',
    verCode: '',
    verCodeId: '',
    region: '+86',
    isAgree: false,
  })

  const title = computed(() => {
    if (currStep.value === 3) {
      return t('pageLogin.title2')
    }
    else {
      return t('pageLogin.title1')
    }
  })

  const btnText = computed(() => {
    if (currStep.value === 2) {
      return t('pageLogin.btnVerLogin')
    }
    else {
      return t('pageLogin.btnLogin')
    }
  })

  const allowClick = computed(() => {
    if (!form.isAgree) {
      return false
    }
    if (currStep.value === 1) {
      // 账号密码
      if (form.account.length === 0 || form.password.length === 0) {
        return false
      }
    }

    if (currStep.value === 2) {
      // 手机号
      if (form.phone.length !== 11) {
        return false
      }
    }

    if (currStep.value === 3) {
      // 验证码
      if (form.verCode.length !== 6) {
        return false
      }
    }
    return true
  })

  async function handleClick() {
    if (currStep.value === 1) {
      // 账号密码登录
      try {
        const res = await userStore.loginByUsername<LoginResponse>({
          account: form.account,
          password: form.password,
        })
        loginSuccess(res.data)
      }
      catch (error) {
        notifyError(error.message)
      }
      return
    }

    if (currStep.value === 2) {
      // 手机号校验...
      currStep.value = 3
      return
    }

    if (currStep.value === 3) {
      // 验证码登录
      try {
        const res = await userStore.loginByPhone<LoginResponse>({
          phone: form.phone,
          region: form.region,
          codeId: form.verCodeId,
          code: form.verCode,
        })
        loginSuccess(res.data)
      }
      catch (error) {
        notifyError(error.message)
      }
    }
  }

  function loginSuccess(data: LoginResponse) {
    setToken(data)
    notifySuccess(t('pageLogin.msgLoginSucces'))
    router.replace('/profile')
  }

  return {
    form,
    title,
    btnText,
    currStep,
    allowClick,
    handleClick,
  }
}
