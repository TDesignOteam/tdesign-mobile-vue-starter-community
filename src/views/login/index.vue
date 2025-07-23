<template>
  <div class="login">
    <t-navbar :fixed="false" left-arrow @left-click="clickBack" />
    <template v-if="form.step === 1">
      <div class="login__title">
        欢迎登录 TDesign
      </div>
      <div class="login__form">
        <template v-if="form.loginType === LOGIN_TYPE_MAP.CODE">

          <t-input placeholder="请输入手机号" type="number" v-model="form.phone">
            <template #label>
              <span class="login__input-label login__input-label--border">
                <span>
                  +86
                </span>
                <CaretDownSmallIcon size="16px"/>
              </span>
            </template>
          </t-input>
          <div class="login__tips">
            未注册的手机号验证通过后将自动注册
          </div>
        </template>
        <template v-else-if="form.loginType === LOGIN_TYPE_MAP.PASSWORD">
          <t-input placeholder="请输入手机号/邮箱" type="text" v-model="form.account">
            <template #label>
              <span class="login__input-label">
                <span>
                  账号
                </span>
              </span>
            </template>
          </t-input>
          <t-input placeholder="请输入密码" type="password" v-model="form.password" class="login__input-password">
            <template #label>
              <span class="login__input-label">
                <span>
                  密码
                </span>
              </span>
            </template>
          </t-input>
        </template>

        <t-radio v-model:checked="form.checked" allow-uncheck>
          <template #label>
            <div class="login__agreement">
              同意《协议条款》
            </div>
          </template>
        </t-radio>
        <div class="login__button-wrap">
          <t-button size="large" theme="primary" block @click="onTryLogin" :disabled="disabledLogin">
            {{ form.loginType === LOGIN_TYPE_MAP.CODE ? '验证并登录' : '登录' }}
          </t-button>
        </div>
        <div class="login__forgot">
          <span>忘记密码？</span>
          <t-link theme="primary" size="small" @click="onFindPassword">找回密码</t-link>
        </div>
      </div>
      <div class="login__others">
        <span class="login__others-tip">其他方式</span>
        <div class="login__others-buttons">
          <t-button class="login__others-button" variant="outline" shape="round" @click="onSwitchLogin">{{ otherLoginDesc }}</t-button>
          <t-button class="login__others-button" variant="outline" shape="round" v-for="(icon, iconIndex) of ICON_LOGIN_LIST" :key="`icon-${iconIndex}`" :icon="icon.icon"/>
        </div>
      </div>

    </template>
    <template v-else-if="form.step === 2">
      <div class="login__title">
        请输入验证码
      </div>
      <div class="login__code-tips">
        验证码已通过短信发送至 {{ form.phone }}
      </div>
      <t-input placeholder="请输入验证码" type="number" v-model="form.code" class="login__code-input">
        <template #suffix>
          <span class="login__code-button"
                :class="{
                  'login__code-button--disabled': disabledSendCode,
                }"
                @click.stop="() => sendVerifyCode(true)"
          >
            {{ disabledSendCode ? `${form.seconds}秒后重发` : '发送验证码' }}
          </span>
        </template>
      </t-input>
      <div class="login__code-button-wrap">
        <t-button size="large" theme="primary" block @click="onValidateVerifyCode" :disabled="disabledRealLogin">登录</t-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CaretDownSmallIcon, LogoQqIcon, LogoWechatStrokeIcon, LogoWecomIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import { computed, h, ref } from 'vue';
import { useRouter } from 'vue-router';
import { checkPhoneNumber, checkVerifyCode } from '../../logic/utils/index';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const userStore = useUserStore();

const LOGIN_TYPE_MAP = {
  CODE: 'code',
  PASSWORD: 'password',
};

const LOGIN_TYPE_DESC_MAP = {
  [LOGIN_TYPE_MAP.CODE]: '验证码登录',
  [LOGIN_TYPE_MAP.PASSWORD]: '密码登录',
};

let codeTimer: ReturnType<typeof setTimeout> | null = null;
function clickBack() {
  if (form.value.step === 2) {
    form.value.step = 1;
    return;
  }
  router.back();
}

