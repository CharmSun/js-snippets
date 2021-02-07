/**
 * bind返回的函数如果作为构造函数，搭配new关键字出现的话，我们绑定的this就需要被忽略
 * 需要处理构造函数场景下的兼容
 */
Function.prototype.bind = Function.prototype.bind || function(context) {
  if (typeof this !== 'function') {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var args = Array.prototype.slice.call(arguments, 1);
  var self = this;
  var F = function() {}; // 原型式继承
  F.prototype = this.prototype;
  var bound = function() {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    return self.apply(this instanceof F ? this : context || this, finalArgs);
  }
  bound.prototype = new F();
  return bound;
}