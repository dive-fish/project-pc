<script setup>
import MenuIcon from "./menu-icon.vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  isIcon: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <el-menu-item :index="props.item.path" class="layout-menu-item !transition-all duration-300 mb-2 !border-b-0">
    <menu-icon v-if="props.isIcon" :item="props.item" />
    <template #title>
      <span class="text-sm pl-4 duration-0 font-medium">
        {{ $t(props.item.meta?.title) }}
      </span>
    </template>
  </el-menu-item>
</template>

<style lang="scss">
.layout-menu-item {
  --el-menu-hover-bg-color: none;
  --el-menu-base-level-padding: 24px;
  @mixin itemActive {
    background-color: var(--el-menu-active-color);
    color: white;
    border-radius: 24px;
  }
  &.active-item.is-active {
    @include itemActive;
    .layout-menu-icon {
      background-position-x: var(--active-p-x);
      background-position-y: var(--active-p-y);
    }
  }
  &:not(.is-disabled):hover {
    color: white;
  }
  &.active-item:not(.is-disabled):hover {
    @include itemActive;
  }
}
</style>
