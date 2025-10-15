export interface UserInfo {
  id: string
  username: string
  avatar: string
  tags: { label: string, icon: string }[]
}

export interface LoginByUname {
  account: string
  password: string
}

export interface LoginByPhone {
  phone: string
  region: string
  codeId: string
  code: string
}
