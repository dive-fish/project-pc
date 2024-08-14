/**
 * __开头代表有点特殊，是自定义的规则，需要自己手写fn
 * is开头代表是常用的规则，直接使用
 * is的生成规则是：去除is，用rule拼接剩余部分作为key
 */

/**
 * @description: 验证是否是邮箱
 * @param { String } url
 * @returns { Boolean }
 */
export function isEmail(url) {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(url);
}

/**
 * @description: 验证是否是+86手机号
 * @param { String } phone
 * @returns { Boolean }
 */
export function isCnPhone(phone) {
  return /^1[0-9]{10}$/.test(phone);
}
/**
 * @description: 验证密码为{min}-{max}位不允许中文，可以有特殊字符
 * @param { String } phone
 * @returns { Boolean }
 */
export function __isPassword1(password, min = 6, max = 20) {
  return new RegExp(`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{${min},${max}}$`).test(password);
}

/**
 * @description: 验证是否是url
 * @param { Boolean } url
 * @returns  { Boolean }
 */
export function isUrl(url) {
  return /^((https|http)?:\/\/)[^\s]+/.test(url);
}

/**
 * @description: 验证是否是英文
 * @param { String } str
 * @returns { Boolean }
 */
export function isEn(str) {
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * @description: 验证是否是数字
 * @param { number | string } num
 * @returns { Boolean }
 */
export function isNumber(num) {
  num = typeof num === "string" ? Number(num.trim()) : num;
  return Number.isFinite(num) && num > 0;
}

/**
 * @description: 验证是否是英文和数字
 * @param { String } str
 * @returns { Boolean }
 */
export function isEnAndNumber(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * @description: 验证是否是中国身份证号
 * @param { String } id
 * @returns { Boolean }
 */
// export function isCnID(id) {
//   return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id);
// }

/**
 * @description: 验证是否是中文
 * @param { String } str
 * @returns { Boolean }
 */
// export function isZH(str) {
//   return /^[\u4e00-\u9fa5]+$/.test(str);
// }

/**
 * @description: 验证是否是中文和英文
 * @param { String } str
 * @returns { Boolean }
 */
// export function isZhAndEN(str) {
//   return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(str);
// }
