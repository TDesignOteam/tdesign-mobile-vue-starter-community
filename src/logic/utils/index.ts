export function checkPhoneNumber(value: string | number) {
  return /^1[3,45789]\d{9}$/.test(`${value}`);
}

export function checkVerifyCode(value: string) {
  return /^\d{6}$/.test(value);
}
