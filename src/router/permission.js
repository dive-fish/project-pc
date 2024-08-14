import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "@/router";
import $i18n from "@/locale";
import { getTokenId } from "@/utils/cookieUser";

NProgress.configure({
  showSpinner: false,
  parent: "body",
  minimum: 0.1,
  speed: 300,
  trickleSpeed: 500,
});

// 登录时不能在跳转的名单
const pageNames = ["login", "register", "resetting"];

router.beforeEach(async (to, from) => {
  if (!to.hash) {
    // 页面进度条
    NProgress.start();
  }
  // 获取用户信息
  const tokenId = getTokenId();
  const { name, meta = {} } = to;
  const { requiresAuth = true, title } = meta;
  // 设置页面标题
  if (title) {
    document.title = `${$i18n.global.t(title)} - 网站名字`;
  }

  if (!tokenId && requiresAuth) {
    return { path: "/" };
  } else if (tokenId && pageNames.includes(name)) {
    return { path: "/home" };
  }
});

router.afterEach(() => {
  NProgress.done();
});
