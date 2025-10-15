import type { UploadFile, UploadProps } from 'tdesign-mobile-vue'

interface TagItem {
  id: string
  label: string
}

interface FormData {
  content: string
  files: UploadFile[]
  tags: TagItem['id'][]
  location: string
}

export type {
  FormData,
  TagItem,
  UploadFile,
  UploadProps,
}
