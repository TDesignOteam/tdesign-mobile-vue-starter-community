import type { FormInstanceFunctions, PickerProps } from 'tdesign-mobile-vue'
import type { ComposerTranslation } from 'vue-i18n'
import type { ProfileForm, UploadFile } from './types'

import dayjs from 'dayjs'

import { Toast } from 'tdesign-mobile-vue'
import { getProfileInfoApi, updateProfileInfoApi } from '@/api/user'
import { areaList } from './data'

export function useInfoHook(t: ComposerTranslation) {
  const formRef = ref<FormInstanceFunctions>()
  const formData = reactive<ProfileForm>({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: [],
  })

  /** 允许提交，底部按钮状态 */
  const allowSubmit = computed(() => {
    return !!formData.username
      && !!formData.gender
      && !!formData.birthday
      && !!formData.address
      && !!formData.bio
  })

  const provinces = reactive(areaList.map(province => ({
    label: province.label,
    value: province.value,
  })))

  const cities = reactive(areaList[0]?.children?.map(city => ({
    label: city.label,
    value: city.value,
  })) || [])

  const addressColumns = computed(() => [provinces, cities])

  function onAddressColumnChange(value: any, context: any) {
    const { column, index } = context
    if (column === 0) {
      const selectedProvince = areaList[index]
      cities.splice(0, cities.length, ...(selectedProvince?.children?.map(city => ({
        label: city.label,
        value: city.value,
      })) || []))
    }
  }

  const addressLabel = ref('')
  const defaultBirthday = ref(dayjs().subtract(20, 'year').format('YYYY-MM-DD'))
  const birthdayValue = computed({
    get: () => formData.birthday || defaultBirthday.value,
    set: (value: string) => {
      formData.birthday = value
    },
  })
  const formVisible = reactive({
    birthday: false,
    address: false,
  })

  /** 地址选择器 确认 hook */
  const handleAddressConfirm: PickerProps['onConfirm'] = (val, context) => {
    const { label } = context
    addressLabel.value = label.join(' ')
    formData.address = val.join('-')
    formVisible.address = false
  }

  async function handleSubmit() {
    await formRef.value!.validate()

    try {
      // 此处 ProfileForm 可根据实际后端接口定义
      await updateProfileInfoApi<ProfileForm, ProfileForm>(formData)
      Toast({
        theme: 'success',
        message: t('pageInfo.MsaveSuccess'),
        duration: 2000,
      })
    }
    catch {
      Toast({
        theme: 'error',
        message: t('pageInfo.MsageFault'),
        duration: 2000,
      })
    }
  }

  /** 加载个人信息 */
  function loadProfileInfo() {
    // 实际类型由业务情况决定
    getProfileInfoApi<ProfileForm>('114514').then((res) => {
      Object.assign(formData, res.data)
      if (res.data.address) {
        addressLabel.value = res.data.address
      }
    }).catch(() => {})
  }

  function handlePicChange(files: UploadFile[]) {
    formData.photos = files
  }

  return {
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
  }
}
