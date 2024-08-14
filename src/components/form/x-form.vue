<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<!-- eslint-disable-next-line vue/no-deprecated-v-on-native-modifier -->
<script setup>
const props = defineProps({
  formItems: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => {},
  },
  labelWidth: {
    type: [String, Number],
    default: 120,
  },
  scrollToError: {
    type: Boolean,
    default: true,
  },
  gutter: {
    type: Number,
    default: 0,
  },
  span: {
    type: Number,
    default: 24,
  },
});

const formData = defineModel("formData", { type: Object, default: () => ({}), required: true });

function isFn(fn) {
  return Object.prototype.toString.call(fn) === "[object Function]";
}

// form-item是否显示
function isShow({ isShow }) {
  return isFn(isShow) ? isShow({ ...formData.value }) : isShow ?? true;
}

// 动态options
function getActiveOpts({ onFilter, options = [] }) {
  return isFn(onFilter) ? onFilter({ ...formData.value }) ?? [] : options;
}

// 自定义提示占用error位置，不影响error
function getItemTip(tip) {
  return isFn(tip) ? tip({ ...formData.value }) : tip;
}

const formRef = ref();
//  向外部暴露
defineExpose({
  formRef,
});
</script>

<template>
  <el-form
    ref="formRef"
    class="x-form"
    :model="formData"
    :rules="props.rules"
    :label-width="props.labelWidth"
    :scroll-to-error="props.scrollToError"
    :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
    @submit.prevent
    v-bind="$attrs"
  >
    <el-row :gutter="props.gutter">
      <template v-for="(item, index) in props.formItems" :key="index">
        <el-col v-if="isShow(item)" :span="item.span ?? props.span">
          <el-form-item v-bind="item" :label="item.label ? $t(item.label) : ''">
            <!-- label -->
            <template v-if="$slots[`item-${item.prop}-label`]" #label>
              <slot :name="`item-${item.prop}-label`" :item="item" :form="formData" />
            </template>
            <!--  -->
            <template v-if="item.type === 'slot'">
              <slot :name="`item-${item.prop}`" :item="item" :form="formData" />
            </template>
            <template v-else-if="item.type === 'select'">
              <x-select v-model="formData[item.prop]" v-bind="item.attrs || {}" :options="getActiveOpts(item)" />
            </template>
            <template v-else-if="item.type === 'checkbox'">
              <x-checkbox v-model="formData[item.prop]" v-bind="item.attrs || {}" :options="getActiveOpts(item)" />
            </template>
            <template v-else-if="item.type === 'radio'">
              <x-radio v-model="formData[item.prop]" v-bind="item.attrs || {}" :options="getActiveOpts(item)" />
            </template>
            <template v-else>
              <component
                :is="item.type"
                v-model="formData[item.prop]"
                v-bind="item.attrs || {}"
                :placeholder="item.attrs?.placeholder ? $t(item.attrs?.placeholder) : ''"
              />
            </template>
            <div v-if="item.tip && item.tip.length" class="el-form-tip el-form-item__error">
              {{ getItemTip(item.tip) }}
            </div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style lang="scss">
.el-form {
  font-family: Montserrat-Regular;
  &-item {
    --border-shadow-color-inset: var(--el-color-primary);
    --border-shadow-color: rgba(0, 96, 51, 0.41);
    @mixin inputBorderStyle() {
      box-shadow: inset 0 0 0 1px var(--border-shadow-color-inset), 0 0 8px var(--border-shadow-color);
    }
    @mixin inputStyle($isShow: false) {
      $triggerItems: ":hover", ":focus", ".is-focus", ".is-focus:hover";
      // $selectors: ".el-input__wrapper", ".el-select__wrapper", ".el-textarea__inner";
      //循环$selectors
      // @each $selector in $selectors {
      .el-input__wrapper,
      .el-select__wrapper,
      .el-textarea__inner {
        // 判断是否需要在最外层加上inputBorderStyle
        @if $isShow {
          @include inputBorderStyle;
        }
        @each $triggerItem in $triggerItems {
          &#{$triggerItem} {
            @include inputBorderStyle;
          }
        }
      }
      // }
    }
    @include inputStyle(false);
    .el-input__inner {
      --el-input-text-color: var(--color);
    }
    &.is-error {
      --border-shadow-color-inset: #e7522e;
      --border-shadow-color: rgba(234, 91, 57, 0.41);
      @include inputStyle(true);
      .el-form-tip {
        display: none !important;
      }
    }
  }
  &-tip {
    color: var(--el-color-info-light-3);
  }
}
</style>
