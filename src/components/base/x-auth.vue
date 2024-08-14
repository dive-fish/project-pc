<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
const useAuth = useAuthStore();

const authOptions = computed(() => {
  return useAuth.authOptions;
});

const props = defineProps({
  permissions: {
    type: [Array, String],
    default: () => [],
  },
});

const isShowSlot = computed(() => {
  if (!props.permissions.length) {
    return true;
  }
  if (!authOptions.value.length) {
    return false;
  }

  let isShow = false;
  if (Array.isArray(props.permissions)) {
    isShow = props.permissions.every((item) => authOptions.value.includes(item));
  } else {
    isShow = authOptions.value.includes(props.permissions);
  }
  return isShow;
});
</script>

<template>
  <slot v-if="isShowSlot" :options="authOptions"></slot>
</template>

<style lang="scss"></style>
