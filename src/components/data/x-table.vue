<script setup>
import XDelete from "../feedback/x-delete.vue";

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  tableColumn: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showOverflowTooltip: {
    type: Boolean,
    default: true,
  },
  isPagination: {
    type: Boolean,
    default: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  pagination: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  "handleView",
  "handleEdit",
  "handleDelete",
  "update:page-size",
  "handleSizeChange",
  "update:current-page",
  "handleCurrentChange",
]);

// 分页默认参数
const defaultPagination = {
  pagerCount: 7,
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: [10, 20, 30, 40, 50],
  background: true,
  //   hideOnSinglePage: true,
  ...props.pagination,
};

// 分页事件
const pageSize = ref(props.pageSize);
function handleSizeChange() {
  emit("update:page-size", pageSize);
  emit("handleSizeChange", pageSize);
}

// 当前页事件
const currentPage = ref(props.currentPage);
function handleCurrentChange() {
  emit("update:current-page", currentPage);
  emit("handleCurrentChange", currentPage);
}

// 基础自定义按钮，prop为唯一值
const baseModule = [
  {
    // 定义使用什么组件,可自定义
    is: ElButton,
    // 文本
    slot: "texts.view",
    // 组件参数
    attrs: { link: true, type: "primary", icon: "View", load: "viewLoad" },
    // 绑定事件容器
    listeners: {
      click: (scope, item) => {
        emit("handleView", scope, item);
      },
    },
    // 唯一值
    prop: "view",
  },
  {
    is: ElButton,
    slot: "texts.edit",
    attrs: { link: true, type: "primary", icon: "EditPen", load: "editLoad" },
    listeners: {
      click: (scope, item) => {
        emit("handleEdit", scope, item);
      },
    },
    prop: "edit",
  },
  {
    is: XDelete,
    attrs: { load: "delLoad" },
    listeners: {
      confirm: (scope, item) => {
        emit("handleDelete", scope, item);
      },
    },
    prop: "delete",
  },
];

// 判断是否自定义按钮/组件
function getComponents(components = []) {
  const data = [];
  for (const item of components.values()) {
    const prop = item.prop ?? item;
    const component = baseModule.find((i) => i.prop === prop);
    const isObj = Object.prototype.toString.call(item) === "[object Object]";
    if (component) {
      if (isObj) {
        data.push({ ...component, ...item });
      } else {
        data.push(component);
      }
    } else if (isObj && item.is) {
      data.push(item);
    }
  }
  return data;
}

// 绑定自定义事件
function handlelisteners(item, scope) {
  const listeners = {};
  for (const key in item.listeners) {
    listeners[key] = () => item.listeners[key](scope, item);
  }
  return listeners;
}

// 定义按钮load状态key
function getLoadKey(attrs) {
  return attrs?.load || "load";
}
</script>

<template>
  <div class="flex-1 table-box">
    <el-table :data="props.tableData" height="100%" width="100%" v-loading="loading" v-bind="$attrs">
      <template v-for="(item, index) in props.tableColumn" :key="index">
        <el-table-column :showOverflowTooltip="props.showOverflowTooltip" v-bind="item" :label="$t(item.label)">
          <template v-if="$slots[`col-${item.prop}-header`]" #header="scope">
            <slot :name="`col-${item.prop}-header`" v-bind="scope" />
          </template>
          <!--  -->
          <template v-if="$slots[`col-${item.prop}`]" #default="scope">
            <slot :name="`col-${item.prop}`" v-bind="scope" />
          </template>
          <template v-else-if="item.components" #default="scope">
            <template v-for="(component, i) in getComponents(item.components)" :key="i">
              <component
                :is="component.is"
                v-bind="component.attrs"
                :loading="scope.row[getLoadKey(component.attrs)]"
                v-on="handlelisteners(component, scope)"
              >
                {{ component.slot }}
              </component>
              <el-divider v-if="i < item.components.length - 1" direction="vertical" />
            </template>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <x-empty />
      </template>
    </el-table>
  </div>
  <!--  -->
  <div class="py-5">
    <el-pagination
      class="pagination"
      v-if="props.isPagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="props.total"
      v-bind="defaultPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss">
.table-box {
  min-height: 0;
  min-width: 0;
  .el-table {
    --el-table-header-bg-color: #f9fafc;
    --el-table-header-text-color: #696f82;
    &__body-wrapper {
    }
  }
}
</style>
