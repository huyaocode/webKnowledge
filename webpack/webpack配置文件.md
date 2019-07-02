## webpack配置文件

### webpack.config.js

webpack.config.js是webpack的默认打包配置文件。也可以`npx webpack --config 配置文件名`手动设置

```js
/**
 * Wepack配置接口
 */
const path = require('path');

 module.exports = {
    // 打包模式
    mode: "production",
    // 入口
    entry: "./index.js",
    // 出口
    output: {
        filename: 'bundle.js',
        // path 后必须是一个绝对位置
        path: path.resolve(__dirname, 'bundle')
    }
}
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
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
