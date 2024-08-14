<script setup>
// import LayoutMain from "./components/main.vue";
</script>

<template>
  <router-view #default="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss"></style>
