export interface LoginResponse {
  id: string
  username: string
  avatar: string
  tags: { label: string, icon: string }[]
  token: string
  expires: number
}
