const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []
  
  function resolve(value) {
    if(that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }
  
  function reject(value) {
    if(that.state === PENDING){
      that.state = REJECTED
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  //对传入的两个参数做判断，如果不是函数将其转为函数
  onFulfilled = 
    typeof onFulfilled === 'function'
    ? onFulfilled 
    : v => v  // onFulfilled = v => v
  onRejected = 
    typeof onRejected === 'function'
    ? onRejected
    : r => {
      throw r
    }
  
  if(that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  else if(that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  else {
    onRejected(that.value)
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的回调数据')
  }, 1000)
}).then(value => {
  console.log('Promise.then:  ', value)
})