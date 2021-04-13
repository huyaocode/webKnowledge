### CSS 选择器分类

- 标签选择
- id 选择器
- class 选择器
- 后代选择 （div a）
- 子代选择 （div > p）
- 相邻选择 （div + p）
- 通配符选择 （\*）
- 否定选择器 :not(.link){}
- 属性选择器
- 伪类选择器
- 伪元素选择器 ::before{}

### CSS3 属性选择器

| 选择器              | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| [attribute]         | 用于选取带有指定属性的元素。                                 |
| [attribute=value]   | 用于选取带有指定属性和值的元素。                             |
| [attribute~=value]  | 用于选取属性值中包含指定词汇的元素。                         |
| [attribute\|=value] | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |
| [attribute^=value]  | 匹配属性值以指定值开头的每个元素。                           |
| [attribute$=value]  | 匹配属性值以指定值结尾的每个元素。                           |
| [attribute*=value]  | 匹配属性值中包含指定值的每个元素。                           |

### CSS3 伪类选择器

[伪类 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95)
常用：

- :hover
- :focus
- :after 在元素之前添加内容,也可以用来做清除浮动。
- :before 在元素之后添加内容
- :enabled 选择器匹配每个已启用的元素（大多用在表单元素上）。
- :disabled 控制表单控件的禁用状态。
- :checked 单选框或复选框被选中
- ::selection 用户选中的区域
- :empty 一般用来隐藏内部什么都没有的元素
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

### 伪类和伪元素区别

- 伪类值一种状态 比如:hover
- 伪元素是一个真实存在的元素，他可以有样式有内容

### iconfont 原理

- 利用编码让图标编为一个字符
- 引入字体
- 利用 before 伪元素向页面中插入一个文字

### css 定义的权重

- !important 优先级最高，但也会被权重高的 important 所覆盖
- 行内样式总会覆盖外部样式表的任何样式(除了!important)
- 单独使用一个选择器的时候，不能跨等级使 css 规则生效
- 如果两个权重不同的选择器作用在同一元素上，权重值高的 css 规则生效
- 如果两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则
- 权重相同时，与元素距离近的选择器生

一句话总结：
!important > 行内样式 > ID 选择器 > (类选择器 | 属性选择器 | 伪类选择器 ) > 元素选择器 > \*
![大鱼吃小鱼](http://image.zhangxinxu.com/image/blog/201208/specifishity1-1.png)

### 浏览器解析 CSS

`.wrapper div > p` CSS 中，浏览器查找元素是通过选择权从后往前找的， 这样做的目的是加快 CSS 解析速度，从后往前，排除法

[浏览器解析 css 选择器的规则](https://blog.csdn.net/qq_21397815/article/details/72874932)

### 怎样美化一个 checkbox ?

- 让原本的勾选框隐藏
- `input + label` 背景图没选中
- `input:checked + label` 背景图选中

```css
.checkbox input {
  display: none;
}
.checkbox input + label {
  background: url(./没选中.png) left center no-repeat;
  background-size: 20px 20px;
  padding-left: 20px;
}
.checkbox input:checked + label {
  background-image: url(./选中.png);
}
```

```html
<div class="checkbox">
  <input type="checkbox" id="handsome" />
  <label for="handsome">我很帅</label>
</div>
```
