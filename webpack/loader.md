# Loader

当打包到非JS文件的时候，webpack会在`module`中配置里查找，然后根据`rules`中的`test`选择一个loader来处理。

### 打包图片
当发现是图片，使用 file-loader来打包
file-loader做的事：
 - 将图片移到dist目录下
 - 给图片改个名字
 - 将名字返回给引入模块的变量中

```js
module: {
    rules: [{
        test: /\.jpg$/,
        use: {
            loader: 'file-loader'
        }
    }]
},
```