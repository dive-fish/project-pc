<script setup>
const props = defineProps({
  contextMenuItems: {
    type: Array,
    default: () => [],
  },
  callBack: {
    type: Function,
    default: () => true,
  },
});

function itemDisabled(item, index) {
  if (typeof item.disabled === "function") {
    return item.disabled(index, props.contextMenuItems);
  }
  return item.disabled;
}

const contextMenuVisible = ref(false);
function hideContextMenu() {
  contextMenuVisible.value = false;
}

const contextmenuRef = ref(null);
const positionX = ref("0px");
const positionY = ref("0px");
function onContextmenu(e) {
  e.stopPropagation();
  e.preventDefault();
  const { clientY, clientX } = e;
  // 如果有外部回调函数，且返回false，则不处理
  if (!props.callBack(e)) return;

  let x = clientX;
  // 不能超过contextmenuRef的宽度，超过则减去menu的宽度
  const width = contextmenuRef.value.offsetWidth;
  const menuWidth = 130;
  if (clientX + menuWidth > width) {
    x = width - menuWidth;
  }

  positionX.value = x + "px";
  positionY.value = clientY + "px";
  contextMenuVisible.value = true;
}

const emit = defineEmits(["handleSelect"]);
function handleSelect(id) {
  emit("handleSelect", id);
  hideContextMenu();
}

// 观察contextmenuRef是否超出屏幕，超出则隐藏；用于解决右键菜单超出屏幕的问题
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio === 0) {
      hideContextMenu();
    }
  });
});

// 添加右键菜单事件
onMounted(() => {
  contextmenuRef.value.addEventListener("contextmenu", onContextmenu, true);
  window.addEventListener("click", hideContextMenu, true);
  window.addEventListener("contextmenu", hideContextMenu);
  observer.observe(contextmenuRef.value);
});

// 卸载事件
onBeforeUnmount(() => {
  observer.disconnect();
  window.removeEventListener("click", hideContextMenu);
  contextmenuRef.value.removeEventListener("contextmenu", onContextmenu);
  window.removeEventListener("contextmenu", hideContextMenu);
});
</script>

<template>
  <div class="x-contextmenu" ref="contextmenuRef">
    <Teleport to="body">
      <el-menu
        v-show="contextMenuVisible"
        class="x-contextmenu-list fixed z-50"
        id="contextmenu"
        mode="vertical"
        :collapse-transition="false"
        @select="handleSelect"
      >
        <template v-for="(item, index) in props.contextMenuItems" :key="item.id">
          <el-menu-item :index="item.id" :disabled="itemDisabled(item, index)">
            <x-icon v-if="item.icon" :icon="item.icon" size="12px"></x-icon>
            {{ $t(item.label) }}
          </el-menu-item>
          <el-divider v-if="index < props.contextMenuItems.length - 1" class="!my-0" />
        </template>
      </el-menu>
    </Teleport>
    <slot />
  </div>
</template>

<style lang="scss">
.x-contextmenu {
  &-list {
    --el-menu-item-height: 30px;
    --el-menu-item-font-size: 12px;
    --el-menu-text-color: var(--el-text-color-regular);
    --el-menu-active-color: var(--el-text-color-regular);
    left: v-bind(positionX);
    top: v-bind(positionY);
    box-shadow: var(--el-box-shadow);
  }
}
</style>
