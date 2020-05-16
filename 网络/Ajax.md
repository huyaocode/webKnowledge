# Ajax

[Ajax | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)

AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML）。简单点说，就是使用 XMLHttpRequest 对象与服务器通信。 它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据。AJAX 最吸引人的就是它的“异步”特性，也就是说他可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。

### 创建一个简单的 Ajax

- 创建 XMLHttpRequest 对象

```js
if (window.XMLHttpRequest) {
  // Mozilla, Safari, IE7+ ...
  httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  // IE 6 and older
  httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```

- 绑定 onreadystatechange 事件

```js
httpRequest.onreadystatechange = function () {
  // Process the server response here.
};
```

- 向服务器发送请求

```js
httpRequest.open("GET", "http://www.example.org/some.file", true);
httpRequest.send();
```

完整的例子

```js
function ajax(url, cb) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
```

### httpRequest.readyState 的值

- 0 (未初始化) or (请求还未初始化)
- 1 (正在加载) or (已建立服务器链接)
- 2 (加载成功) or (请求已接受)
- 3 (交互) or (正在处理请求)
- 4 (完成) or (请求已完成并且响应已准备好)

### 访问服务端返回的数据

- httpRequest.responseText
  - 服务器以文本字符的形式返回
- httpRequest.responseXML
  - 以 XMLDocument 对象方式返回，之后就可以使用 JavaScript 来处理

### GET 注意事项

- 如果不设置响应头 `Cache-Control: no-cache` 浏览器将会把响应缓存下来而且再也不无法重新提交请求。你也可以添加一个总是不同的 GET 参数，比如时间戳或者随机数 (详情见 [bypassing the cache](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache))

### POST 请求

POST 请求则需要设置`RequestHeader`告诉后台传递内容的编码方式以及在 send 方法里传入对应的值

```js
xhr.open("POST", url, true);
xhr.setRequestHeader(("Content-Type": "application/x-www-form-urlencoded"));
xhr.send("key1=value1&key2=value2");
```

### Ajax 与 cookie

- ajax 会自动带上同源的 cookie，不会带上不同源的 cookie
- 可以通过前端设置 withCredentials 为 true， 后端设置 Header 的方式让 ajax 自动带上不同源的 cookie，但是这个属性对同源请求没有任何影响。会被自动忽略。

[withCredentials | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/", true);
xhr.withCredentials = true;
xhr.send(null);
```
