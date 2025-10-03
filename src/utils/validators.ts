import { REGEXP } from '@/config/constants'

/**
 * 验证手机号
 */
export function validatePhone(phone: string): boolean {
  return REGEXP.PHONE.test(phone)
}

/**
 * 验证验证码
 */
export function validateCode(code: string, length: number = 6): boolean {
  const codeRegex = new RegExp(`^\\d{${length}}$`)
  return codeRegex.test(code)
}

/**
 * 清理手机号输入（只保留数字）
 */
export function cleanPhoneNumber(value: string): string {
  return value.replace(/\D/g, '')
}
