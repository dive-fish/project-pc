/**
 * 设置具有指定名称、值和过期天数的cookie。
 * @param {string} name - cookie的名称。
 * @param {string} value - cookie的值。
 * @param {number} time - cookie的过期时间。
 */
export function setCookie(name, value, time = 24 * 60 * 60 * 1000) {
  const expires = new Date(Date.now() + time).toUTCString();
  //  CookieStore.set(name, value, { expires });
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

/**
 * 检索具有指定名称的cookie的值, 如果过期则返回null。
 * @param {string} name - cookie的名称。
 * @returns {string|null} cookie的值，如果cookie不存在则返回null。
 */
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
  //  return CookieStore.get(name);
}

/**
 * 删除一个cookie，通过将其过期日期设置为过去的值。
 * @param {string} name - 要删除的cookie的名称。
 */
export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
  //  CookieStore.delete(name);
}
