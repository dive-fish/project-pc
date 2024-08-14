<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "rules.pleaseSelect",
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionKey: {
    type: String,
    default: "options",
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

const value = defineModel("modelValue", { type: [String, Number], default: "" });
</script>

<template>
  <el-select v-model="value" class="x-select w-full" v-bind="$attrs" :placeholder="$t(props.placeholder)">
    <template v-for="name in Object.keys($slots)" #[name]>
      <template v-if="name !== 'default'">
        <slot :name="name" />
      </template>
    </template>
    <!--  -->
    <template v-for="(option, gi) in props.options" :key="gi">
      <el-option-group
        v-if="option[props.optionKey]?.length"
        :label="props.isI18n ? $t(option[props.labelKey]) : option[props.labelKey]"
        v-bind="option.attrs || {}"
      >
        <el-option
          v-for="group in option[props.optionKey]"
          :key="group[props.valueKey]"
          :value="group[props.valueKey]"
          v-bind="group"
          :label="props.isI18n ? $t(group[props.labelKey]) : group[props.labelKey]"
        >
          <slot name="group-option" :option="group" />
        </el-option>
      </el-option-group>
      <!--  -->
      <el-option
        v-else
        :value="option[props.valueKey]"
        v-bind="option"
        :label="props.isI18n ? $t(option[props.labelKey]) : option[props.labelKey]"
      >
        <slot name="option" :option="option" />
      </el-option>
    </template>
  </el-select>
</template>

<style lang="scss"></style>
