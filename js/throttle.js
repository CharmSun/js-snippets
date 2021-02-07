
/**
 * 函数节流：不停触发时，多久才执行一次
 * @param {*} func 执行的函数
 * @param {*} wait 延迟执行的毫秒数
 * @param {*} type 1：时间戳版，2：定时器版
 */
function throttle(func, wait, type) {
  var previous = 0;
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    if (type === 1) {
      var now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(function() {
            func.apply(context, args);
            timeout = null;
          }, wait);
        }
      }
    }
  };
}

/**
 * 函数防抖：多久不触发时，就执行
 * @param {*} func 执行的函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} immediate true表示立即执行，false表示非立即执行
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      if(!timeout) {
        func.apply(context, args);
      }
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  }
}