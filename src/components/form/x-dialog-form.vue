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
  formItems: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => {},
  },
  formAttrs: {
    type: Object,
    default: () => {},
  },
});

const formData = defineModel("formData", { type: Object, default: () => ({}), required: true });

const emit = defineEmits(["handleSubmit", "handleClose"]);

const dialogVisible = ref(false);
function open() {
  dialogVisible.value = true;
}

function close() {
  emit("handleClose");
  dialogVisible.value = false;
}

const formDialog = ref();
async function validate() {
  return await formDialog.value.formRef.validate();
}

async function handleSubmit() {
  const state = await validate();
  if (state) {
    emit("handleSubmit", { ...formData.value });
  }
}

defineExpose({
  open,
  close,
  formDialog,
  validate,
});
</script>

<template>
  <x-dialog
    v-model:visible="dialogVisible"
    :width="props.width"
    :title="props.title"
    :loadSubmit="props.loadSubmit"
    :loading="props.loading"
    @handleClose="close"
    @handleSubmit="handleSubmit"
  >
    <x-form
      ref="formDialog"
      v-model:formData="formData"
      :formItems="props.formItems"
      :rules="props.rules"
      v-bind="props.formAttrs"
    >
      <template v-for="name in Object.keys($slots)" #[name]="{ item, form }">
        <slot :name="name" :item="item" :form="form" />
      </template>
    </x-form>
    <!--  -->
    <template v-if="$slots['footer']" #footer>
      <slot name="footer" :data="formData" />
    </template>
  </x-dialog>
</template>

<style lang="scss"></style>
