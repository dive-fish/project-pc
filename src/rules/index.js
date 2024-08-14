import * as validate from "./validate.js";
import $i18n from "@/locale";

const defaultTrigger = ["blur", "change"];

// 获取message
const callbackMessage = (msg) => $i18n.global.t(msg);

/**
 * 验证回调函数 建立在validate和element-ui基础上
 * @param { Object } validator对象 包含rule, val, callback
 * @param { String } msg 多语言key
 * @param { String } ruleKey 验证规则key
 */
const validatorCallbackFn = ({ val, callback }, msg, ruleKey) => {
  if (validate[ruleKey](val)) {
    callback();
  } else {
    callback(new Error(callbackMessage(msg)));
  }
};

const rules = {};
// 遍历validate对象
for (const key in validate) {
  // 如果是__开头的方法不生成规则
  if (key.startsWith("__")) {
    continue;
  }
  // 生成规则key 剔除开头的is
  const ruleKey = key.replace(/^is/, "");
  // 首字母小写
  const msgKey = ruleKey.at(0).toLowerCase() + ruleKey.slice(1);
  rules[`rule${ruleKey}`] = (msg = `rules.${msgKey}`, trigger = defaultTrigger) => {
    const validator = (_, val, callback) => validatorCallbackFn({ val, callback }, msg, key);
    return {
      validator,
      trigger,
    };
  };
}

export default {
  ...rules,
  ruleRequired: (message = "rules.required", trigger = "blur") => {
    return {
      required: true,
      message: callbackMessage(message),
      trigger,
    };
  },
  rulePassword1: (msg = "rules.password1", min = 6, max = 20, trigger = defaultTrigger) => {
    const validator = (_, val, callback) => {
      if (validate.__isPassword1(val, min, max)) {
        callback();
      } else {
        callback(new Error(callbackMessage(msg)));
      }
    };
    return {
      validator,
      trigger,
    };
  },
};
