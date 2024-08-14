<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});
</script>

<template>
  <div
    v-if="props.item.meta?.icon?.show"
    class="layout-menu-icon size-12 -mr-3"
    :style="props.item.meta?.icon?.style"
  ></div>
</template>

<style lang="scss">
.layout-menu-icon {
  background-image: url("@assets/images/menu-icon.png");
  background-position-x: var(--p-x);
  background-position-y: var(--p-y);
  transform: scale(0.5);
}
</style>
