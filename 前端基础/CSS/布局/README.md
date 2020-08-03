# 布局

## Flex 布局

[Flex - 阮一峰 （语法篇）](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[Flex - 阮一峰 （实战篇）](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## grid 网格布局

[grid 网格布局](https://www.imooc.com/article/28513)

## 三栏布局

假设高度已知，请写出三栏布局，其中左右栏宽 300px,中间自适应

### 圣杯布局

要求：三列布局；中间宽度自适应，两边内容定宽。

好处：重要的内容放在文档流前面可以优先渲染

原理：利用相对定位、浮动、负边距布局，而不添加额外标签

实现方式：

main 部分首先要放在 container 的最前部分。然后是 left,right

1.将三者都 float:left , 再加上一个 position:relative (因为相对定位后面会用到）

2.main 部分 width:100%占满

3.此时 main 占满了，所以要把 left 拉到最左边，使用 margin-left:-100%

4.这时 left 拉回来了，但会覆盖 main 内容的左端，要把 main 内容拉出来，所以在外围 container 加上 padding:0 220px 0 200px

5.main 内容拉回来了，right 也跟着过来了，所以要还原，就对 left 使用相对定位 left:-200px 同理，right 也要相对定位还原 right:-220px

6.到这里大概就自适应好了。如果想 container 高度保持一致可以给 left main right 都加上 min-height:130px

### 双飞翼布局

原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位。

左翅 left 有 200px,右翅 right..220px.. 身体 main 自适应未知

1.html 代码中，main 要放最前边，left right

2.将 main left right 都 float:left

3.将 main 占满 width:100%

4.此时 main 占满了，所以要把 left 拉到最左边，使用 margin-left:-100% 同理 right 使用 margin-left:-220px

（这时可以直接继续上边圣杯布局的步骤，也可以有所改动）

5.main 内容被覆盖了吧，除了使用外围的 padding，还可以考虑使用 margin。

给 main 增加一个内层 div-- main-inner, 然后 margin:0 220px 0 200px

### 响应式设计和布局

在不同设备上正常使用，一般主要处理屏幕大小问题

- 隐藏 + 折行 + 自适应空间
- rem 做单位
- viewport
  - width=divice-width,
- 媒体查询
