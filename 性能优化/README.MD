# 性能优化

## 网络优化

### 合并资源文件，减少HTTP请求
浏览器并发的HTTP请求是由数量限制的（比如桌面浏览器并发请求可能是8个，手机浏览器是6个），如果一下子并发的几十个请求那么会有很多请求会停下来等，等前面的请求好了下一个再进去，这样就延长了整个页面的加载时间


### 压缩资源文件减小请求大小
文件大小越小当然加载速度就越快。
可对代码进行压缩，去掉空格、注释、变量替换，在传输时，使用gzip等压缩方式也可以降低资源文件的大小。

### 利用缓存机制，尽可能使用缓存减少请求
浏览器是有缓存机制的，在返回资源的时候设置一个cache-control设置过期时间，在过期时间内浏览器会默认使用本地缓存。

但缓存机制也存在一定的问题，因为网站开发是阶段性的，隔一段时间会发布一个新的版本。因为HTTP请求是根据url来定位的，如果资源文件名的url没有发生更改那么浏览器还是会使用缓存，这个时候怎么办那？
这时就需要一个缓存更新机制来让修改过的文件具有一个新的名字。
最简单的方法就是在url后加一个时间戳，但是这会导致只要有新的版本发布就会重新获取所有的新资源。
一个现代流行的方法就是根据文件计算一个hash值，这个hash值是根据文件的更新变化而变化的。 当浏览器获取文件时如果这个文件名有更新那么就会请求新的文件。



## webpack优化
主要就是为了减少Webpack打包后的文件体积

### 按需加载
如果我们将这些页面全部打包进一个 JS 文件的话，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了首页能更快地呈现给用户，我们肯定是希望首页能加载的文件体积越小越好，这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件。当然不仅仅路由可以按需加载，对于 loadash 这种大型类库同样可以使用这个功能。



### Tree Shaking
Tree Shaking 可以实现删除项目中未被引用的代码，比如
```js
// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
```
对于以上情况，test 文件中的变量 b 如果没有在项目中使用到的话，就不会被打包到文件中。

如果你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。


### Scope Hoisting
Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。
比如我们希望打包两个文件
```js
// test.js
export const a = 1
// index.js
import { a } from './test.js'
```
对于这种情况，我们打包出来的代码会类似这样
```js
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
  /* 1 */
  function (module, exports, require) {
    //...
  }
]
```
但是如果我们使用 Scope Hoisting 的话，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码
```js
[
  /* 0 */
  function (module, exports, require) {
    //...
  }
]
```
样的打包方式生成的代码明显比之前的少多了。如果在 Webpack4 中你希望开启这个功能，只需要启用 optimization.concatenateModules 就可以了。
```js
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```


## header中meta

兼容性配置，让IE使用最高级的Edge渲染，如果有chrome就使用chrome渲染。
```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
```

如果是双核浏览器，优先使用webkit引擎
```html 
<meta name="render" content="webkit">
```

DNS预解析
DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能 减少用户的等待时间，提升用户体验
```html
<link rel="des-prefetch" href="//static.360buying.com">
```