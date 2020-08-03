// 判断变量否为function
const isFunction = (variable) => typeof variable === "function";
// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

/**
 * 测试函数
 */
const test = async () => {
  const res = await new MyPromise((resolve, reject) => {
    console.log("构造函数内执行");
    setTimeout(() => {
      console.log("构造函数执行完毕， resolve");
      resolve(1);
    }, 1000);
  })
    .then((res) => {
      console.log("第 1 个then 函数执行");
      // 返回一个Promise对象
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          console.log("第 1 个then中返回的 Promise 执行完毕，resolve");
          resolve(res + 2);
        }, 2000);
      });
    })
    .then((res) => {
      console.log("第 2 个then 函数执行");
      // 返回一个Promise对象
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          console.log("第 2 个then中返回的 Promise 执行完毕，resolve");
          resolve(res + 3);
        }, 2000);
      });
    })
    .then((res) => {
      console.log("第 3 个then 函数执行");
      console.log("打印结果：", res);
      return res + 3;
    })
    .then((res) => {
      console.log("第 4 个then 函数执行");
      console.log("打印结果：", res);
      return res + 4;
    });

  console.log("res = ", res);
};

const test2 = async () => {
  const res = await new MyPromise((resolve, reject) => {
    resolve(1);
  }).then(
    (res) => {
      console.log("第 1 个then 函数执行");
      // 返回一个Promise对象
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          console.log("第 1 个then中返回的 Promise 执行完毕，resolve");
          resolve(res + 2);
        }, 2000);
      });
    },
    (err) => {}
  );
};

/**
 * Promise 先同步执行构造函数中逻辑，执行完毕后，调用 _resolve 或 _reject 方法
 * _resolve 或 _reject 内部有 setTimeout, 所以这时是去先执行在这个Promise上挂载的 then 函数
 * then 函数执行, 将 then 函数中的
 *
 */

class MyPromise {
  /**
   * 构造函数接受一个函数，我们规定这个函数的两个参数为 resolve 和 reject
   * @param {Function} handle 一个立即被执行的函数
   */
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    // 添加状态
    this._status = PENDING;
    // 添加状态
    this._value = undefined;
    // 添加成功回调函数队列, 其实里面只保存一个函数
    this._fulfilledQueues = [];
    // 添加失败回调函数队列
    this._rejectedQueues = [];

    // 执行handle，构造函数内执行完成后，就会回调这里的这两个函数
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  // then 函数中 resovle 时调用的函数
  _resolve(val) {
    const run = () => {
      console.log("\t 执行队列中函数");
      if (this._status !== PENDING) return;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        console.log("\tthis._fulfilledQueues", this._fulfilledQueues);
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value);
        }
      };
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while ((cb = this._rejectedQueues.shift())) {
          cb(error);
        }
      };
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
      if (val instanceof MyPromise) {
        val.then(
          (value) => {
            this._value = value;
            this._status = FULFILLED;
            runFulfilled(value);
          },
          (err) => {
            this._value = err;
            this._status = REJECTED;
            runRejected(err);
          }
        );
      } else {
        this._value = val;
        this._status = FULFILLED;
        runFulfilled(val);
      }
    };
    console.log("\t _reslve 执行");
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }

  // then 函数中 reject 时调用的函数
  _reject(err) {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while ((cb = this._rejectedQueues.shift())) {
        cb(err);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }

  /**
   *
   * @param {*} onFulfilled then 的第一个参数，成功时调用
   * @param {*} onRejected then 的第二个参数，失败时调用
   */
  then(onFulfilled, onRejected) {
    console.log("\t 执行then方法");
    const { _value, _status } = this;
    // 返回一个新的Promise对象
    return new MyPromise((resolve, reject) => {
      console.log("\t 新构造 Promise");
      // 封装一个成功时执行的函数
      let fulfilled = (value) => {
        try {
          if (!isFunction(onFulfilled)) {
            resolve(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(resolve, reject);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              resolve(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          reject(err);
        }
      };
      // 封装一个失败时执行的函数
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            reject(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(resolve, reject);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              resolve(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          reject(err);
        }
      };

      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          console.log("\t\t FULFILLED");
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(
          (res) => {
            values[i] = res;
            count++;
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values);
          },
          (err) => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err);
          }
        );
      }
    });
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) =>
        MyPromise.resolve(cb()).then(() => {
          throw reason;
        })
    );
  }
}

test();
