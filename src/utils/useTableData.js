export function useTableData(requestData, params, requestConfig) {
  const { name, config } = requestData;

  const query = reactive({
    ...params,
  });

  function request(data) {
    return useInstance(name, { ...query, ...data }, config);
  }

  const total = ref(0);

  const CELLBACK = useRequest(request, {
    loadingDelay: 500,
    loadingKeep: 1000,
    debounceInterval: 300,
    ...requestConfig,
    onSuccess: (res) => {
      if (res.code === 200) {
        total.value = res.total;
      }
      if (typeof requestConfig?.onSuccess === "function") {
        requestConfig.onSuccess(res);
      }
    },
  });

  const { run } = CELLBACK;

  function handleQuery(data) {
    query.PageIndex = 1;
    run(data);
  }

  return {
    total,
    query,
    handleQuery,
    ...CELLBACK,
  };
}
