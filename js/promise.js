/** 
* 当数组中所有的对象都resolve时，新对象状态变为fulfilled，所有对象的resolve的value依次添加组成一个新的数组，并以新的数组作为新对象resolve的value。
* 当数组中有一个对象reject时，新对象状态变为rejected，并以当前对象reject的reason作为新对象reject的reason。
*/
Promise.all = function(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('You must pass array')
  }
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i += 1) {
      promises[i]
        .then((value) => {
          result[i] = value;
          count += 1;
          if (count = promises.length) {
            resolve(result);
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    }
  });
}

/**
* 数组中有一个对象（最早改变状态）resolve或reject时，就改变自身的状态，并执行响应的回调。
*/
Promise.race = function(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('You must pass array')
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i += 1) {
      promises[i]
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          reject(reason);
        });
    }
  });
}