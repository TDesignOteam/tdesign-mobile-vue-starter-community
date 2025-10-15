/**
 * 过滤字符串中的非数字字符
 * @param input - 需要过滤的字符串
 * @returns 只包含数字字符的新字符串
 */
export function filterNonDigits(input: string): string {
  // 使用正则匹配所有数字字符
  return input.replace(/\D+/g, '')
}

/**
 * 过滤字符串中的空白字符（空格、制表符、换行等）
 * @param input - 需要过滤的字符串
 * @returns 去掉所有空白字符的新字符串
 */
export function removeWhitespace(input: string): string {
  // 使用正则匹配所有空白字符 \s
  return input.replace(/\s+/g, '')
}
