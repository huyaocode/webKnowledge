# 使用 Promise 封装一个 AJAX

### ajax 的 xhr 对象的 7 个事件

- onloadstart
  - 开始 send 触发
- onprogress
  - 从服务器上下载数据每 50ms 触发一次
- onload
  - 得到响应
- onerror
  - 服务器异常
- onloadend
  - 请求结束，无论成功失败
- onreadystatechange
  - xhr.readyState 改变使触发
- onabort
  - 调用 xhr.abort 时触发

### 实现代码

```js
const ajax = (obj) => {
  return new Promise((resolve, reject) => {
    let method = obj.method || "GET";

    // 创建 xhr
    let xhr;
    if (window.XMLHTTPRequest) {
      xhr = new XMLHTTPRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 超时
    xhr.ontimeout = function () {
      reject({
        errorType: "timeout_error",
        xhr: xhr,
      });
    };
    // 报错
    xhr.onerror = function () {
      reject({
        errorType: "onerror",
        xhr: xhr,
      });
    };
    // 监听 statuschange
    xhr.onreadystatechange = function () {
      if (xhr.readState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject({
            errorType: "onerror",
            xhr: xhr,
          });
        }
      }
    };

    // 发送请求
    if (method === "POST") {
      xhr.open("POST", obj.url, true);
      xhr.responseType = "json";
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(JSON.parse(obj.data));
    } else {
      let query = "";
      for (let key in obj.data) {
        query += `&${encodeURIComponent(key)}=${encodeURIComponent(
          obj.data[key]
        )}`;
      }
      // The substring() method returns the part of the string between the start and end indexes, or to the end of the string.
      query.substring(1);
      xhr.open("GET", obj.url, +"?" + query, true);
      xhr.send();
    }
  });
};
```
