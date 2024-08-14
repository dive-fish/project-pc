import { getCookie, setCookie, deleteCookie } from "./cookie.js";
// import { aesDecode, aesEncode } from "./aesRsaUtils.js";

// cookie过期时间 2小时
const expires = 2 * 3600 * 1000;
// const userInfoKey = "";
// const userAuthKey = "";

// 获取用户信息
export function getUserInfo() {
  const info = getCookie("info");
  // const infoAes = info ? aesDecode(info, userInfoKey) : "{}";
  return JSON.parse(info);
}

// 设置用户信息
export function setUserInfo(data = {}) {
  const info = JSON.stringify(data); // aesEncode(JSON.stringify(data), userInfoKey) + "";
  const tokenId = data.access_token; // aesEncode(data.access_token, userAuthKey);
  setCookie("info", info, expires);
  setCookie("tokenId", tokenId, expires);
}

// 获取tokenId
export function getTokenId() {
  const tokenId = getCookie("tokenId");
  return tokenId; // ? aesDecode(tokenId, userAuthKey) : "";
}

// 删除用户信息
export function clearCookieUserInfo() {
  deleteCookie("info");
  deleteCookie("tokenId");
}