const form = ref({
  phone: '',
  code: '',

  account: '',
  password: '',

  step: 1, // TODO: to be 1
  checked: true, // TODO: to be false
  seconds: 0,
  loginType: LOGIN_TYPE_MAP.CODE,
});

function onTryLogin() {
  if (form.value.loginType === LOGIN_TYPE_MAP.PASSWORD) {
    onValidateVerifyCode();
    return;
  }
  form.value.step = 2;
}
const disabledLogin = computed(() => {
  if (form.value.loginType == LOGIN_TYPE_MAP.CODE) {
    return !form.value.checked || !checkPhoneNumber(form.value.phone);
  }
  return !(form.value.account && form.value.password);
});
const disabledSendCode = computed(() => {
  return form.value.seconds > 0;
});
const otherLoginDesc = computed(() => {
  if (form.value.loginType === LOGIN_TYPE_MAP.CODE) {
    return LOGIN_TYPE_DESC_MAP[LOGIN_TYPE_MAP.PASSWORD];
  }
  return LOGIN_TYPE_DESC_MAP[LOGIN_TYPE_MAP.CODE];
});
function sendVerifyCode(init?: boolean) {
  if (disabledSendCode.value && init)
    return;
  if (codeTimer)
    clearTimeout(codeTimer);
  if (init) {
    form.value.seconds = 60;
  }
  if (form.value.seconds <= 0) {
    return;
  }
  codeTimer = setTimeout(() => {
    form.value.seconds -= 1;
    sendVerifyCode();
  }, 1000);
}

const disabledRealLogin = computed(() => {
  return !checkVerifyCode(form.value.code);
});

const ICON_LOGIN_LIST = [
  {
    icon: () => h(LogoWechatStrokeIcon, { size: '20px' }),
  },
  {
    icon: () => h(LogoQqIcon, { size: '20px' }),
  },
  {
    icon: () => h(LogoWecomIcon, { size: '20px' }),
  },
];
function onSwitchLogin() {
  form.value.loginType = form.value.loginType === LOGIN_TYPE_MAP.CODE
    ? LOGIN_TYPE_MAP.PASSWORD
    : LOGIN_TYPE_MAP.CODE;
}
function onValidateVerifyCode() {
  Toast('登录成功');
  userStore.updateLogin(true);
  setTimeout(() => {
    router.replace('/home/my');
  }, 300);
}

function onFindPassword() {
  console.log('onFindPassword');
}
</script>

<style scoped lang="scss">
.login {
  &__title {
    font-size: 28px;
    line-height: 36px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.90);
    margin: 8px 20px 16px;
  }
  &__form {
    --td-radio-icon-size: 16px;
  }
  &__input-label {
    display: flex;
    align-items: center;
    padding-right: 16px;
    box-sizing: border-box;
    &--border {
      border-right: 0.5px solid #e7e7e7;
    }
  }
  &__input-password {
    margin-bottom: 16px;
  }
  &__tips {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 12px 16px 16px;
  }
  &__agreement {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    margin-top: 4px;
  }
  &__button-wrap {
    margin: 0px 16px;
  }
  &__others {
    margin: 32px 16px auto 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__others-tip {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    line-height: 20px;
    margin-right: 6px;
  }
  &__others-button {
    --td-button-medium-padding-horizontal: 10px;
    &:first-child{
      padding: 0 16px;
    }
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__code-tips {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 12px 20px 16px 24px;
  }
  &__code-button {
    color: rgba(0, 82, 217, 1);
    font-size: 16px;
    padding-left: 16px;
    border-left: 0.5px solid #e7e7e7;
    cursor: pointer;

    &--disabled {
      color: #B5C7FF;
      cursor: not-allowed;
    }
  }
  &__code-input {
    margin-bottom: 32px;
  }
  &__code-button-wrap {
    margin: 0 16px 16px;
  }
  &__forgot {
    display: flex;
    font-size: 12px;
    align-items: center;
    margin: 16px;
    line-height: 20px;
  }
}
</style>
