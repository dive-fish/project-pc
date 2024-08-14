<script setup>
import { isEmail } from "@/rules/validate.js";

const props = defineProps({
  sentId: {
    type: String,
    default: "",
    required: true,
  },
  storageKey: {
    type: String,
    default: "time",
  },
});

const value = defineModel("modelValue", { type: String, default: "", required: true });

function useGetCode() {
  const timeStorage = globalThis.localStorage.getItem(props.storageKey) || 0;
  // 防止刷新页面后，倒计时重置
  const time = ref(Number(timeStorage));

  function getTime() {
    return new Date().getTime() + 1000 * 60;
  }

  const isFinish = ref(true);
  function handleFinish() {
    globalThis.localStorage.removeItem(props.storageKey);
    isFinish.value = true;
  }

  function request(UserId) {
    return useInstance(
      "sentCode",
      {},
      {
        method: "GET",
        isMsg: true,
        params: {
          email: props.sentId,
        },
      }
    );
  }
  const { run, loading } = useRequest(request, {
    loadingDelay: 500,
    loadingKeep: 1000,
    throttleInterval: 300,
    manual: true,
    onSuccess: ({ code }) => {
      if (code === 200) {
        isFinish.value = false;
        const value = getTime();
        globalThis.localStorage.setItem(props.storageKey, value);
        time.value = value;
      }
    },
  });

  async function start() {
    if (!isEmail(props.sentId)) {
      $message.showMessage("rules.email", { type: "error" });
      return;
    }
    run();
  }

  onMounted(() => {
    if (time.value > new Date().getTime()) {
      isFinish.value = false;
    }
  });

  return {
    time,
    isFinish,
    loading,
    start,
    handleFinish,
  };
}

const { time, isFinish, handleFinish, loading, start } = useGetCode();
</script>

<template>
  <el-input v-model="value" clearable placeholder="请输入验证码" maxlength="4">
    <template #suffix>
      <el-button link :disabled="!isFinish" type="primary" :loading="loading" @click="start">
        <template v-if="!isFinish">
          <el-countdown class="x-sent-code-countdown" format="ss" :value="time" @finish="handleFinish" />
        </template>
        <template v-else> 获取验证码 </template>
      </el-button>
    </template>
  </el-input>
</template>

<style lang="scss">
.x-sent-code {
  &-countdown {
    --el-statistic-content-font-weight: var(--el-font-weight-primary);
    --el-statistic-content-font-size: var(--el-font-size-base);
    --el-statistic-content-color: inherit;
  }
}
</style>
