import { createI18n } from "vue-i18n";
import { _transformImportedModules } from "@/utils/assembleContexts";

const contexts = import.meta.glob("./**/*.js", { eager: true });
const messages = _transformImportedModules(contexts);
const datetimeFormats = {
  short: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  time: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
  long: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
};
// 国际化
const langKeys = Object.keys(messages);
const language = globalThis.localStorage.getItem("locale") || navigator.language.toLowerCase();
const locale = langKeys.includes(language) ? language : "zh-cn";
// 设置语言缓存
globalThis.localStorage.setItem("locale", locale);
const i18n = createI18n({
  locale,
  messages,
  datetimeFormats: {
    "zh-cn": datetimeFormats,
    en: datetimeFormats,
  },
});

export default i18n;
