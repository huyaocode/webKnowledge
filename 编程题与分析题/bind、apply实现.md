### 自封装bind方法

 - 因为bind的使用方法是 某函数.bind(某对象，...剩余参数)
   - 所以需要在Function.prototype 上进行编程
 - 将传递的参数中的某对象和剩余参数使用apply的方式在一个回调函数中执行即可
 - 要在第一层获取到被绑定函数的this，因为要拿到那个函数用apply

```js
/**
 * 简单版本 
 */
Function.prototype.myBind = (that, ...args) => {
  const funcThis = this;
  return function(..._args) {
    return funcThis.apply(that, args.concat(_args));
  }
}

Function.prototype.mybind = function(ctx) {
    var _this = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return _this.apply(ctx, args.concat(args, Array.prototype.slice.call(arguments)))
    }
}
```

```js
/**
 * 自封装bind方法
 * @param  {对象} target [被绑定的this对象， 之后的arguments就是被绑定传入参数]
 * @return {[function]}  [返回一个新函数，这个函数就是被绑定了this的新函数]
 */
Function.prototype.myBind = function (target){
	target = target || window;
	var self = this;
	var args = [].slice.call(arguments, 1);
	var temp = function(){};
	var F = function() {
		var _args = [].slice.call(arguments, 0);
		return self.apply(this instanceof temp ? this: target, args.concat(_args));
	}
	temp.prototype = this.prototype;    //维护原型关系
	F.prototype = new temp();
	return F;
}
```


### 自封装一个apply

 - 首先要先原型上即 Function.prototype上编程
 - 需要拿到函数的引用， 在这里是 this
 - 让 传入对象.fn = this
 - 执行 传入对象.fn(传入参数)
 - 返回执行结果

```js
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```