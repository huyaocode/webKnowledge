# 居中

### 如何竖直居中一个元素

参考代码: [CSS/居中元素/垂直居中](https://github.com/huyaocode/webKnowledge/tree/master/CSS/%E5%B1%85%E4%B8%AD%E5%85%83%E7%B4%A0/%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD)

#### 被居中元素宽高固定

1. 绝对定位，top 和 left 为 50%， margin 的 left 和 top 为自身宽高一半

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -9rem;
  margin-top: -5rem;
}
```

2. 绝对定位，top 和 lefe 为父元素一半剪自身一半

```css
.center {
  position: absolute;
  top: calc(50% - 5em);
  left: calc(50% - 9em);
}
```

#### 被居中元素宽高不定

3. 使用 CSS3 的 `transform`将位置在中心点平移自身宽高一半

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

4. 使用 flex 布局居中

```css
.wrapper {
  display: flex;
}
.center {
  margin: auto;
}
```

5. flex 布局，父元素指定子元素居中。

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
.center {
  margin: 50vh auto;
  transform: translateY(-50%);
}
```
