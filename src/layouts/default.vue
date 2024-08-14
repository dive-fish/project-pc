<script setup>
import LayoutAside from "./components/aside.vue";
import LayoutMain from "./components/main.vue";
import LayoutHeader from "./components/header.vue";
</script>

<template>
  <el-container class="layout w-full h-full">
    <layout-aside />
    <el-container direction="vertical">
      <layout-header />
      <layout-main class="layout-main relative" />
    </el-container>
  </el-container>
</template>

<style lang="scss">
.layout {
  background: #fcfdff;
  &-main {
    @apply pt-4 pb-16 px-12;
  }
}
</style>
