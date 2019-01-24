
# XSS 跨站脚本攻击
![xss](img/xss.png) 

XSS ( Cross Site Scripting )
XSS是指恶意攻击者利用网站没有对用户提交数据进行转义处理或者过滤不足的缺点，进而添加一些代码，嵌入到web页面中去。使别的用户访问都会执行相应的嵌入代码。

从而盗取用户资料、利用用户身份进行某种动作或者对访问者进行病毒侵害的一种攻击方式。

## XSS攻击的危害包括：

1. 获取页面数据
2. 获取cookie
3. 劫持前端逻辑
4. 发送请求
5. 偷取网站任意数据
6. 偷取用户资料
7. 偷取用户密码和登陆态
8. 欺骗用户
   
## XSS攻击分类

### 反射型
通过url参数直接注入。
攻击者将恶意代码放在url中带过来，然后将一些url中的查询参数写入到页面中。

比如把url中查询内容直接写入到search框中而不进行转义，那么恶意代码就会被执行在用户的浏览器端。

并不是在url中没有包含script标签的网址都是安全的，可以使用[短网址](dwz.com)来让网址变得很短。

### 存储型
XSS会被保存到数据库，在其他用户访问（前端）到这条数据时，这个代码会在访问用户的浏览器端执行。

比如攻击者在一篇文章的评论中写入了script标签，这个评论被保存数据库，当其他用户看到这篇文章时就会执行这个脚本。

## XSS攻击注入点
 - HTML节点内容
   - 如果一个节点内容是动态生成的，而这个内容中包含用户输入。
 - HTML属性
   - 某些节点属性值是由用户输入的内容生成的。那么可能会被封闭标签后添加script标签。
```html
<img src="${image}"/>
<img src="1" onerror="alert(1)" />
```
 - Javascript代码
   - JS中包含由后台注入的变量或用户输入的信息。
```js
var data = "#{data}";
var data = "hello"; alert(1);"";
```
 - 富文本


## XSS 防御
### 对于会在DOM中出现的字符串（用户数据）：

 < 转义为 \&lt;
 > 转义为 \&gt;

### 对于可能出现在DOM元素属性上的数据

 " 转义为 \&quot;
 ' 转义为 \&9039;
 空格转义为 \&nbsp; 但这可能造成多个连续的空格，也可以不对空格转义，但是一定要为属性加双引号

 & 这个字符如果要转义，那么一定要放在转移函数的第一个来做

### 避免JS中的插入
```js
var data = "#{data}";
var data = "hello"; alert(1);"";
```
因为是用引号将变量包裹起来的，而且被攻击也因为引号被提前结束，所以要做的就是将引号转义
```
先 \\ -> \\\\
再 " -> \\"
```

### 富文本

按照黑名单过滤： script等
但是html标签中能执行html代码的属性太多了，比如onclick, onhover,onerror, <a href="jacascript:alert(1)">
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

做法：将HTML解析成树状结构，对于这个DOM树，一个一个的去看是否存在合法的标签和属性，如果不是就去掉。

使用cheerio就可以快速的解析DOM
```js
function xssFilter (html) {

  const cheerio = require('cheerio');
  const $ = cheerio.load(html);

  //白名单
  const whiteList = {'img': ['src']}

  $('*').each((index, elem) => {
    if(!whiteList[elem.name]) {
      $(elem).remove();
      return;
    }
    for(let attr in elem.attribs) {
      if(whiteList[elem.name].indexOf(attr) === -1) {
        $(elem).attr(attr, null);
      }
    }
  })
  return html;
}
```

## 使用npm包来简化操作
[xss文档](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)

## CSP 内容安全策略
[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) ( Content Security Policy ) 在http头中指定哪一些内容是可以执行的

