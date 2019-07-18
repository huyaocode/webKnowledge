function compose(funcs) {
  var len = funcs.length;
  var index = len - 1;

  for(let i = 0; i < len; i ++) {
    if(typeof funcs[i] !== 'function') {
      throw new TypeError('Expected a function');
    }
  }

  return function (...args) {

    let result =  funcs[index](...args) // 第一次
    while(--index >= 0) {
      result = funcs[index](result)
    }
    return result;
  }
}

function a (str) {
  return `a ${str}`
}
function b (str) {
  return `b ${str}`
}
function c (str) {
  return `c ${str}`
}

const abc = compose([a, b, c])

console.log(abc('asdf'))