<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { useLocaleStore } from "@/stores/useLocaleStore";

const localeStore = useLocaleStore();

// 右键菜单刷新当前页面用
const isRefresh = ref(false);
provide("isRefresh", isRefresh);

localeStore.setLocale($i18n.global.locale);
// 设置element-plus语言
const locale = computed(() => {
  const keys = {
    "zh-cn": zhCn,
    en,
  };
  return keys[$i18n.global.locale];
});

const router = useRouter();

const dialogVisible = ref(false);
function onAuto() {
  dialogVisible.value = false;
  router.push({ name: "" });
}
</script>

<template>
  <el-config-provider :locale="locale" :zIndex="3000" :message="{ max: 5 }">
    <router-view />
  </el-config-provider>

  <el-dialog
    v-model="dialogVisible"
    class="dialog-auto card-box"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    width="420"
  >
    <div class="flex justify-center items-center mb-2">
      <x-icon name="kyc-tip" class="text-6xl" isSvg />
    </div>
    <div class="text-center">
      {{ $t("merchantInfo.content") }}
    </div>
    <div class="mt-4 flex justify-center">
      <el-button type="primary" @click="onAuto">
        {{ $t("merchantInfo.proceed") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
:root {
  --primary: #007bff;
  --success: #28a745;
  --danger: #dc3545;
  --warning: #fb8d0c;
  --color: #141922;
  --md-color: #6c757d;
  --sm-color: #525866;
  --light: #f8f9fa;
  --dark: #343a40;
  --border-color: #f0f2f5;
  --lightmuted: #b2b2b2;
  --inactive-bg: #ebedf0;
  --bg: #f8fafc;
  --el-color-primary: #006033;
  --el-color-primary-light-3: #016c3a;
  // --el-color-primary-light-5: #d3d3d3;
  --el-color-primary-light-5: #016c3a;
  --el-color-primary-light-9: #ffffff;
  --el-color-primary-dark-2: #017a44;
  --el-color-danger: #ea5b39;
  --el-color-warning: #fb8d0c;
  --el-color-warning-dark-2: #ff8d0b;
  --el-color-warning-dark-3: #fd8d09;
  --el-color-warning-light-3: #fd9a27;
  --el-border-color-light: #f0f2f5;
  --el-border-radius-small: 0;
}

body {
  font-family: Montserrat-Medium, Montserrat-Regular, PingFangSC, PingFang SC;
  .el-icon {
    color: inherit;
  }
}

#app {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 800px;
  position: relative;
  font-size: var(--el-font-size-base);
  color: var(--color);
  overflow-x: hidden;
}

#nprogress .bar {
  background: var(--el-color-primary) !important;
  height: 4px !important;
}

.card-box {
  background: #ffffff;
  box-shadow: 0 1px 12px rgba(72, 88, 101, 0.09);
  border-radius: 8px;
}

.dialog-auto {
  padding: 48px 24px;
}

.spinner {
  width: 88px;
  height: 88px;
  animation: spinner-y0fdc1 2s infinite ease;
  transform-style: preserve-3d;
}

.spinner > div {
  background-color: var(--success);
  height: 100%;
  position: absolute;
  width: 100%;
  border: 4px solid #ffff;
}

.spinner div:nth-of-type(1) {
  transform: translateZ(-44px) rotateY(180deg);
}

.spinner div:nth-of-type(2) {
  transform: rotateY(-270deg) translateX(50%);
  transform-origin: top right;
}

.spinner div:nth-of-type(3) {
  transform: rotateY(270deg) translateX(-50%);
  transform-origin: center left;
}

.spinner div:nth-of-type(4) {
  transform: rotateX(90deg) translateY(-50%);
  transform-origin: top center;
}

.spinner div:nth-of-type(5) {
  transform: rotateX(-90deg) translateY(50%);
  transform-origin: bottom center;
}

.spinner div:nth-of-type(6) {
  transform: translateZ(44px);
}

@keyframes spinner-y0fdc1 {
  0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }

  50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }

  100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
}
</style>
