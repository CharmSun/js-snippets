var MyPromise = function(executor) {
  var _this = this;
  this.status = 'pending';
  // 默认状态，可以转化为 resolved 和 rejected
  this.successVal = undefined;
  this.failVal = undefined;
  // 用于存放成功和失败的回调
  this.onFulfilledList = [];
  this.onRejectedList = [];

  function resolve(val) {
    if ( _this.status === 'pending' ) {
      _this.status = 'resolved';
      _this.successVal = val;
      // -------------- 执行所有的成功回调 ---------------
      _this.onFulfilledList.forEach(function(fn) {
        fn();
      });
    }
  }
  function reject(val) {
    if ( _this.status === 'pending' ) {
      _this.status = 'rejected';
      _this.failVal = val;
      // -------------- 执行所有的失败回调 ---------------
      _this.onRejectedList.forEach(function(fn) {
        fn();
      });
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
};
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  var _this = this;

  if ( _this.status === 'resolved' ) {
    onFulfilled(_this.successVal);
  }
  if ( _this.status === 'rejected' ) {
    onFulfilled(_this.failVal);
  }

  // ----------------- 对异步调用的处理 -------------------
  // 说明：如果是异步调用，走到 then 方法里的时候，status 还没有被修改，仍然
  // 是 pending 状态，所以这时候需要再回去执行 executor 里的对应方法，而对应的
  // 方法会将对应的存放回调的 list 里的方法执行(类似发布-订阅模式一样的处理)
  if ( _this.status === 'pending' ) {
    _this.onFulfilledList.push(function() {
      onFulfilled(_this.successVal);
    });
    _this.onRejectedList.push(function() {
      onRejected(_this.failVal);
    });
  }
};