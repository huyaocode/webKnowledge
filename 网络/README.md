# 网络知识

## [UDP](UDP.md)


## [TCP](TCP.md)


## [HTTP](HTTP.md)


## [跨域](./跨域.md)


## [HTTP缓存](缓存.md)


## [cookie和session](cookie和session.md)


## [从输入URL到页面加载完成的过程](从输入URL到页面加载完成的过程.md)



### DNS解析
DNS 的作用就是通过域名查询到具体的 IP。

1. 操作系统会首先在本地缓存中查询
2. 没有的话会去系统配置的 DNS 服务器中查询
3. 如果这时候还没得话，会直接去 DNS 根服务器查询，这一步查询会找出负责 com 这个一级域名的服务器
4. 然后去该服务器查询 google 这个二级域名
5. 接下来三级域名的查询其实是我们配置的，你可以给 www 这个域名配置一个 IP，然后还可以给别的三级域名配置一个 IP

以上介绍的是 DNS 迭代查询，还有种是递归查询，区别就是前者是由客户端去做请求，后者是由系统配置的 DNS 服务器做请求，得到结果后将数据返回给客户端。


### 前后端如何通信
 - Ajax
 - WebSocket
 - CORS


### 如何创建Ajax
```js
var xhr;
if(window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 && xhr.status == 200) {
    dosome(xhr.responseText);
  }
}

xhr.open('GET', "...", "是否异步");
xhr.send();
```