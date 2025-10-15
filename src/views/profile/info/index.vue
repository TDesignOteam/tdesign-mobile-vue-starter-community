<script setup lang='ts'>
import dayjs from 'dayjs'

import { useI18n } from 'vue-i18n'
import { useInfoHook } from './utils/hooks'
import { rules } from './utils/rules'

defineOptions({
  name: 'Info',
})

const { t } = useI18n()

const {
  formRef,
  formData,
  allowSubmit,
  formVisible,
  addressLabel,
  addressColumns,
  birthdayValue,
  handleSubmit,
  handlePicChange,
  handleAddressConfirm,
  onAddressColumnChange,
  loadProfileInfo,
} = useInfoHook(t)

onMounted(() => {
  loadProfileInfo()
})
</script>

<template>
  <div class="profile-info-wrapper pb-[80px] h-full">
    <Banner :title="t('menus.info')" />

    <t-form
      ref="formRef"
      :data="formData"
      :rules="rules(t)"
      reset-type="initial"
      scroll-to-first-error="auto"
      label-align="left"
      label-width="initial"
      class="h-full overflow-y-auto"
    >
      <t-form-item :label="t('pageInfo.LUsername')" name="username">
        <t-input
          v-model="formData.username"
          borderless
          :placeholder="t('pageInfo.plh.username')"
          :maxlength="30"
        />
      </t-form-item>

      <t-form-item :label="t('pageInfo.LSex')" name="gender">
        <t-radio-group v-model="formData.gender" class="w-full flex justify-between" borderless>
          <t-radio :block="false" name="gender" value="man" :label="t('pageInfo.sexM')" />
          <t-radio :block="false" name="gender" value="women" :label="t('pageInfo.sexF')" />
          <t-radio :block="false" name="gender" value="secret" :label="t('pageInfo.sexS')" />
        </t-radio-group>
      </t-form-item>

      <t-form-item arrow :label="t('pageInfo.LBirth')" name="birthday" content-align="right">
        <t-input
          v-model="formData.birthday"
          borderless
          align="right"
          :placeholder="t('pageInfo.plh.birthday')"
          readonly
          class="picker-input"
          @click="formVisible.birthday = true"
        />
        <t-popup v-model="formVisible.birthday" placement="bottom">
          <t-date-time-picker
            v-model="birthdayValue"
            :mode="['date']"
            :title="t('pageInfo.SDate')"
            format="YYYY-MM-DD"
            :start="dayjs().subtract(100, 'year').format('YYYY-MM-DD')"
            :end="dayjs().format('YYYY-MM-DD')"
            @confirm="formVisible.birthday = false"
            @cancel="formVisible.birthday = false"
          />
        </t-popup>
      </t-form-item>

      <t-form-item arrow :label="t('pageInfo.LAddress')" name="address" content-align="right">
        <t-input
          v-model="addressLabel"
          borderless
          align="right"
          :placeholder="t('pageInfo.plh.address')"
          readonly
          class="picker-input"
          @click="formVisible.address = true"
        />
        <t-popup v-model="formVisible.address" placement="bottom">
          <t-picker
            :title="t('pageInfo.SAddress')"
            :columns="addressColumns"
            @confirm="handleAddressConfirm"
            @cancel="formVisible.address = false"
            @pick="onAddressColumnChange"
          />
        </t-popup>
      </t-form-item>

      <t-form-item :label="t('pageInfo.LBio')" name="bio">
        <t-textarea
          v-model="formData.bio"
          class="w-full h-[100px]"
          indicator
          :maxlength="50"
          :placeholder="t('pageInfo.plh.bio')"
        />
      </t-form-item>

      <t-form-item :label="t('pageInfo.LPhoto')" name="photo">
        <t-upload
          v-model="formData.photos"
          class="upload-pic"
          multiple
          theme="image"
          :max="9"
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          @change="handlePicChange"
        />
      </t-form-item>
    </t-form>

    <div class="buttom-wrapper h-[80px] p-4 w-full absolute bottom-0">
      <t-button
        theme="primary"
        size="large"
        block
        :disabled="!allowSubmit"
        @click="handleSubmit"
      >
        {{ t('pageInfo.btnSave') }}
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.buttom-wrapper,
.profile-info-wrapper {
  background-color: var(--tmv-bg-color);
}

.picker-input {
  --td-input-default-text-color: rgba(0, 0, 0, 0.4);
}

.upload-pic {
  --td-upload-grid-columns: 3;

  :deep(.t-upload__delete-btn path) {
    transform: scale(0.725);
    transform-origin: center;
  }
}

:deep(.t-form__label--left) {
  min-width: 81px;
}
</style>
