# plugins
使用`plugins`让打包变的便捷，可以在webpack打包的某时刻帮做一些事情，他很像一个生命周期函数

### html-webpack-plugin

html-webpack-plugin 会在打包结束后，自动生成一个html文件,并把打包生成的js自动引入到HTML中。
可以给这个html制定一个模板
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
帮助打包时先清空dist目录
