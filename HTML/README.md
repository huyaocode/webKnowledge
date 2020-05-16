# HTML 与浏览器

### Doctype 作用？标准模式与兼容模式各有什么区别?

DOCTYPE 是用来声明文档类型和 DTD 规范的。
`<!DOCTYPE html>`声明位于 HTML 文档中的第一行，不是一个 HTML 标签，处于 html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的排版 和 JS 运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

在 HTML4.01 中<!doctype>声明指向一个 DTD，由于 HTML4.01 基于 SGML，所以 DTD 指定了标记规则以保证浏览器正确渲染内容
HTML5 不基于 SGML，所以不用指定 DTD

### HTML 全局属性

全局属性是所有 HTML 元素共有的属性; 它们可以用于所有元素，即使属性可能对某些元素不起作用。

[全局属性 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

### canvas 和 svg 的区别

canvas 是 html5 提供的新元素<canvas\>，而 svg 存在的历史要比 canvas 久远，已经有十几年了。svg 并不是 html5 专有的标签，最初 svg 是用 xml 技术（超文本扩展语言，可以自定义标签或属性）描述二维图形的语言。在 H5 中看似 canvas 与 svg 很像，但是，他们有巨大的差别。

首先，从它们的功能上来讲，canvas 可以看做是一个画布。，其绘制出来的图形为**标量图**，因此，可以在 canvas 中引入 jpg 或 png 这类格式的图片，在实际开发中，大型的网络**游戏**都是用 canvas 画布做出来的，并且 canvas 的技术现在已经相当的成熟。另外，我们喜欢用 canvas 来做一些统计用的图表，如柱状图曲线图或饼状图等。
而 svg，所绘制的图形为**矢量图**，所以其用法上受到了限制。因为只能绘制矢量图，所以 svg 中不能引入普通的图片，因为矢量图的不会失真的效果，在项目中我们会用来**做小图标**。但是由于其本质为矢量图，可以被无限放大而不会失真，这很适合被用来做地图，而百度地图就是用 svg 技术做出来的。

另外从技术发面来讲 canvas 里面绘制的图形不能被引擎抓取，如我们要让 canvas 里面的一个图片跟随鼠标事件: canvas.onmouseover=function(){}。
而 svg 里面的图形可以被引擎抓取，支持事件的绑定。另外 canvas 中我们绘制图形通常是通过 javascript 来实现，svg 更多的是通过标签来来实现，如在 svg 中绘制正矩形形就要用<rect>，这里我们不能用属性 style="width:XXX;height:XXX;"来定义。

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

定义：CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值，如 div 的 display 默认值为“block”，则为“块级”元素；span 默认 display 属性值为“inline”，是“行内”元素。

- 行内元素有：a b span img input select strong（强调的语气）
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
- 空元素：
  - 常见: br hr img input link meta
  - 不常见: area base col command embed keygen param source track wbr

不同浏览器（版本）、HTML4（5）、CSS2 等实际略有差异
参考: http://stackoverflow.com/questions/6867254/browsers-default-css-for-html-elements

### 页面导入样式时，使用 link 和@import 有什么区别？

- link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用；而@import 是 CSS 提供的，只能用于加载 CSS;
- 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
- import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题;
- link 支持使用 js 控制 DOM 去改变样式，而@import 不支持;

### 介绍一下你对浏览器内核的理解？

主要分成两部分：渲染引擎(layout engineer 或 Rendering Engine)和 JS 引擎。

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后渲染到用户的屏幕上。

JS 引擎则：解析和执行 javascript 来实现逻辑和控制 DOM 进行交互。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

### HTML5 变化

- [新的语义化元素](http://www.w3school.com.cn/html/html5_new_elements.asp)
  - header footer nav main article section
  - 删除了一些纯样式的标签
- [表单增强](http://caibaojian.com/html5/form.html)
- 新 API
  - 离线 （applicationCache ）
  - 音视频 （audio, vidio）
  - 图形 （canvans）
  - 实时通信（websoket）
  - 本地存储（localStorage, indexDB）
  - 设备能力（地图定位，手机摇一摇）

### em 与 i 的区别

- 效果都是斜体
- em 是语义化标签，表强调
- i 是样式标签， 表斜体

### 哪些元素可以自闭合？

- 表单元素 input
- img
- br, hr
- meta, link

### HTML 和 DOM 的关系

- HTML 只是一个字符串
- DOM 由 HTML 解析而来
- JS 可以维护 DOM

### property 和 attribute 的区别

例如一个 input 标签 `<input value="3" />`
他的 attribute 是 3
但如果使用`input.value = 4` 或 直接修改值为 4，这时再去 getAttribute 得到的还是"3"

### form 作用

- 直接提交表单
- 使用 submit / reset 按钮
- 便于浏览器保存表单
- 第三方库可以整体取值
- 第三方库可以进行表单验证

### 主流浏览器机器内核

| 浏览器  | 内核           | 备注                                                                                                                                                           |
| ------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE      | Trident        | IE、猎豹安全、360 极速浏览器、百度浏览器                                                                                                                       |
| firefox | Gecko          |                                                                                                                                                                |
| Safari  | webkit         | 从 Safari 推出之时起，它的渲染引擎就是 Webkit，一提到 webkit，首先想到的便是 chrome，Webkit 的鼻祖其实是 Safari。                                              |
| chrome  | Chromium/Blink | 在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。大部分国产浏览器最新版都采用 Blink 内核。二次开发 |
| Opera   | blink          | Opera 内核原为：Presto，现在跟随 chrome 用 blink 内核。                                                                                                        |

### 简述一下你对 HTML 语义化的理解？

- 用正确的标签做正确的事情。
- html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
- 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
- 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO;
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

### 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

- cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie 数据始终在同源的 http 请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。
- 存储大小：
  - cookie 数据大小不能超过 4k。
  - sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
- 有效期（生命周期）：
  - localStorage: 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
  - sessionStorage: 数据在当前浏览器窗口关闭后自动删除。
  - cookie: 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭
- 共享
  - sessionStorage 不能共享，localStorage 在同源文档之间共享，cookie 在同源且符合 path 规则的文档之间共享

### html 中 title 属性和 alt 属性的区别？

```html
<img src="#" alt="alt信息" />
```

当图片不输出信息的时候，会显示 alt 信息 鼠标放上去没有信息，当图片正常读取，不会出现 alt 信息。

```html
<img src="#" alt="alt信息" title="title信息" />
```

- 当图片不输出信息的时候，会显示 alt 信息 鼠标放上去会出现 title 信息；
- 当图片正常输出的时候，不会出现 alt 信息，鼠标放上去会出现 title 信息。
- 除了纯装饰图片外都必须设置有意义的值，搜索引擎会分析。

### 另外还有一些关于 title 属性的知识：

- title 属性可以用在除了 base，basefont，head，html，meta，param，script 和 title 之外的所有标签。
- title 属性的功能是提示。额外的说明信息和非本质的信息请使用 title 属性。title 属性值可以比 alt 属性值设置的更长。
- title 属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的。

### 为什么我们要弃用 table 标签？

table 的缺点在于服务器把代码加载到本地服务器的过程中，本来是加载一行执行一行，但是 table 标签是里面的东西**全都下载完之后才会显示出来**，那么如果图片很多的话就会导致网页一直加载不出来，除非所有的图片和内容都加载完。如果要等到所有的图片全都加载完之后才显示出来的话那也太慢了，所以 table 标签现在我们基本放弃使用了。

### head 元素

head 子元素大概分为三类，分别是：

- 描述网页基本信息的
- 指向渲染网页需要其他文件链接的
- 各大厂商根据自己需要定制的

#### 网页基本信息

一个网页，首先得有个标题，就跟人有名字一样。除此之外，还可以根据实际需要补充一些基本信息。

- 文档标题（浏览器标签中显示的文本）：<title>深入了解 head 元素</title>
- 编码格式：<meta charset="utf-8"> 如果你的页面出现乱码，那一般就是编码格式不对
- 视窗设置：<meta name="viewport" content="width=device-width, initial-scale=1.0">
- 搜索引擎优化相关内容： <meta name="description" content=“帮助你深层次了解HTML文档结构”>
- IE 浏览器版本渲染设置：<meta http-equiv="X-UA-Compatible" content="ie=edge">

#### 其他文件链接

- CSS 文件：<link rel="stylesheet" type="text/css" href="style.css">
- JavaScript 文件：<script src=“script.js"></script>

但是为了让页面的样子更早的让用户看到，一般把 JS 文件放到 body 的底部

#### 厂商定制

同样分享页面到 QQ 的聊天窗口，有些页面直接就是一个链接，但是有些页面有标题，图片，还有文字介绍。为什么区别这么明显呢？其实就是看有没有设置下面这三个内容

```html
<meta itemprop="name" content="这是分享的标题" />
<meta
  itemprop="image"
  content="http://imgcache.qq.com/qqshow/ac/v4/global/logo.png"
/>
<meta name="description" itemprop="description" content="这是要分享的内容" />
```

### 移动端项目需要注意的 4 个问题

#### meta 中设置 viewport

阻止用户手滑放大或缩小页面，需要在 index.html 中添加 meta 元素,设置 viewport。

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
/>
```

#### CSS 样式统一问题

我们需要重置页面样式，因为在不同的手机浏览器上，默认的 css 样式不是统一的。 解决方法：使用 reset.css 重置所有元素的默认样式

#### 一像素边框问题

有的手机分辨率比较高，是 2 倍屏或 3 倍屏，手机上的浏览器就会把 CSS 中的 1 像素值展示为 2 个或 3 个物理宽度 解决方法： 添加一个 border.css 库，将利用**scroll 缩放的原理**将边框重置。当我们需要使用一像素边框时只需要在标签上添加对应类名，如设置底部一像素边框就在标签上加入"border-bottom"的 class 名

#### 300 毫秒点击延迟问题

在移动端开发中，某些机型上使用 click 事件会延迟 300ms 才执行，这样影响了用户体验。 解决方法： 引入[fastclick.js](https://www.jianshu.com/p/05b142d84780)。
