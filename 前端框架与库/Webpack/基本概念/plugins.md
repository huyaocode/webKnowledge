# plugins

使用`plugins`让打包变的便捷，可以在 webpack 打包的某时刻帮做一些事情，他很像一个生命周期函数

### html-webpack-plugin

html-webpack-plugin 会在打包结束后，自动生成一个 html 文件,并把打包生成的 js 自动引入到 HTML 中。
可以给这个 html 制定一个模板

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 插件
plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    })
],
```

### [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

帮助打包时先清空 dist 目录
