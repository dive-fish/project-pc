import axios from "axios";
import apis from "@apis";
import $i18n from "@/locale";
import $message from "@/utils/message";
import { clearCookieUserInfo, getUserInfo } from "@/utils/cookieUser";

function getMsg(data) {
  const lang = $i18n.global.locale;
  const messages = $i18n.global.messages[lang];
  const translate = {
    "zh-cn": "msg",
    en: "msgEn",
  };
  const key = translate[lang] || "msg";
  return data[key] || messages.network[data] || data;
}

function openNotification(data = {}, config = {}) {
  $message.showNotification("", getMsg(data), { isMsgI18n: false, isTitleI18n: false });
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60 * 1000,
  validateStatus: (status) => status >= 200 && status <= 500,
  headers: {
    "Content-Type": "application/json", // "application/x-www-form-urlencoded",
  },
});
instance.defaults.headers.get["Content-Type"] = "application/json";

// 请求拦截器
const languageKeys = {
  "zh-cn": "zh_CN",
  en: "en_US",
};
instance.interceptors.request.use(
  (config) => {
    const userInfo = getUserInfo() || {};
    config.headers.Authorization = userInfo.access_token ? `Bearer ${userInfo.access_token}` : "";
    config.headers.Clientid = userInfo.client_id || "f72e42d34fa21d8abdf3852225435d05";
    config.headers["content-language"] = languageKeys[$i18n.global.locale] || "zh_CN";
    // 如果get请求把参数拼接到url上
    if (["get", "GET"].includes(config.method) && config.data) {
      config.url = `${config.url}?${new URLSearchParams(config.data)}`;
      config.data = {};
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data = {}, statusText } = response;
    if (data.code !== 200) {
      openNotification(data.msg || statusText);
      if (data.code === 401) {
        clearCookieUserInfo();
        globalThis.location.reload();
      }
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  },
  (error) => {
    openNotification(error.message || error);
    return Promise.reject(error);
  }
);

function getApiUrl(name) {
  // 如果带了http或者https就直接返回
  if (/^http(s)?:\/\//.test(name)) return name;
  const nameArr = name.split(".");
  let url = null;
  for (const item of nameArr) {
    url = url ? url[item] : apis[item];
  }
  return url;
}

const msgI18nConfig = { isMsgI18n: false, isTitleI18n: false };

export function useInstance(name, data = {}, config = {}) {
  let url = getApiUrl(name);
  if (url) {
    const { isBell, isMsg, query = [] } = config;

    if (query.length) {
      url = `${url}/${query.join("/")}`;
    }

    return new Promise((resolve) => {
      instance({
        method: "POST",
        url,
        data,
        ...config,
      })
        .then((res) => {
          if (isBell) {
            openNotification(res.msg, config.bellConfig || msgI18nConfig);
          } else if (isMsg) {
            $message.showMessage(res.msg, config.bellConfig || msgI18nConfig);
          }
          resolve(res);
        })
        .catch((err) => resolve(err));
    });
  } else {
    throw new Error(`${name}接口格式错误或未定义！`);
  }
}
