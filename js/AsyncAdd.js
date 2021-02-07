function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, Math.floor(Math.random()*100));
}

function add(a, b) {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (error, sum) => {
      resolve(sum);
    });
  });
}


async function sum() {
  const nums = Array.prototype.slice.call(arguments);
  return nums.reduce(async (prev,next) => {
      const a = await prev;
      const r = await add(a, next);
      return r;
  });
}


(async () => {
  const result1 = await sum(1, 4, 6, 9, 1, 4);
  const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
  const result3 = await sum(1, 6, 0, 5);
  console.log([result1, result2, result3]); // [25, 36, 12]
})();