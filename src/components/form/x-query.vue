<script setup>
const props = defineProps({
  formItems: {
    type: Array,
    default: () => [],
  },
  gutter: {
    type: Number,
    default: 20,
  },
  span: {
    type: Number,
    default: 4,
  },
});

const emit = defineEmits(["handleQuery"]);

const formData = defineModel("formData", { type: Object, default: () => ({}) });

watch(
  formData,
  (cur, pre) => {
    if (Object.keys(pre).length > 0) {
      emit("handleQuery", cur);
    }
  },
  { deep: true }
);
</script>

<template>
  <x-form
    ref="formRef"
    v-model:formData="formData"
    :formItems="props.formItems"
    :gutter="props.gutter"
    :span="props.span"
    inline
    class="x-query w-full"
    v-bind="$attrs"
  >
    <template v-for="name in Object.keys($slots)" #[name]="{ item, form }">
      <slot :name="name" :item="item" :form="form" />
    </template>
  </x-form>
</template>

<style lang="scss">
.x-query {
  .el-form-item {
    width: 100%;
  }
}
</style>
