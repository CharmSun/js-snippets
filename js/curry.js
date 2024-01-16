function curry(fn, args = []) {
    const len = fn.length;
    return function () {
        args = args.concat([...arguments]);
        if (args.length < len) {
            return curry(fn, args);
        } else {
            return fn(...args);
        }
    };
}