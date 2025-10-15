import type { UploadFile } from 'tdesign-mobile-vue'

interface ProfileForm {
  username: string
  gender: string
  birthday: string
  address: string
  bio: string
  photos: UploadFile[]
}

export type {
  ProfileForm,
  UploadFile,
}
