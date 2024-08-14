import { defineStore } from "pinia";
import { setUserInfo, clearCookieUserInfo } from "@/utils/cookieUser";

export const useUserStore = defineStore("useUser", {
  state: () => ({ userInfo: {} }),
  getters: {
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    init(data) {
      setUserInfo(data);
    },
    setUserInfo(data) {
      this.userInfo = data;
    },
    clearUserInfo() {
      this.userInfo = {};
      clearCookieUserInfo();
    },
    async requestInfo() {
      const res = await useInstance(
        "user.getInfo",
        {},
        {
          method: "GET",
        }
      );
      if (res.code === 200) {
        this.setUserInfo(res.data.user);
      } else {
        this.clearUserInfo();
      }
      return res;
    },
  },
});
