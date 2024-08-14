<script setup>
import { useLocaleStore } from "@/stores/useLocaleStore";
const store = useLocaleStore();

const dropdownItems = [
  {
    label: "简体中文",
    command: "zh-cn",
  },
  {
    label: "English",
    command: "en",
  },
];

const route = useRoute();
function onChangeLanguage(command) {
  store.setLocale(command, route.meta.title);
}
</script>

<template>
  <div class="fixed top-5 right-5">
    <el-dropdown trigger="click" @command="onChangeLanguage">
      <template v-if="$slots['default']">
        <slot />
      </template>
      <el-button v-else circle size="large">
        <x-icon name="locale" isSvg size="16px" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in dropdownItems" :key="index" :command="item.command">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss"></style>
