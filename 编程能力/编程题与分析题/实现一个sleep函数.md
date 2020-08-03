## 实现一个 sleep 函数

比如 sleep(1000) 意味着等待 1000 毫秒，可从 Promise、Generator、Async/Await 等角度实现

### Promise

```js
const sleep = (time) => {
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

sleep(1000).then(() => {
  console.log(1);
});
```

### Generator

```js
function* sleep(time) {
  yield new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
sleep(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });
```

### async

```js
async function sleep(time, func) {
  await new Promise((resolve) => setTimeout(resolve, time));
  return func();
}
sleep(1000, () => {
  console.log(1);
});
```

### ES5

```js
function sleep(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}

function output() {
  console.log(1);
}
sleep(output, 1000);
```
