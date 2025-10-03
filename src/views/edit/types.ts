export interface FormData {
  username: string
  gender: string
  birthday: string
  address: string
  bio: string
  photos: any[]
}

export interface FormVisible {
  birthday: boolean
  address: boolean
}

export interface UploadFile {
  url?: string
  name?: string
  size?: number
  type?: string
  percent?: number
  status?: 'success' | 'fail' | 'progress' | 'waiting'
  raw?: File
}

export interface AreaList {
  label: string
  value: string
  children?: AreaList[]
}
