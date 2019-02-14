# CSS动画
 - 位置 - 平移
 - 方向 - 旋转
 - 大小 - 缩放
 - 透明度
 - 其他 - 线形变换


## transition 过渡动画
用来控制过渡的时间，使用过渡的属性，过渡效果曲线，过渡的延时

要求元素的状态必须有变化，即某CSS值变化时发生的动画

 - transition-property   
   - 规定设置过渡效果的 CSS 属性的名称。
 - transition-duration   
   - 规定完成过渡效果需要多少秒或毫秒。
 - transition-timing-function  	
   - 规定速度效果的速度曲线。
 - transition-delay      
   - 定义过渡效果何时开始


在chrome的调试窗口按下esc在下面出现一个框框，选择 animation就可以看到动画面板了
```css
div
{
  width:100px;
  height:100px;
  background:blue;
  transition:width 2s, background 1s;
}
div:hover
{
  background:orange;
  width:300px;
}
```

### transition-timing-function
 - ease  慢速开始，然后变快，然后慢速结束
 - ease-in 慢速开始
 - ease-out 慢结束
 - ease-in-out 
 - linear
 - cubic-bezier(a,b,c,d)

bezier曲线在线效果网址 [cubic-bezier.com](http://cubic-bezier.com)



## animation 关键帧动画
相当于多个补间动画组合到一起

与transition不同的是，他可以让元素自己动，而不要求某值的改变来触发动画

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
#one{
  width: 50px;
  height: 50px;
  background-color: orange;
  animation: run;
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
@keyframes run {
  0%{
    width: 100px;
  }
  50%{
    width: 400px;
    background-color: blue;
  }
  100% {
    width: 800px;
  }
}
```