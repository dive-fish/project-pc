<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "50%",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadSubmit: {
    type: Boolean,
    default: false,
  },
});
const visible = defineModel("visible", { type: Boolean, default: false });

const emit = defineEmits(["handleSubmit", "handleClose"]);

function onDialogClose() {
  emit("handleClose");
  visible.value = false;
}
</script>

<template>
  <el-dialog
    v-model="visible"
    class="x-dialog"
    :title="props.title ? $t(props.title) : ''"
    :width="props.width"
    top="10vh"
    append-to-body
    :close-on-click-modal="false"
    @close="onDialogClose"
    @keyup.enter="emit('handleSubmit')"
  >
    <template v-if="$slots['header']" #header>
      <slot name="header" />
    </template>
    <div class="dialog" v-loading="loading">
      <slot name="default" />
    </div>
    <template #footer>
      <template v-if="$slots['footer']">
        <slot name="footer" />
      </template>
      <template v-else>
        <el-button auto-insert-space @click="visible.value = false"> {{ $t("texts.close") }} </el-button>
        <el-button
          type="primary"
          auto-insert-space
          native-type="submit"
          :loading="props.loadSubmit"
          @click="emit('handleSubmit')"
          @keyup.enter="emit('handleSubmit')"
        >
          {{ $t("texts.submit") }}
        </el-button>
      </template>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.x-dialog.el-dialog {
  max-height: 80vh;
  min-width: 30%;
  &__header {
    padding-bottom: var(--el-dialog-padding-primary);
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &btn {
      position: static;
      height: 16px;
      width: 16px;
    }
    &.show-close {
      padding-right: 0;
    }
  }
  &__body {
    max-height: calc(80vh - 160px);
    overflow: hidden;
    overflow-y: visible;
    padding: var(--el-dialog-padding-primary);
  }
  &__footer {
    padding: 10px 0;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
