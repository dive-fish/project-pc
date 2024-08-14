<script setup>
const isRefresh = inject("isRefresh");
</script>

<template>
  <el-main class="main widows-max w-full">
    <router-view #default="{ Component }">
      <!-- <keep-alive> -->
      <component v-if="!isRefresh" :is="Component" :key="$route.name" />
      <!-- </keep-alive> -->
    </router-view>
  </el-main>
</template>

<style lang="scss">
.main {
  --el-main-padding: 0;
}
</style>
