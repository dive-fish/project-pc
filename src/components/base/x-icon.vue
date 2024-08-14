<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  isSvg: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [Number, String],
    default: "1em",
  },
});

const symbolId = computed(() => `#icon-${props.name}`);

const FONTSIZE = computed(() => {
  // 如果是数字或者纯数字字符串
  if (typeof props.size === "number" || /^\d+$/.test(props.size)) {
    return `${props.size}px`;
  } else {
    return props.size;
  }
});
</script>

<template>
  <svg v-if="props.isSvg" aria-hidden="true" class="x-icon">
    <use :href="symbolId" fill="currentColor" />
  </svg>
  <el-icon v-else class="x-icon">
    <component :is="props.name"></component>
  </el-icon>
</template>

<style lang="scss">
.x-icon {
  font-size: v-bind(FONTSIZE);
  width: v-bind(FONTSIZE);
  height: v-bind(FONTSIZE);
}
</style>
