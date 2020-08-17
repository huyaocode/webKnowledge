# Flex 布局

## `flex: 1 0 auto`是什么？

三个参数分别对应的是 `flex-grow`, `flex-shrink` 和 `flex-basis`，默认值为 `0 1 auto`。

即： `flex: 1 0 auto`指尽可能放大元素且默认宽度之和大于容器时也不收缩

效果参考： https://codepen.io/welovewebdesign/pen/gKnBC

## 属性

### flex-grow

flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大

### flex-shrink

flex-shrink 属性指定了 flex 元素的缩小比例，默认为 1。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

### flex-basis

flex-basis 给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小
