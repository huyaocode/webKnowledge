# CSS 动画

- 位置 - 平移
- 方向 - 旋转
- 大小 - 缩放
- 透明度
- 其他 - 线形变换

### 前端动画怎么做

- animation 过渡动画
- transition 过渡动画
- JS 原生控制 DOM 位置
- canvas 绘制动画

### transition 过渡动画

用来控制过渡的时间，使用过渡的属性，过渡效果曲线，过渡的延时

要求元素的状态必须有变化，即某 CSS 值变化时发生的动画

- transition-property
  - 规定设置过渡效果的 CSS 属性的名称。
- transition-duration
  - 规定完成过渡效果需要多少秒或毫秒。
- transition-timing-function
  - 规定速度效果的速度曲线。
- transition-delay
  - 定义过渡效果何时开始

在 chrome 的调试窗口按下 esc 在下面出现一个框框，选择 animation 就可以看到动画面板了

```css
div {
  width: 100px;
  height: 100px;
  background: blue;
  transition: width 2s, background 1s;
}
div:hover {
  background: orange;
  width: 300px;
}
```

### transition-timing-function

- ease 慢速开始，然后变快，然后慢速结束
- ease-in 慢速开始
- ease-out 慢结束
- ease-in-out
- linear
- cubic-bezier(a,b,c,d)

bezier 曲线在线效果网址 [cubic-bezier.com](http://cubic-bezier.com)

### animation 关键帧动画

相当于多个补间动画组合到一起

与 transition 不同的是，他可以让元素自己动，而不要求某值的改变来触发动画

`animation: name duration timing-function delay iteration-count direction;`

- animation-name
  - 规定需要绑定到选择器的 keyframe 名称。
- animation-duration
  - 规定完成动画所花费的时间，以秒或毫秒计
- animation-timing-function
  - 动画的速度曲线
- animation-delay
  - 动画开始之前的延迟
- animation-iteration-count
  - n | infinit
  - 动画应该播放的次数
- animation-direction
  - normal | alternate
  - 是否应该轮流反向播放动画
- animation-play-state
  - 可用于暂停动画
- animation-fill-mode
  - forwards 动画停了就保持最后的那个状态
  - backwards 动画停了还得反着做一遍回去
  - 在动画执行之前和之后如何给动画的目标应用样式。

```css
#one {
  width: 50px;
  height: 50px;
  background-color: orange;
  animation: run;
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
@keyframes run {
  0% {
    width: 100px;
  }
  50% {
    width: 400px;
    background-color: blue;
  }
  100% {
    width: 800px;
  }
}
```

### 逐帧动画

关键帧之间是有补间的，会选一个效果过渡过去，而逐帧动画则是每个 keyframe 之间没有过渡，直接切换过去
参考[猎豹奔跑](./animal.html)
关键是使用下面这行 CSS
`animation-timing-function: steps(1);`
这个 step 是指定关键帧之间需要有几个画面

### 过渡动画和关键帧动画的区别

- 过渡动画需要有状态变化
- 关键帧动画不需要状态变化
- 关键帧动画能控制更精细

### CSS 动画的性能

- CSS 动画不差
- 部分情况下优于 JS
- JS 可以做到更精细
- 含高危属性，会让性能变差 (如 box-shadow)

### display 属性

当改变元素 display 属性时，过渡属性 transition 失效。

原因：
display:none 的时候，页面文档流中将不会存在该元素。transition 无法对一个从有到无的元素产生过渡效果。

解决方法：

1. 改变元素的宽/高为 0px,达到隐藏的目的。
2. 使用 visibility 替代 display。
3. react 使用 react-transition-group 实现
