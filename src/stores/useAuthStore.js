import { defineStore } from "pinia";

export const useAuthStore = defineStore("useAuth", {
  state: () => ({
    options: [],
  }),
  getters: {
    getAuth: (state) => state.options,
  },
  actions: {
    setAuth(data) {
      this.options = data;
    },
    async requestAuth() {
      const res = await useInstance("getAuth", {});
      if (res.code === 200) {
        this.setAuth(res.data);
      }
    },
  },
});
