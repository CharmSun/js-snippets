function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

function compareObj(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (isObject(obj1) && isObject(obj2) && Object.keys(obj1).length === Object.keys(obj2).length) {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (!compareObj(obj1[key], obj2[key])) {
          return false;
        }
      }
    }
  } else if (isArray(obj1) && isArray(obj2) && obj1.length === obj2.length) {
    for (let i = 0, len = obj1.length; i < len; i++) {
      if(!compareObj(obj1[i], obj2[i])) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}