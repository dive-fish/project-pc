<route lang="yaml">
{ name: "not", meta: { layout: "main", title: "404", requiresAuth: false } }
</route>

<script setup>
defineOptions({
  name: "not",
});

const router = useRouter();
function onBack() {
  router.back();
}
</script>

<template>
  <div class="not container mx-auto flex justify-center items-center h-screen">

    <div class="flex justify-center flex-col max-md:items-center">
      <h1 class="font-bold text-6xl">404</h1>
      <h2 class="my-4 font-bold text-4xl">
        {{ $t("404") }}
      </h2>
      <div>
        <button
          class="btn z-10 overflow-hidden relative bg-transparent px-14 py-2 rounded-3xl cursor-pointer font-bold mt-6 duration-200 tracking-wider ease-in-out text-default border-4 border-solid"
          @click="onBack"
        >
          {{ $t("texts.back") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not {
  --default: var(--color);
  --active: #fff;
}
.btn {
  border-color: var(--el-color-primary);
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background: var(--el-color-primary);
    z-index: -1;
    transition: 0.2s ease;
  }
  &:hover {
    color: var(--active);
    background: var(--el-color-primary);
    &:before {
      width: 100%;
    }
  }
}
</style>
