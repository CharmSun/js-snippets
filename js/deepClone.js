function deepClone(target) {
  let result;
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = [];
      for (let i in target) {
        result.push(deepClone(target[i]));
      }
    } else if (target === null) {
      result = null;
    } else if (targer.constructor === RegExp) {
      result = target;
    } else {
      result = {};
      for (let key in target) {
        result[key] = deepClone(target[key]);
      }
    }
  } else {
    result = target;
  }
  return result;
}