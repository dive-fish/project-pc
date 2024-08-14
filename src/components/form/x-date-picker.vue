<script setup>
const props = defineProps({
  disabledDate: {
    type: Function,
    default: (time) => time.getTime() >= Date.now() - 8.64e6,
  },
  placeholder: {
    type: String,
    default: "",
  },
});
const value = defineModel("modelValue", { type: [Array, String], default: [] });

function getDateRange(day) {
  const start = new Date();
  const end = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
  return [start, end];
}

const shortcuts = [
  {
    text: "form.lastWeek",
    value: () => getDateRange(7),
  },
  {
    text: "form.lastMonth",
    value: () => getDateRange(30),
  },
  {
    text: "form.last3Month",
    value: () => getDateRange(90),
  },
  {
    text: "form.last6Month",
    value: () => getDateRange(180),
  },
];
</script>

<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    clearable
    value-format="YYYY-MM-DD"
    format="YYYY-MM-DD"
    :start-placeholder="$t('form.startPlaceholder')"
    :end-placeholder="$t('form.endPlaceholder')"
    :disabled-date="props.disabledDate"
    :shortcuts="shortcuts"
    class="x-date-picker"
    :placeholder="props.placeholder"
    v-bind="$attrs"
  />
</template>

<style lang="scss">
.x-date-picker {
  --el-date-editor-width: 100%;
}
</style>
