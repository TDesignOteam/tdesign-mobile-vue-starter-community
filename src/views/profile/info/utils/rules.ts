import type { FormRules, UploadFile } from 'tdesign-mobile-vue'
import type { ProfileForm } from './types'

export function rules(t): FormRules<ProfileForm> {
  return {
    username: [
      { validator: (val: any) => val !== '', message: t('pageInfo.valid.username1'), trigger: 'blur' },
      {
        pattern: /^[\u4E00-\u9FA5\w\s]+$/,
        message: t('pageInfo.valid.username2'),
        trigger: 'blur',
      },
    ],
    gender: [
      { validator: (val: any) => val !== '', message: t('pageInfo.valid.sex'), trigger: 'change' },
    ],
    birthday: [
      { validator: (val: any) => val !== '', message: t('pageInfo.valid.birthday1'), trigger: 'change' },
      {
        validator: (val: string) => {
          const birthDate = new Date(val)
          const today = new Date()
          if (birthDate.getFullYear() > today.getFullYear()) {
            return false
          }
          const age = today.getFullYear() - birthDate.getFullYear()
          return age >= 0 && age <= 150
        },
        message: t('pageInfo.valid.birthday2'),
        trigger: 'change',
      },
    ],
    address: [
      { validator: (val: any) => val !== '', message: t('pageInfo.valid.address'), trigger: 'change' },
    ],
    bio: [
      { validator: (val: any) => val !== '', message: t('pageInfo.valid.bio'), trigger: 'blur' },
    ],
    photos: [
      {
        validator: (val: UploadFile[]) => val.length <= 12,
        message: t('pageInfo.valid.photo'),
        trigger: 'change',
      },
    ],
  }
}
