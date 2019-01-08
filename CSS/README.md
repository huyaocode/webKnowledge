# CSS

### Flex布局
[Flex - 阮一峰 （语法篇）](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[Flex - 阮一峰 （实战篇）](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)



### BFC 布局
[[布局概念] 关于CSS-BFC深入理解](https://juejin.im/post/5909db2fda2f60005d2093db)

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

如何生成BFC：（脱离文档流）
1. 根元素，即HTML元素（最大的一个BFC）
2. float的值不为none
3. position的值为absolute或fixed
4. overflow的值不为visible（默认值。内容不会被修剪，会呈现在元素框之外）
5. display的值为inline-block、table-cell、table-caption

BFC布局规则：
1. 内部的Box会在垂直方向，一个接一个地放置。
2. 属于同一个BFC的两个相邻的Box的margin会发生重叠
3. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此, 文字环绕效果，设置float
4. BFC的区域不会与float box重叠。
5. 计算BFC的高度，浮动元素也参与计算

BFC作用：
1. 自适应两栏布局
2. 可以阻止元素被浮动元素覆盖
3. 可以包含浮动元素---清除内部浮动 原理: 触发父div的BFC属性，使下面的子div都处在父div的同一个BFC区域之内
4. 分属于不同的BFC时，可以阻止margin重叠



### CSS 选择符有哪些？
 - id选择器
 - class选择器
 - 标签选择
 - 后代选择 （div a）
 - 子代选择 （div > p）
 - 相邻选择 （div + p）
 - 通配符选择 （*）
 - 属性选择器
 - 伪类选择器



### CSS3属性选择器
| 选择器 | 描述 |
| - | - |
|[attribute]	|用于选取带有指定属性的元素。|
|[attribute=value]	|用于选取带有指定属性和值的元素。|
|[attribute~=value]	|用于选取属性值中包含指定词汇的元素。|
|[attribute\|=value]	|用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。|
|[attribute^=value]	|匹配属性值以指定值开头的每个元素。|
|[attribute$=value]	|匹配属性值以指定值结尾的每个元素。|
|[attribute*=value]	|匹配属性值中包含指定值的每个元素。|



### CSS3伪类选择器

[伪类 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95)
常用：

 - :hover
 - :focus
 - :after 在元素之前添加内容,也可以用来做清除浮动。
 - :before 在元素之后添加内容
 - :enabled 选择器匹配每个已启用的元素（大多用在表单元素上）。
 - :disabled 控制表单控件的禁用状态。
 - :checked 单选框或复选框被选中
 - ::selection  用户选中的区域
 - :empty   一般用来隐藏内部什么都没有的元素
 - :not(selecter)
 - 
 - p:first-of-type 
 - p:last-of-type 
 - p:only-of-type 
 - p:nth-of-type(n)
 - p:nth-last-of-type(n)
 - 
 - :nth-child(n)
 - :nth-last-child(n)
 - p:only-child 



### display: none; 与 visibility: hidden; 的区别

相同： 它们都能让元素不可见

区别：

- display:none;会让元素完全**从渲染树中消失**，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染时元素继续占据空间，只是内容不可见
- display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility:hidden;是继承属性，子孙节点消失由于继承了 hidden，通过设置 **visibility: visible;可以让子孙节点显式**
- 修改常规流中元素的 display 通常会造成文档**重排**。修改 visibility 属性只会造成本元素的重绘
- 读屏器不会读取 display: none;元素内容；会读取 visibility: hidden 元素内容



### 外边距折叠(collapsing margins)

外边距重叠就是 margin-collapse

相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。 这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距

折叠结果遵循下列计算规则：

- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值
- 两个外边距一正一负时，折叠结果是两者的相加的和

新手在做导航栏的时候发现页面整体掉下来一截就是这个原因。



### 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？
 有两种， IE 盒子模型、W3C 盒子模型；

盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；

- 区 别： IE 的 content 部分把 border 和 padding 计算了进去;
- 标准浏览器通过设置 css3 的 box-sizing: border-box 属性，触发“怪异模式”解析计算宽高

标准(W3C)盒模型：元素宽度 = width + padding + border + margin
![W3C盒模型](../img/stadardBox.png)

怪异(IE)盒模型：元素宽度 = width + margin
![IE盒模型](../img/strangeBox.png)



### CSS单位
1. px  绝对单位。传统上一个像素对应于计算机屏幕上的一个点，而对于高清屏则对应更多。

2. %   父元素宽度的比例。
   1. 如果对 html 元素设置 font-size 为百分比值，则是以浏览器默认的字体大小16px为参照计算的（所有浏览器的默认字体大小都为 16px），如62.5%即等于10px（62.5% * 16px = 10px）。

3. em  相对单位。 不同的属性有不同的参照值。
   1. 对于字体大小属性（font-size）来说，em 的计算方式是相对于父元素的字体大小
   2. border, width, height, padding, margin, line-height）在这些属性中，使用em单位的计算方式是参照该元素的 font-size，1em 等于该元素设置的字体大小。同理如果该元素没有设置，则一直向父级元素查找，直到找到，如果都没有设置大小，则使用浏览器默认的字体大小。

4. rem 是相对于根元素 html 的 font-size 来计算的，所以其参照物是固定的。
   1. 好处：rem 只需要修改 html 的 font-size 值即可达到全部的修改，即所谓的牵一发而动全身。

5. vw, vh, vmin, vmax   相对单位，是基于视窗大小（浏览器用来显示内容的区域大小）来计算的。
   1. vw：基于视窗的宽度计算，1vw 等于视窗宽度的百分之一
   2. vh：基于视窗的高度计算，1vh 等于视窗高度的百分之一
   3. vmin：基于vw和vh中的最小值来计算，1vmin 等于最小值的百分之一
   4. vmax：基于vw和vh中的最大值来计算，1vmax 等于最大值的百分之一


### 单行文本溢出显示省略号
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: no-wrap;
```


### 多行文本溢出显示省略号
```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```



### CSS 优化、提高性能的方法有哪些？
- 多个 css 合并，尽量减少 HTTP 请求
- css 雪碧图
- 抽象提取公共样式，减少代码量
- 选择器优化嵌套，尽量避免层级过深 （用‘>’替换‘ ’）
- 属性值为 0 时，不加单位
- 压缩CSS代码
- 避免使用 [CSS 表达式](http://www.divcss5.com/css3-style/c50224.shtml)
  - 它们要计算成千上万次并且可能会对你页面的性能产生影响。



### link 与 @import 的区别

- link 是 HTML 方式， @import 是 CSS 方式
- link 最大限度支持并行下载，@import 过多嵌套导致串行下载，出现 FOUC
- link 可以通过 rel="alternate stylesheet" 指定候选样式
- 浏览器对 link 支持早于@import ，可以使用 @import 对老浏览器隐藏样式
- @import 必须在样式规则之前，可以在 css 文件中引用其他文件
- 总体来说：link 优于@import



### CSS 有哪些继承属性

- 关于文字排版的属性如：
  - font
  - word-break
  - letter-spacing
  - text-align
  - text-rendering
  - word-spacing
  - white-space
  - text-indent
  - text-transform
  - text-shadow
- line-height
- color
- visibility
- cursor



### 如何竖直居中一个元素
参考代码: [CSS/居中元素/垂直居中](https://github.com/huyaocode/webKnowledge/tree/master/CSS/%E5%B1%85%E4%B8%AD%E5%85%83%E7%B4%A0/%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD)
#### 被居中元素宽高固定

1. 绝对定位，top和left 为 50%， margin的left和top为自身宽高一半
```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -9rem;
  margin-top: -5rem;
}
```

2. 绝对定位，top和lefe为父元素一半剪自身一半
```css
.center {
  position: absolute;
  top: calc(50% - 5em);
  left: calc(50% - 9em);
}
```

#### 被居中元素宽高不定
3. 使用CSS3 的 `transform`将位置在中心点平移自身宽高一半
```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

4. 使用flex布局居中
```css
.wrapper {
  display: flex;
}
.center {
  margin: auto;
}
```

5. flex布局，父元素指定子元素居中。
```css
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### 在浏览器窗口中居中
基于视口的垂直居中。不要求原生有固定的宽高，但是这种居中是在整个页面窗口内居中，不是基于父元素
```css
.center{
  margin: 50vh auto;
  transform: translateY(-50%);
}
```


### display 有哪些值？说明他们的作用

- block 像块类型元素一样显示。
- none  此元素将显示为块级元素，此元素前后会带有换行符。
- inline  内联元素，元素前后没有换行符。
- inline-block 象行内元素一样定位，但其内容象块类型元素一样显示。
- list-item 象块类型元素一样显示，并添加样式列表标记。
- table 此元素会作为块级表格来显示
- inherit 规定应该从父元素继承 display 属性的值



### position 有哪些值？ relative 和 absolute 定位原点是？

- absolute 生成绝对定位的元素，相对于值不为 static 的第一个父元素进行定位。
- fixed （老 IE 不支持） 生成绝对定位的元素，相对于浏览器窗口进行定位。
- relative 生成相对定位的元素，相对于其正常位置进行定位。
- static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right - z-index 声明）。
- inherit 规定从父元素继承 position 属性的值



### CSS3 有哪些新特性？

- 新增选择器 p:nth-child(n){color: rgba(255, 0, 0, 0.75)}
- 弹性盒模型 display: flex;
- 多列布局 column-count: 5;
- 媒体查询 @media (max-width: 480px) {.box: {column-count: 1;}}
- 个性化字体 @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}
- 颜色透明度 color: rgba(255, 0, 0, 0.75);
- 圆角 border-radius: 5px;
- 渐变 background:linear-gradient(red, green, blue);
- 阴影 box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);
- 倒影 box-reflect: below 2px;
- 文字装饰 text-stroke-color: red;
- 文字溢出 text-overflow:ellipsis;
- 背景效果 background-size: 100px 100px;
- 边框效果 border-image:url(bt_blue.png) 0 10;
- 平滑过渡 transition: all .3s ease-in .1s;
- 动画 @keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;
- 变形 transform
  - 旋转 transform: rotate(20deg);
  - 倾斜 transform: skew(150deg, -10deg);
  - 位移 transform: translate(20px, 20px);
  - 缩放 transform: scale(.5);



### 如何水平居中一个元素？

如果需要居中的元素为inline或inline-block，为父元素设置 `text-align: center;`即可实现

如果要居中的元素为一个块级元素的话，一般使用 `margin: 0 auto;` 进行居中。



### 用纯 CSS 创建一个三角形的原理是什么？

把border的其他三条边设为透明
注意，这里要把 `border-width` 、`border-style`、 `border-color` 分开写。
```css
.tri {
  width: 0px;
  height: 0;
  border-style: solid;
  border-width: 100px;
  border-color: transparent transparent red transparent;
}
```


### 圣杯布局
要求：三列布局；中间宽度自适应，两边内容定宽。

好处：重要的内容放在文档流前面可以优先渲染

原理：利用相对定位、浮动、负边距布局，而不添加额外标签

实现方式：

main部分首先要放在container的最前部分。然后是left,right

1.将三者都 float:left , 再加上一个position:relative (因为相对定位后面会用到）

2.main部分 width:100%占满

3.此时main占满了，所以要把left拉到最左边，使用margin-left:-100%

4.这时left拉回来了，但会覆盖main内容的左端，要把main内容拉出来，所以在外围container加上 padding:0 220px 0 200px

5.main内容拉回来了，但left也跟着过来了，所以要还原，就对left使用相对定位 left:-200px  同理，right也要相对定位还原 right:-220px

6.到这里大概就自适应好了。如果想container高度保持一致可以给left main right都加上min-height:130px



### 双飞翼布局
原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位。

左翅left有200px,右翅right..220px.. 身体main自适应未知

1.html代码中，main要放最前边，left  right

2.将main  left  right 都float:left

3.将main占满 width:100%

4.此时main占满了，所以要把left拉到最左边，使用margin-left:-100%  同理 right使用margin-left:-220px

（这时可以直接继续上边圣杯布局的步骤，也可以有所改动）

5.main内容被覆盖了吧，除了使用外围的padding，还可以考虑使用margin。

给main增加一个内层div-- main-inner, 然后margin:0 220px 0 200px



### li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？(也称幽灵字符)

行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符, 这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为 0，就没有空格了



### display:inline-block 什么时候会显示间隙？(携程)

- 相邻的 inline-block 元素之间有换行或空格分隔的情况下会产生间距
- 非 inline-block 水平元素设置为 inline-block 也会有水平间距
- 可以借助 vertical-align:top; 消除垂直间隙
- 可以在父级加 font-size：0; 在子元素里设置需要的字体大小，消除垂直间隙
- 把 li 标签写到同一行可以消除垂直间隙，但代码可读性差



### 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？

- 响应式设计就是网站能够兼容多个不同大小的终端，而不是为每个终端做一个特定的版本
- 基本原理是利用 CSS3 媒体查询，为不同尺寸的设备适配不同样式
- 对于低版本的 IE，可采用 JS 获取屏幕宽度，然后通过监听window.onresize 方法来实现兼容



### css 定义的权重
 - !important 优先级最高，但也会被权重高的important所覆盖
 - 行内样式总会覆盖外部样式表的任何样式(除了!important)
 - 单独使用一个选择器的时候，不能跨等级使css规则生效
 - 如果两个权重不同的选择器作用在同一元素上，权重值高的css规则生效
 - 如果两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则.
 - 权重相同时，与元素距离近的选择器生


一句话总结：
!important > 行内样式 > ID选择器 > (类选择器 | 属性选择器 | 伪类选择器 )> 元素选择器
![大鱼吃小鱼](http://image.zhangxinxu.com/image/blog/201208/specifishity1-1.png)



### 谈谈浮动和清除浮动
浮动的框可以向左或向右移动，**直到他的外边缘碰到包含框或另一个浮动框的边框为止**。 **浮动框脱离文档流**，所以文档的普通流的块框表现得就像浮动框不存在一样。浮动的块框会漂浮在文档普通流的块框上。

清除方法：
1. 父级 div 定义伪类：after 和 zoom (推荐使用，建议定义公共类，以减少 CSS 代码)

```css
   .clearfloat:after{
       display:block;
       clear:both;
       content:"";
       visibility:hidden;
       height:0}

   .clearfloat{zoom:1}
```

2. 在结尾处添加空 div 标签 clear:both
```html
<div class="parent">
    <div class="left">Left</div>
    <div class="right">Right</div>
    <div class="clearfloat"></div>
</div>

<style>
    .left {float:left}
    .clearfloat{clear:both}
</style>
```
父级 div 定义 overflow:auto。 同时需要父级指定宽度

参考链接[几种常用的清除浮动方法](https://www.cnblogs.com/nxl0908/p/7245460.html)



### box-sizing 常用的属性有哪些？分别有什么作用？

- box-sizing: content-box; // 默认的标准(W3C)盒模型元素效果
- box-sizing: border-box; // 触发怪异(IE)盒模型元素的效果
- box-sizing: inherit; // 继承父元素 box-sizing 属性的值



### 请列举几种隐藏元素的方法

- visibility: hidden; 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- opacity: 0; CSS3 属性，设置 0 可以使一个元素完全透明
- position: absolute; 设置一个很大的 left 负值定位，使元素定位在可见区域之外
- display: none; 元素会变得不可见，并且不会再占用文档的空间。
- transform: scale(0); 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- \<div hidden="hidden"\> HTML5 属性,效果和 display:none;相同，但这个属性用于记录一个元素的状态
- height: 0; 将元素高度设为 0 ，并消除边框
- filter: blur(0); CSS3 属性，将一个元素的模糊度设置为 0



### rgba() 和 opacity 的透明效果有什么不同？

- opacity 作用于元素以及元素内的所有内容（包括文字）的透明度
- rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果



### css 属性 content 有什么作用？

content 属性专门应用在 before/after 伪元素上，用于插入额外内容或样式



### 为什么要初始化 CSS 样式？

- 不同浏览器对有些标签样式的默认值解析不同
- 不初始化 CSS 会造成各现浏览器之间的页面显示差异
- 可以使用 reset.css 或 Normalize.css 做 CSS 初始化



### Normalize.css 理解
Normalize.css 是一种现代的，为 HTML5 准备的优质替代方案。
创造 normalize.css 有下几个目的：

- 保护有用的浏览器默认样式而不是完全去掉它们
- 一般化的样式：为大部分 HTML 元素提供
- 修复浏览器自身的 bug 并保证各浏览器的一致性
- 优化 CSS 可用性：用一些小技巧
- 解释代码：用注释和详细的文档来

参考：[谈一谈 Normalize.css](https://www.jianshu.com/p/9d7ff89757fd)




### 什么是 FOUC(Flash of Unstyled Content)？ 如何来避免 FOUC？

- 当使用 @import 导入 CSS 时，会导致某些页面在 IE 出现奇怪的现象： 没有样式的页面内容显示瞬间闪烁，这种现象称为“文档样式短暂失效”，简称为 FOUC
- 产生原因：当样式表晚于结构性 html 加载时，加载到此样式表时，页面将停止之前的渲染。
- 等待此样式表被下载和解析后，再重新渲染页面，期间导致短暂的花屏现象。
- 解决方法：使用 link 标签将样式表放在文档 head



### 介绍使用过的 CSS 预处理器
CSS 预处理器基本思想：
    为 CSS 增加了一些编程的特性（变量、逻辑判断、函数等）

行 Web 页面样式设计，再编译成正常的 CSS 文件使用.

[sass](https://www.sass.hk/guide/), [less](http://lesscss.cn), [stylus](http://stylus-lang.com/)


 - 变量 (定义主题色)
 - 函数  (计算值)
 - 混合器 （代码段的复用）
 - 父级选择器 



### 浏览器是怎样解析 CSS 选择器的？

浏览器解析 CSS 选择器的方式是从右到左
[浏览器解析css选择器的规则](https://blog.csdn.net/qq_21397815/article/details/72874932)



### 元素竖向的百分比设定是相对于容器的高度吗？

元素竖向的百分比设定是相对于容器的宽度，而不是高度



### margin 和 padding 分别适合什么场景使用？

- 需要在 border 外侧添加空白，且空白处不需要背景（色）时，使用 margin
- 需要在 border 内测添加空白，且空白处需要背景（色）时，使用 padding



### 抽离样式模块怎么写，说出思路？

CSS 可以拆分成 2 部分：公共 CSS 和 业务 CSS：

- 网站的配色，字体，交互提取出为公共 CSS。这部分 CSS 命名不应涉及具体的业务
- 对于业务 CSS，需要有统一的命名，使用公用的前缀。可以参考面向对象的 CSS



### 什么是视差滚动效果，如何给每页做不同的动画？

- 视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，具有非常出色的视觉体验
- 一般把网页解剖为：背景层、内容层和悬浮层。当滚动鼠标滚轮时，各图层以不同速度移动，形成视差的

实现原理

- 以 “页面滚动条” 作为 “视差动画进度条”
- 以 “滚轮刻度” 当作 “动画帧度” 去播放动画的
- 监听 mousewheel 事件，事件被触发即播放动画，实现“翻页”效果



### a 标签上四个伪类的使用顺序是怎么样的？

link > visited > hover > active
简称 lvha(love-ha)

伪类的特殊性（应用优先级）是同样的，所以后出现的伪类会覆盖先出现的伪类（同时激活） 

在这里，比如把hover放在active后面，那么实际你在激活（active）链接的时候就触发了hover伪类，hover在后面覆盖了active的颜色，所以始终无法看到active的颜色 



### 伪元素和伪类的区别和作用？

伪元素:在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：

```css
p::before {content:"第一章：";}
p::after {content:"Hot!";}
p::first-line {background:red;}
p::first-letter {font-size:30px;}
```

伪类: 将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover {color: #FF00FF}
p:first-child {color: red}
```



### ::before 和 :after 中双冒号和单冒号有什么区别？

- 在 CSS 中伪类一直用 : 表示，如 :hover, :active 等
- 伪元素在 CSS1 中已存在，当时语法是用 : 表示，如 :before 和 :after
- 后来在 CSS3 中修订，伪元素用 :: 表示，如 ::before 和 ::after，以此区分伪元素和伪类
- 由于低版本 IE 对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老语法表示伪元素
- 综上所述：::before 是 CSS3 中写伪元素的新语法； :after 是 CSS1 中存在的、兼容 IE 的老语法



### 一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

- 方案 1： .sub { height: calc(100%-100px); }
- 方案 2： .container { position:relative; } .sub { position: absolute; top: 100px; bottom: 0; }
- 方案 3： .container { display:flex; flex-direction:column; } .sub { flex:1; }



### 你对 line-height 是如何理解的？

- line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中
- line-height 和 height 都能撑开一个高度，height 会触发 haslayout（一个低版本IE的东西），而 line-height 不会



### line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 \* 18 = 27px
- 百分比：将计算后的值传递给后代



### 设置元素浮动后，该元素的 display 值会如何变化？

设置元素浮动后，该元素的 display 值自动变成 block



### 请解释 CSS sprites，以及你要如何在页面或网站中实现它

- CSS Sprites 其实就是把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position 可以用数字能精确的定位出背景图片的位置。
- CSS Sprites 为一些大型的网站节约了带宽，让提高了用户的加载速度和用户体验，不需要加载更多的图片。



### 如果设计中使用了非标准的字体，你该如何去实现？

- 用图片代替
- web fonts 在线字库
- @font-face

参考链接：[如果设计中使用了非标准的字体，你该如何去实现？](https://blog.csdn.net/xujie_0311/article/details/42368371)



### 请问为何要使用 transform 而非 absolute positioning，或反之的理由？为什么？

- 使用 transform 或 position 实现动画效果时是有很大差别。
- 使用 transform 时，可以让 GPU 参与运算，动画的 FPS 更高。
- 使用 position 时，最小的动画变化的单位是 1px，而使用 transform 参与时，可以做到更小（动画效果更加平滑）
- 功能都一样。但是 translate 不会引起浏览器的重绘和重排，这就相当 nice 了。

反之

- tranform 改变 fixed 子元素的定位对象
- transform 改变元素层叠顺序
  [transform 的副作用](http://imweb.io/topic/5a23e1f1a192c3b460fce26e)



### 怎么让 Chrome 支持小于 12px 的文字？

```css
  .shrink{
    -webkit-transform:scale(0.8);
    -o-transform:scale(1);
    display:inline-block;
  }
```








### font-style 属性 oblique 是什么意思？

font-style: oblique; 使没有 italic 属性的文字实现倾斜



### 如果需要手动写动画，你认为最小时间间隔是多久？

16.7ms



### 如何修改 Chrome 记住密码后自动填充表单的黄色背景？

- 产生原因：由于 Chrome 默认会给自动填充的 input 表单加上 input:-webkit-autofill 私有属性造成的
- 解决方案 1：在 form 标签上直接关闭了表单的自动填充：autocomplete="off"
- 解决方案 2：input:-webkit-autofill { background-color: transparent; }

input [type=search] 搜索框右侧小图标如何美化？

```css
input[type="search"]::-webkit-search-cancel-button{
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  background:url("images/searchicon.png") no-repeat 0 0;
  background-size: 15px 15px;
}
```



### 网站图片文件，如何点击下载？而非点击预览？

```html
<a href="logo.jpg" download>下载</a> <a href="logo.jpg" download="网站LOGO" >下载</a>
```



### iOS safari 如何阻止“橡皮筋效果”？

```js
  $(document).ready(function(){
      var stopScrolling = function(event) {
          event.preventDefault();
      }
      document.addEventListener('touchstart', stopScrolling, false);
      document.addEventListener('touchmove', stopScrolling, false);
  });
```



### 如何优化网页的打印样式

```html
<link rel="stylesheet" type="text/css" media="screen" href="xxx.css" />

其中 media 指定的属性就是设备，显示器上就是 screen，打印机则是 print，电视是 tv，投影仪是 projection。

```html
 <link rel="stylesheet" type="text/css" media="print" href="yy
```
但打印样式表也应有些注意事项：

- 打印样式表中最好不要用背景图片，因为打印机不能打印 CSS 中的背景。如要显示图片，请使用 html 插入到页面中。
- 最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用 pt 和 cm。
- 隐藏掉不必要的内容。（@print div{display:none;}）
- 打印样式表中最好少用浮动属性，因为它们会消失。