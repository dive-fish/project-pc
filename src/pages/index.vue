<route lang="yaml">
{ name: "login", alias: "login", meta: { layout: "container-form", requiresAuth: false, title: "login.signIn" } }
</route>

<script setup>
import ruleFn from "@/rules/index";
import { useSubmit } from "@/utils/useSubmit";
import { useUserStore } from "@/stores/useUserStore";

defineOptions({
  name: "login",
});

const userStore = useUserStore();
const router = useRouter();

const formRef = ref();
const formData = reactive({
  username: "",
  password: "",
});

const formItems = [
  {
    type: ElInput,
    prop: "username",
    label: "form.email",
    attrs: {
      autofocus: true,
      clearable: true,
      placeholder: "form.emailPlaceholder",
    },
  },
  {
    type: ElInput,
    prop: "password",
    label: "form.password",
    for: "password",
    attrs: {
      type: "password",
      maxlength: 20,
      clearable: true,
      showPassword: true,
      placeholder: "form.passwordPlaceholder",
    },
  },
  {
    type: "slot",
    prop: "btn",
    label: "",
    class: "login-btn",
  },
];

const rules = {
  username: [ruleFn.ruleRequired("form.emailPlaceholder"), ruleFn.ruleEmail()],
  password: [ruleFn.ruleRequired("form.passwordPlaceholder"), ruleFn.rulePassword1()],
};

const { runAsync: getUserInfo, loading: loadUser } = useRequest(userStore.requestInfo, {
  loadingKeep: 1000,
  manual: true,
  onError() {
    userStore.clearUserInfo();
    router.push({ name: "login" });
  },
  onSuccess: ({ code, data }) => {
    if (code === 200) {
      userStore.setUserInfo(data.user);
      formRef.value.formRef.resetFields();
      router.push({ name: data.merchantStatus === null ? "getting-start" : "home" });
    }
  },
});

const requestParams = {
  name: "user.login",
  config: {
    isMsg: true,
  },
};
const { loading, onFun } = useSubmit(requestParams, formRef, {
  onSuccess: ({ code, data }) => {
    if (code === 200) {
      userStore.init(data);
      getUserInfo();
    }
  },
});

function onSubmit(googleCode) {
  onFun({
    ...formData,
    rememberMe: true,
    clientId: "f72e42d34fa21d8abdf3852225435d05",
    grantType: "password",
    googleCode,
  });
}
const passwordRef = ref();
function onShowPasswordInput() {
  formRef.value?.formRef.validate((valid) => {
    if (valid) {
      passwordRef.value.open();
    }
  });
}
</script>

<template>
  <x-form
    ref="formRef"
    v-model:formData="formData"
    :formItems="formItems"
    :rules="rules"
    size="large"
    label-position="top"
    hide-required-asterisk
    class="login overflow-hidden"
  >
    <template #item-password-label="{ item }">
      <div class="flex items-center justify-between">
        <span>
          {{ $t(item.label) }}
        </span>
        <router-link to="/resetting" custom v-slot="{ navigate }">
          <el-button type="primary" class="-mr-3" link @click="navigate">
            {{ $t("login.forgot") }}
          </el-button>
        </router-link>
      </div>
    </template>
    <template #item-btn>
      <el-button
        type="primary"
        class="w-full"
        auto-insert-space
        native-type="submit"
        :loading="loading || loadUser"
        @click="onShowPasswordInput"
      >
        {{ $t("login.submit") }}
      </el-button>
    </template>
  </x-form>
  <div class="flex items-center absolute left-0 -bottom-11 pl-8">
    {{ $t("login.noAccount") }}
    <router-link to="/register" custom v-slot="{ navigate }">
      <el-button type="primary" link @click="navigate">
        {{ $t("login.register") }}
      </el-button>
    </router-link>
  </div>
  <x-password-input ref="passwordRef" @handlePasswordInput="onSubmit" />
</template>

<style scoped lang="scss">
.login {
  &:deep(.el-form-item) {
    margin-bottom: 40px;
    &.login-btn {
      margin-bottom: 0;
    }
  }
}
</style>
