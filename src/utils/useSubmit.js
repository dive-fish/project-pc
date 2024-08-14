export function useSubmit(requestData, formRef, requestConfig) {
  const { name, config } = requestData;

  function request(data) {
    return useInstance(name, data, config);
  }

  const CELLBACK = useRequest(request, {
    manual: true,
    loadingDelay: 500,
    loadingKeep: 1000,
    throttleInterval: 300,
    ...requestConfig,
  });

  const { run } = CELLBACK;

  function onFun(data) {
    formRef.value?.formRef.validate((valid) => {
      if (valid) {
        run(data);
      }
    });
  }

  return {
    ...CELLBACK,
    onFun,
  };
}
