<script setup>
import LayoutMain from "./components/main.vue";
</script>

<template>
  <div class="container-form bg-no-repeat h-full flex flex-col items-center p-5">
    <x-change-lang />
    <img src="" alt="logo" class="my-16 h-20" />
    <div class="container-form-shadow bg-white rounded-lg p-8 pb-10 relative">
      <layout-main />
    </div>
  </div>
</template>

<style lang="scss">
.container-form {
  background: #fcfffe url("@assets/images/container-bg.png");
  background-size: 100% 100%;
  &-shadow {
    width: 580px;
    box-shadow: 0 17px 40px 8px rgba(65, 86, 94, 0.14);
  }
}
</style>
