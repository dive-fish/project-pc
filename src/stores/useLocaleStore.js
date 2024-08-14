import $i18n from "@/locale";
import { defineStore } from "pinia";

export const useLocaleStore = defineStore("useLocale", {
  state: () => ({}),
  actions: {
    setLocale(key, title) {
      const themeKeys = Object.keys($i18n.global.messages);
      const locale = themeKeys.includes(key) ? key : "zh-cn";

      $i18n.global.locale = locale;
      globalThis.localStorage.setItem("locale", locale);
      document.querySelector("html").setAttribute("lang", locale);
      if (title) {
        document.title = `${$i18n.global.t(title)} - Wallet`;
      }
    },
  },
});
