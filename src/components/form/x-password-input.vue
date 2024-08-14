<script setup>
import { useQRCode } from "@vueuse/integrations/useQRCode";

const emit = defineEmits(["handlePasswordInput"]);

const inputRefs = ref();

const show = ref(false);
function open() {
  // #app 添加filter
  document.querySelector("#app").style.filter = "blur(70px)";
  password.value = ["", "", "", "", "", ""];
  show.value = true;
  nextTick(() => {
    inputRefs.value[0].focus();
  });
}

function close() {
  // #app 移除filter
  document.querySelector("#app").style.filter = "none";
  password.value = ["", "", "", "", "", ""];
  show.value = false;
}

const password = ref(["", "", "", "", "", ""]);
watchEffect(() => {
  const value = password.value.join("");
  if (value.length === 6) {
    emit("handlePasswordInput", password.value.join(""));
    close();
  }
});

const parseInput = (value) => {
  return value.replace(/[^\d]/g, "");
};

const onInput = (index, value) => {
  if (value) {
    if (index < 5) {
      inputRefs.value[index + 1].focus();
    }
  }
};

const onKeyDown = (index) => {
  if (!password.value[index] && index > 0) {
    password.value[index - 1] = "";
    inputRefs.value[index - 1].focus();
  }
};

const androidQrcode = useQRCode(
  "https://play.google.com/store/apps/details?id=com.azure.authenticator&referrer=  adjust_reftag%3Dc6f1p4ErudH2C%26utm_source%3DLanding%2BPage%2BOrganic%2B-%2Bapp%2Bstore%2Bbadges%26utm_campaign%3Dappstore_android"
);
const iosQrcode = useQRCode("https://apps.apple.com/app/microsoft-authenticator/id983156458");

defineExpose({
  open,
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="x-password-input fixed inset-0 w-screen h-screen z-50 flex flex-col justify-center items-center"
      @keyup.esc.prevent="close"
    >
      <!-- <div class="x-password-input-icon" /> -->
      <img src="@assets/images/authenticator.png" class="size-20" />
      <div class="text-base font-medium mb-2 mt-5">
        {{ $t("components.passwordInput.title") }}
      </div>
      <div class="text-sm text-info2 mb-8">
        {{ $t("components.passwordInput.desc") }}
      </div>
      <div class="x-password-input-wrap h-36 mx-auto grid grid-cols-6 items-center justify-items-center">
        <div v-for="(digit, index) in password" :key="index">
          <el-input
            v-model="password[index]"
            ref="inputRefs"
            class="x-password-input-wrap__input"
            size="large"
            maxlength="1"
            type="text"
            inputmode="numeric"
            :parser="parseInput"
            :formatter="parseInput"
            @input="onInput(index, $event)"
            @keyup.delete="onKeyDown(index)"
          ></el-input>
        </div>
      </div>
      <div class="text-primary mb-6">
        {{ $t("components.passwordInput.downTip") }}
      </div>
      <div class="pb-[16%]">
        <el-tooltip effect="light" placement="bottom">
          <el-button type="primary">
            <x-icon name="ios" class="size-4 mr-2" isSvg />
            IOS
          </el-button>
          <template #content>
            <img :src="iosQrcode" class="size-56" />
          </template>
        </el-tooltip>
        <!--  -->
        <el-tooltip effect="light" placement="bottom">
          <el-button type="primary">
            <x-icon name="android" class="size-4 mr-2" isSvg />
            Android
          </el-button>
          <template #content>
            <img :src="androidQrcode" class="size-56" />
          </template>
        </el-tooltip>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.x-password-input {
  animation: side-in-bottom 0.3s linear;

  &-wrap {
    width: 500px;
    &__input {
      --el-component-size-large: 48px;
      --el-input-width: 48px;
      font-size: 24px;
      .el-input__inner {
        text-align: center;
      }
    }
  }
  .el-button {
    width: 125px;
    height: 48px;
    line-height: 48px;
  }
  @keyframes side-in-bottom {
    from {
      bottom: -100vh;
    }
    to {
      bottom: 0;
    }
  }
}
</style>
