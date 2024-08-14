<template>
  <el-popconfirm
    placement="top"
    icon="Warning"
    :title="$t('texts.deleteTip')"
    icon-color="red"
    v-bind="props.popconfirm"
    @confirm="onConfirm"
  >
    <template #reference>
      <el-button v-if="props.isDefault" class="x-delete-btn" :loading="props.loading" v-bind="props.button">
        {{ $t(props.text) }}
      </el-button>
      <slot v-else />
    </template>
  </el-popconfirm>
</template>

<script setup>
const props = defineProps({
  popconfirm: {
    type: Object,
    default: () => ({}),
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
  button: {
    type: Object,
    default: () => ({
      link: true,
      icon: "Delete",
      type: "danger",
    }),
  },
  text: {
    type: String,
    default: "texts.delete",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["confirm"]);
function onConfirm() {
  emit("confirm");
}
</script>

<style lang="scss">
.x-delete {
  &-btn {
    --el-button-text-color: var(--el-color-danger);
  }
}
</style>
