<script setup>
import LayoutMenu from "./menu.vue";

const isCollapse = ref(false);
const menuWidth = computed(() => (isCollapse.value ? "100px" : "240px"));

function onSwitchCollapse() {
  isCollapse.value = !isCollapse.value;
}
</script>

<template>
  <el-aside class="layout-aside flex flex-col items-center px-4 py-10 pt-0 overflow-hidden">
    <div v-if="!isCollapse" class="w-full h-36 flex">
      <img src="" alt="logo" class="h-10 m-auto" />
    </div>
    <div class="flex-1 w-full min-h-0 pb-20">
      <el-scrollbar>
        <layout-menu :is-collapse="isCollapse" />
      </el-scrollbar>
    </div>
    <div
      class="layout-aside-bottom flex justify-center items-center text-[#d1ebdf] text-3xl cursor-pointer"
      @click="onSwitchCollapse"
    >
      <x-icon v-show="isCollapse" name="Expand" />
      <x-icon v-show="!isCollapse" name="Fold" />
      <span v-show="!isCollapse" class="ml-2 text-sm transition-all duration-500">
        {{ $t("layout.aside.fold") }}
      </span>
    </div>
  </el-aside>
</template>

<style lang="scss">
.layout-aside {
  width: v-bind(menuWidth);
  background-color: #061613;
  transition: all 0.3s;
}
</style>
