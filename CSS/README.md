# CSS

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

main部分首先要放在container的最前部分。然后是left,right

1.将三者都 float:left , 再加上一个position:relative (因为相对定位后面会用到）

2.main部分 width:100%占满

3.此时main占满了，所以要把left拉到最左边，使用margin-left:-100%

4.这时left拉回来了，但会覆盖main内容的左端，要把main内容拉出来，所以在外围container加上 padding:0 220px 0 200px

5.main内容拉回来了，但left也跟着过来了，所以要还原，就对left使用相对定位 left:-200px  同理，right也要相对定位还原 right:-220px

6.到这里大概就自适应好了。如果想container高度保持一致可以给left main right都加上min-height:130px



### 双飞翼布局
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



### css 定义的权重
 - !important 优先级最高，但也会被权重高的important所覆盖
 - 行内样式总会覆盖外部样式表的任何样式(除了!important)
 - 单独使用一个选择器的时候，不能跨等级使css规则生效
 - 如果两个权重不同的选择器作用在同一元素上，权重值高的css规则生效
 - 如果两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则.
 - 权重相同时，与元素距离近的选择器生
一句话总结：
!important > 行内样式 > ID选择器 > (类选择器 | 属性选择器 | 伪类选择器 )> 元素选择器
https://www.jianshu.com/p/d4fa0db77c5d