import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/notification/style/css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import $i18n from "@/locale";

// 默认配置
const defaultConfig = {
  isTitleI18n: true,
  isMsgI18n: true,
};

/**
 * 返回i18n字符串
 * @param { String | Object } format 字符串或者配置对象
 * @param { Boolean } isI18n 是否需要国际化
 */
function getI18nStr(format, isI18n = true) {
  let str = format;
  let params = {};
  if (typeof format === "object") {
    str = format.test;
    params = format.params || {};
    isI18n = format.isI18n ?? true;
  }
  return isI18n && str.length ? $i18n.global.t(str, params) : str;
}

export default {
  showNotification(title, message, config = defaultConfig) {
    ElNotification({
      title: getI18nStr(title, config.isTitleI18n),
      message: getI18nStr(message, config.isMsgI18n),
      type: "error",
      duration: 5000,
      showClose: true,
      ...config,
    });
  },
  showMessage(message, config = defaultConfig) {
    ElMessage({
      message: getI18nStr(message, config.isMsgI18n),
      type: "success",
      duration: 3000,
      ...config,
    });
  },
  showMessageBox(title, message, config = defaultConfig) {
    return ElMessageBox({
      title: getI18nStr(title, config.isTitleI18n),
      message: getI18nStr(message, config.isMsgI18n),
      appendTo: "body",
      showCancelButton: true,
      ...config,
      confirmButtonText: getI18nStr(config.confirmButtonText || "texts.confirm", true),
      cancelButtonText: getI18nStr(config.cancelButtonText || "texts.cancel", true),
    });
  },
};
