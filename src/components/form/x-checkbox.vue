<script setup>
const props = defineProps({
  isButton: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: "value",
  },
  labelKey: {
    type: String,
    default: "label",
  },
  isI18n: {
    type: Boolean,
    default: true,
  },
});

const value = defineModel("modelValue", { type: [String, Array, Boolean], default: "" });
</script>

<template>
  <el-checkbox-group v-model="value" class="x-checkbox" v-bind="$attrs">
    <template v-for="item in props.options" :key="item[props.valueKey]">
      <el-checkbox-button v-if="props.isButton" :value="item[props.valueKey]">
        <template v-if="$slots['default']">
          <slot name="default" :option="item" />
        </template>
        <template v-else>
          {{ props.isI18n ? $t(item[props.labelKey]) : item[props.labelKey] }}
        </template>
      </el-checkbox-button>
      <!--  -->
      <el-checkbox v-else :value="item[props.valueKey]">
        <template v-if="$slots['default']">
          <slot name="default" :option="item" />
        </template>
        <template v-else>
          {{ props.isI18n ? $t(item[props.labelKey]) : item[props.labelKey] }}
        </template>
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<style lang="scss"></style>
