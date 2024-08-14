<script setup>
const props = defineProps({
  tabs: Array,
});

const activeName = defineModel("activeName", { type: String, default: "" });
</script>

<template>
  <el-tabs v-model="activeName" class="x-tabs" v-bind="$attrs">
    <el-tab-pane v-for="item in props.tabs" :key="item.name" :label="$t(item.label)" :name="item.name"> </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss">
.el-tabs {
  --el-color-primary: var(--color);
  --el-border-color-light: #d5d8de;
  --el-text-color-primary: #696f82;
  &__item {
    padding-bottom: 16px;
  }
  &__active-bar {
    height: 4px;
  }
  &__header {
    margin-bottom: 24px;
  }
  &__nav-wrap:after {
    height: 1px;
  }
}
</style>
