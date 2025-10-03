import type { FormInstanceFunctions } from 'tdesign-mobile-vue'
import type { FormData, FormVisible, UploadFile } from '../types'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { updateUserInfo } from '@/api/auth'
import { message as $message } from '@/plugins/message'
import { useUserStore } from '@/store/user'
import { useAddressPicker } from '../composables/useAddressPicker'

export function useEditHook() {
  const router = useRouter()
  const { t } = useI18n()
  const formRef = ref<FormInstanceFunctions>()
  const userStore = useUserStore()

  const {
    addressColumns,
    onAddressColumnChange,
  } = useAddressPicker()

  // 表单数据
  const formData = ref<FormData>({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: [],
  })

  const addressLabel = ref('')

  watch(() => userStore.userInfo, (newUserInfo) => {
    if (newUserInfo) {
      formData.value = {
        username: newUserInfo.name || '',
        gender: newUserInfo.gender || '',
        birthday: newUserInfo.birthday || '',
        address: newUserInfo.address || '',
        bio: newUserInfo.bio || '',
        photos: newUserInfo.photos?.map(url => ({ url })) || [],
      }
      addressLabel.value = newUserInfo.address || ''
    }
  }, { immediate: true })

  // 选择器状态
  const formVisible = reactive<FormVisible>({
    birthday: false,
    address: false,
  })

  // 日期相关状态
  const defaultBirthday = ref(dayjs().subtract(20, 'year').format('YYYY-MM-DD'))
  const birthdayValue = computed({
    get: () => formData.value.birthday || defaultBirthday.value,
    set: (value: string) => {
      formData.value.birthday = value
    },
  })

  // 事件处理函数
  async function handleSave() {
    console.warn('save profile info:', formData.value)

    if (!userStore.userInfo) {
      $message.error(t('pages.my.errors.user_not_exists'))
      return
    }

    try {
      const updateData = {
        name: formData.value.username,
        gender: formData.value.gender,
        birthday: formData.value.birthday,
        address: formData.value.address,
        location: formData.value.address,
        bio: formData.value.bio,
        photos: formData.value.photos?.map(photo => photo.url || '').filter(Boolean) || [],
      }

      const response = await updateUserInfo(updateData)

      if (response.success) {
        // 同步更新Pinia store中的用户信息
        const updatedUserInfo = {
          ...userStore.userInfo,
          ...updateData,
        }
        userStore.setUserInfo(updatedUserInfo)

        $message.success(t('common.messages.success'))
        router.back()
      }
      else {
        $message.error(response.message || t('common.messages.error'))
      }
    }
    catch (error) {
      console.error('save profile failed:', error)
      $message.error(t('pages.my.errors.save_failed_retry'))
    }
  }

  // 地址选择器确认
  function handleAddressConfirm(val: any, context: any) {
    const { label } = context
    const filteredLabels = label.filter(Boolean) // 过滤空值

    addressLabel.value = filteredLabels.join(' ')
    formData.value.address = filteredLabels.join(' ')
    formVisible.address = false
  }

  // 打开选择器
  function handleDatePickerOpen() {
    formVisible.birthday = true
  }

  function handleAddressPickerOpen() {
    formVisible.address = true
  }

  // 相片上传处理
  function handlePicChange(files: UploadFile[]) {
    console.warn('upload files changed:', files)
    formData.value.photos = files
  }

  return {
    formRef,
    formData,
    formVisible,
    addressColumns,
    addressLabel,
    birthdayValue,
    handleSave,
    handleAddressConfirm,
    onAddressColumnChange,
    handleDatePickerOpen,
    handleAddressPickerOpen,
    handlePicChange,
  }
}
