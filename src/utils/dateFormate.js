/**
 * 根据提供的格式化器对单元格值进行格式化。
 * 如果格式化器是一个函数，则直接返回该函数。
 * 如果格式化器是 "date"，则使用默认格式 "yyyy-MM-dd"。
 * 如果格式化器是 "datetime"，则使用默认格式 "yyyy-MM-dd HH:mm:ss"。
 * 否则，将格式化器视为自定义格式字符串。
 * @param {Function|string} formatter - 格式化器函数或字符串。
 * @returns {Function} - 格式化后的单元格值函数。
 */
function _formatCellBack(formatter) {
  function _formatReplaceFunc(datetimeObj) {
    const { yyyy, MM, dd, HH, mm, ss, ms } = datetimeObj;
    return formatter
      .replace("yyyy", yyyy)
      .replace("MM", MM)
      .replace("dd", dd)
      .replace("HH", HH)
      .replace("mm", mm)
      .replace("ss", ss)
      .replace("ms", ms);
  }

  if (Object.prototype.toString.call(formatter) === "[object Function]") {
    return formatter;
  }

  if (formatter === "date") {
    formatter = "yyyy-MM-dd";
  } else if (formatter === "datetime") {
    formatter = "yyyy-MM-dd HH:mm:ss";
  }

  return _formatReplaceFunc;
}

/**
 * 将数字转换为两位数的字符串，如果数字小于10，则在前面添加0。
 *
 * @param {number} num - 要转换的数字。
 * @returns {string} - 两位数的字符串。
 */
const _zero = (prop = "", len = 2) => prop.toString().padStart(len, "0");

/**
 * 格式化日期
 * @param {Date} date - 要格式化的日期对象
 * @param {string | function} formatter - 格式化字符串，默认为 "date"
 * @param {boolean} isZero - 是否补零，默认为 true
 * @returns {string} - 格式化后的日期字符串
 */
export function dateformat(date, formatter = "date", isZero = true) {
  if (!date) return "";
  // 如果不是date函数
  if (Object.prototype.toString.call(date) !== "[object Date]") {
    date = new Date(date);
  }
  const datetimeObj = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1,
    dd: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
    ms: date.getMilliseconds(),
  };
  const cellBack = _formatCellBack(formatter);
  if (isZero) {
    Object.keys(datetimeObj).forEach((key) => {
      datetimeObj[key] = _zero(datetimeObj[key]);
    });
  }
  return cellBack(datetimeObj);
}
