/**
 * @description 将文件路径转换为对象 将文件的名字作为key
 * @param { Array } contexts 文件路径数组
 * @returns { Object } 返回一个对象key是文件名
 */

export function _transformImportedModules(contexts) {
  const result = {};
  Object.entries(contexts).forEach(([path, module]) => {
    const moduleData = module.default;
    // 移除路径的起始部分./和../,去除index、global和文件后缀
    const key = path
      .replace(/^\.\//, "")
      .replace(/\.\w+$/, "")
      .replace(/\/index$/, "");
    // .replace(/\/global$/, "");

    const keyArr = key.split("/");
    const firstKey = keyArr.shift();
    const lastKey = keyArr.join("/").replaceAll("/", "-");

    if (!result[firstKey] && !key.endsWith("global")) {
      result[firstKey] = {};
    }

    // global直接合并到对应的语言包中
    if (key.endsWith("global") || !lastKey.length) {
      if (result[firstKey]) {
        Object.assign(result[firstKey], moduleData);
      } else {
        Object.assign(result, moduleData);
      }
      return;
    }

    if (lastKey.length) {
      result[firstKey][lastKey] = moduleData;
    } else {
      result[firstKey] = moduleData;
    }
  });

  return result;
}
