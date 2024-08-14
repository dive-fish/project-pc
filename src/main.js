import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./router/permission";
import { createPinia } from "pinia";
import i18n from "./locale";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// svg
import "virtual:svg-icons-register";

// tailwind
import "@/assets/css/tailwind.scss";

const pinia = createPinia();

const app = createApp(App);

function install(element) {
  Object.keys(element).forEach((key) => app.component(key, element[key]));
}

install(ElementPlusIconsVue);

app.use(router);
app.use(pinia);
app.use(i18n);
app.mount("#app");
