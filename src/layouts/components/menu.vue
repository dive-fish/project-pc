<script setup>
import MenuItem from "./menu-item.vue";
import MenuIcon from "./menu-icon.vue";
import generatedRoutes from "virtual:generated-pages";

const props = defineProps({
  isCollapse: Boolean,
});

const route = useRoute();
const active = computed(() => route.meta.activeMenu ?? route.path);

// 排序路由
function sortRoutes(arr) {
  return arr.sort((a, b) => a.meta.order - b.meta.order);
}

/**
 * 组装基础路由
 * @returns {Array}
 */
function getBaseRoutes() {
  const routes = [];
  const routerMap = new Map();
  generatedRoutes.forEach((item) => {
    const { name } = item;
    routerMap.set(name, {
      ...item,
      children: [item],
    });
  });
  generatedRoutes.forEach((item) => {
    const { meta = {}, name } = item;
    const { pid } = meta;
    if (pid) {
      const parent = routerMap.get(pid);
      if (parent) {
        parent.children.push(item);
      }
    } else {
      routes.push(routerMap.get(name));
    }
  });
  return routes;
}

/**
 * 过滤路由
 * 过滤掉isAside为false的路由
 * 剔除children里name与父级name相同的路由
 */
function filterRoutes() {
  const routes = getBaseRoutes();
  const list = routes.filter((item) => {
    const { isAside } = item.meta || {};
    let children = item.children?.filter((i) => i.meta?.isAside);
    if (children.length <= 1) {
      children = children.filter((i) => i.path !== item.path);
    }
    item.children = sortRoutes(children);
    return isAside;
  });
  return sortRoutes(list);
}

const asideRoutes = filterRoutes();
</script>

<template>
  <el-menu
    class="layout-menu"
    :collapse="props.isCollapse"
    :default-active="active"
    router
    unique-opened
    mode="vertical"
  >
    <template v-if="asideRoutes.length">
      <template v-for="(item, index) in asideRoutes" :key="index">
        <!--  -->
        <el-sub-menu v-if="item.children.length" :index="item.path">
          <template #title>
            <menu-icon :item="item" />
            <span class="text-sm pl-4 duration-0 font-medium">
              {{ $t(item.meta.menuTitle || item.meta.title) }}
            </span>
          </template>
          <menu-item v-for="(children, ci) in item.children" :key="ci" :isIcon="false" :item="children" />
        </el-sub-menu>
        <!--  -->
        <menu-item v-else :item="item" class="active-item" />
      </template>
    </template>
  </el-menu>
</template>

<style lang="scss">
.layout-menu {
  border: none !important;
  --el-menu-item-font-size: 14px;
  --el-menu-vertical-height: 56px;
  --el-menu-text-color: #a3c3b4;
  --el-menu-bg-color: #061613;
  &.el-menu--collapse {
    // --el-menu-base-level-padding: 0px;
    .el-menu-tooltip__trigger {
      padding: 0;
      justify-content: center;
      align-items: center;
    }
    .layout-menu-icon {
      margin-right: 0;
    }
    .el-sub-menu {
      .layout-menu-icon {
        margin-left: -15px;
        min-width: 48px;
      }
    }
  }
  .el-sub-menu {
    --el-menu-base-level-padding: 24px;
    --el-menu-hover-bg-color: var(--el-color-primary);
    &.is-active {
      --el-menu-active-color: white;
      .el-sub-menu__title {
        background-color: var(--el-menu-hover-bg-color);
        border-radius: var(--el-menu-base-level-padding);
        color: white !important;
      }
    }
    &__title {
      border-bottom: none !important;
      border-radius: 24px;
      &:hover {
        color: white !important;
      }
    }
    &__icon-arrow {
      display: none;
    }
  }
}
</style>
