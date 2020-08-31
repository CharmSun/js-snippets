/**
 * 限制并发数量的Promise
 */
class LimitPromise {
  constructor(limit = 2) {
    // 异步任务“并发”上限
    this._limit = limit;
    // 当前正在执行的任务数量
    this._count = 0;
    // 等待执行的任务队列
    this._taskQueue = [];
  }

  /**
   * 调用器, 将异步任务函数和它的参数传入, 返回一个新的Promise
   * @param {*} caller  异步任务函数，它必须是async函数或者返回Promise的函数
   * @param  {...any} args 异步任务函数的参数列表
   */
  call(caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this._createTask(caller, args, resolve, reject);
      if (this._count < this._limit) {
        task();
      } else {
        this._taskQueue.push(task);
      }
    });
  }

  /**
   * 创建一个任务, 返回一个任务函数
   * @param {*} caller  实际执行的函数
   * @param {*} args 执行函数的参数
   * @param {*} resolve 
   * @param {*} reject 
   */
  _createTask(caller, args, resolve, reject) {
    return () => {
      caller(...args)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this._count -= 1;
        if (this._taskQueue.length > 0) {
          const task = this._taskQueue.shift();
          task();
        }
      });
      this._count += 1;
    };
  }
}


const lp = new LimitPromise();
const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const addTask = (time, order) => {
  lp.call(() => timeout(time)).then(() => {
    console.log(order);
  });
};

addTask(1000, '1');
addTask(500, '2');
addTask(400, '3');
addTask(300, '4');
// 2, 3, 1, 4