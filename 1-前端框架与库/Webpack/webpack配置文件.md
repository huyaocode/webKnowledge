## webpack 配置文件

### webpack.config.js

webpack.config.js 是 webpack 的默认打包配置文件。也可以`npx webpack --config 配置文件名`手动设置

```js
/**
 * Wepack配置接口
 */
const path = require("path");

module.exports = {
  // 打包模式
  mode: "production",
  // 入口
  entry: "./index.js",
  // 出口
  output: {
    filename: "bundle.js",
    // path 后必须是一个绝对位置
    path: path.resolve(__dirname, "bundle"),
  },
};
```

其中`entry: "./index.js"`是一个简写，

```
entry: {
    main: "./index.js"
}
```

### mode

打包模式，有生产环境与发布环境两种，默认是发布环境。

- production
  - 代码被压缩为一行
- development
  - 代码不被压缩

当没有显示制定时会输出下面内容：

> WARNING in configuration
>
> The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
> You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

### 多入口

最后都会讲其写入到 html 的 script 标签中

```js
entry:{
    main: 'a/index.js',
    sub: 'b/main.js'
}
// 多个入口是不可打包为同一个JS的，
output: {
    filename: '[name].js'
}
```

### 为打包出的 JS 加前缀

比如静态资源都放在 CDN 上，那么希望打包出 srcipt 的 src 是一个 http 地址
可这样做：

```
output: {
    publicPath: 'http://cdn.cn'
    filename: '[name].js'
}
```

### devtool

devtool 就是去配置 sourcemap，方便调试，能准确定位到代码错误

- cheap
  - 定位到行，不定位到列（提示性能）
- module
  - 把依赖模块中的代码一并做映射
- eval
  - 使用 eval 形式做 sourcemap 映射
- inline
  - 行内的映射关系

最好的配置：

```js
// 开发时
devtool: 'cheap-module-eval-source-map',
// 线上环境：
devtool: 'cheap-module-source-map'
```
