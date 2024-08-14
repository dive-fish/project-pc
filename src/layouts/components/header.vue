<script setup lang="ts">
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const router = useRouter();
// 用户下拉菜单
const dropdownItems = [
  {
    label: "layout.header.dropdown.profile",
    command: "getting-start/kyc",
  },
  {
    label: "layout.header.dropdown.user",
    command: "user-manage",
  },
  {
    label: "layout.header.dropdown.logout",
    command: "logout",
  },
];

// 退出登录
const requestLoginOut = () => {
  useInstance(
    "user.logout",
    {},
    {
      isMsg: true,
    }
  ).finally(() => {
    userStore.clearUserInfo();
    Promise.resolve().then(() => {
      router.push("/");
    });
  });
};

const loginOut = () => {
  $message
    .showMessageBox("layout.logout.title", "layout.logout.content", {
      confirmButtonText: "layout.logout.confirm",
      showCancelButton: true,
      type: "warning",
    })
    .then(() => {
      requestLoginOut();
    });
};

function handleCommand(command) {
  if (command === "logout") {
    loginOut();
  } else {
    router.push(`/${command}`);
  }
}
</script>

<template>
  <el-header class="layout-header">
    <div class="flex items-center justify-end h-full">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="cursor-pointer outline-0 flex items-center">
          <img src="../../assets/images/avatar.png" alt="Avatar" class="mr-2 size-8 rounded-full" />
          <span class="text-xs font-medium text-default"> {{ userInfo.userName }} </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in dropdownItems" :key="index" :command="item.command">
              <x-icon v-if="item.command === 'logout'" name="logout" isSvg size="14" class="mr-2" />
              <span>
                {{ $t(item.label) }}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <x-change-lang class="!static ml-2">
        <span class="text-default outline-0 cursor-pointer">
          <x-icon name="locale" isSvg size="20px" />
        </span>
      </x-change-lang>
    </div>
  </el-header>
</template>

<style lang="scss">
.layout-header {
  --el-header-height: 70px;
}
</style>
