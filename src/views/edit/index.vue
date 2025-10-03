<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import AddressField from './components/AddressField.vue'
import AddressPickerModal from './components/AddressPickerModal.vue'
import BioField from './components/BioField.vue'
import BirthdayField from './components/BirthdayField.vue'
import DatePickerModal from './components/DatePickerModal.vue'
import GenderField from './components/GenderField.vue'
import PhotosField from './components/PhotosField.vue'
import UsernameField from './components/UsernameField.vue'
import { useEditHook } from './composables/useEditHook'

defineOptions({
  name: 'MyEdit',
})

const { t } = useI18n()

const {
  formRef,
  formData,
  formVisible,
  addressLabel,
  addressColumns,
  birthdayValue,
  handleSave,
  handleAddressConfirm,
  onAddressColumnChange,
  handleDatePickerOpen,
  handleAddressPickerOpen,
  handlePicChange,
} = useEditHook()
</script>

<template>
  <div class="edit-page">
    <!-- 表单内容 - 使用 t-form 布局 -->
    <div class="form-content">
      <t-form
        ref="formRef" :data="formData" reset-type="initial" scroll-to-first-error="auto" label-align="left"
        class="edit-form"
      >
        <!-- 用户名 -->
        <UsernameField
          v-model="formData.username" :label="t('pages.my.edit.form.username')"
          :placeholder="t('pages.my.edit.placeholders.username')" :maxlength="30"
        />

        <!-- 性别 -->
        <GenderField
          v-model="formData.gender" :label="t('pages.my.edit.form.gender')"
          :male-label="t('pages.my.edit.gender.male')" :female-label="t('pages.my.edit.gender.female')"
          :secret-label="t('pages.my.edit.gender.secret')"
        />

        <!-- 生日 -->
        <BirthdayField
          v-model="formData.birthday" :label="t('pages.my.edit.form.birthday')"
          :placeholder="t('pages.my.edit.placeholders.birthday')" @open="handleDatePickerOpen"
        />

        <!-- 地址 -->
        <AddressField
          :label="t('pages.my.edit.form.address')" :display-value="addressLabel"
          :placeholder="t('pages.my.edit.placeholders.address')" @open="handleAddressPickerOpen"
        />

        <!-- 个人简介 -->
        <BioField
          v-model="formData.bio" :label="t('pages.my.edit.form.bio')"
          :placeholder="t('pages.my.edit.placeholders.bio')" :maxlength="50"
        />

        <!-- 相片墙 -->
        <PhotosField
          v-model="formData.photos" :label="t('pages.my.edit.form.photo')"
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" :max="9"
          @change="handlePicChange"
        />
      </t-form>
    </div>

    <!-- 保存按钮 -->
    <div class="save-button-container">
      <button class="save-button" @click="handleSave">
        {{ t('common.buttons.save') }}
      </button>
    </div>

    <!-- 日期选择器弹窗 -->
    <DatePickerModal
      v-model="formVisible.birthday"
      v-model:date-value="birthdayValue"
      :title="t('pages.my.edit.pickers.date_title')"
      format="YYYY-MM-DD"
      :start="dayjs().subtract(100, 'year').format('YYYY-MM-DD')"
      :end="dayjs().format('YYYY-MM-DD')"
      @confirm="formVisible.birthday = false"
      @cancel="formVisible.birthday = false"
    />

    <!-- 地址选择器弹窗 -->
    <AddressPickerModal
      v-model="formVisible.address"
      :title="t('pages.my.edit.pickers.address_title')"
      :columns="addressColumns"
      @confirm="handleAddressConfirm"
      @cancel="formVisible.address = false"
      @pick="onAddressColumnChange"
    />
  </div>
</template>

<style lang="scss" scoped>
@use './styles/edit.scss' as *;

// t-form 样式优化
.edit-form {
  background-color: var(--td-bg-color-container);

  :deep(.t-form-item) {
    border-bottom: 0.5px solid var(--td-border-level-1-color);
    padding: 16px;
    margin: 0;

    &:last-child {
      border-bottom: none;
    }
  }

  :deep(.t-form-item__label) {
    color: var(--td-text-color-primary);
    font-size: 16px;
    font-weight: 400;
    width: 80px;
    flex-shrink: 0;
  }

  :deep(.t-form-item__content) {
    flex: 1;
  }

  // 输入框样式
  :deep(.t-input) {
    --td-input-default-text-color: var(--td-text-color-primary);
  }

  :deep(.t-input__inner) {
    color: var(--td-text-color-primary) !important;
    font-size: 16px;
  }

  :deep(input) {
    color: var(--td-text-color-primary) !important;
  }

  // 文本域样式
  :deep(.t-textarea__inner) {
    color: var(--td-text-color-primary) !important;
    font-size: 16px;
    line-height: 1.5;
  }

  :deep(textarea) {
    color: var(--td-text-color-primary) !important;
  }
}

// 选择器输入框样式
.picker-input {
  --td-input-default-text-color: #00000066;

  :deep(.t-input__inner) {
    color: #00000066 !important;
  }

  :deep(input) {
    color: #00000066 !important;
  }
}

// 相片墙样式
.upload-pic {
  --td-upload-grid-columns: 3;

  :deep(.t-upload__delete-btn path) {
    transform: scale(0.725);
    transform-origin: center;
  }

  :deep(.t-upload__wrapper) {
    gap: 8px;
  }
}
</style>
