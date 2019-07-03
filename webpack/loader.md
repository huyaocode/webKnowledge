# Loader

当打包到非JS文件的时候，webpack会在`module`中配置里查找，然后根据`rules`中的`test`选择一个loader来处理。

## 打包静态资源

### 打包图片

#### file-loader
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

#### 配置项
让图片打包出来的名字与拓展名与原来一样
`'[name].[ext]'` 这种语法叫 `placehoder` 即占位符
```js
rules: [{
    test: /\.jpg$/,
    use: {
        loader: 'file-loader',
        // option 为配置参数
        options: {
            // 图片打包出来的名字和后缀原来的一样
            name: '[name]_[hash].[ext]'
        }
    }
}]
```

#### url-loader
将文件打包为Base64编码，当图片特别小（1~2k）的时候适用。

但是大图片不使用，可以给它加上一个`limit`来限制
```js
rules: [{
    test: /\.(jpg|png|gif)$/,
    use: {
        loader: 'url-loader',
        // option 为配置参数
        options: {
            limit: 2048
        }
    }
}]
```

### 打包样式

```js
{
    test: /\.css$/,
    // 一种文件多个Loader就使用数组
    use: [
        'style-loader', 'css-loader'
    ]
}
```
 - `css-loader` 能帮我们分析出几个CSS文件之间的关系
 - `style-loader` 在得到 css-loader 生成的文件后，style-loader会将这段样式挂在到 header 标签中

#### [使用sass](https://webpack.js.org/loaders/sass-loader/)
loader是**有顺序**的，顺序是：从数组的最后一个依次向前处理。
```js
use: [
    "style-loader", // creates style nodes from JS strings
    "css-loader", // translates CSS into CommonJS
    "sass-loader" // compiles Sass to CSS, using Node Sass by default
]
```

#### [厂商前缀 postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

```js
use: [
    "style-loader", // creates style nodes from JS strings
    "css-loader", // translates CSS into CommonJS
    "postcss-loader" // compiles Sass to CSS, using Node Sass by default
]
```

它可以进行配置，要创建一个`postcss.config.js`文件 
```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

`autoprefixer`这个插件可以帮我们添加厂商前缀


#### importLoaders

在sass文件中又 使用`@import`的方式去引入了其他文件，可能就会导致在打包时直接走 css-loader，而不会去走下面的两个loader

`importLoaders`就是让`@import`方式引入方式的文件也走下面的两个loader

```js
use: [
    "style-loader",
    {
        loader: "css-loader",
        options:{ 
            importLoaders: 2
        } 
    }, 
    "sass-loader",
    "postcss-loader"
]
```
#### CSS modules

css-loader直接将其打包注入到header中，可能造成CSS的干扰。即一个文件中引入了一个CSS，其他地方都会受到影响

解决方法是配置`modules`：
```js
{
    loader: "css-loader",
    options:{ 
        importLoaders: 2,
        modules: true
    } 
},
```
引入样式时使用 `style.className` 方式：
```js
import style form './style.sass'
// 添加样式

const img = new Image();
img.src = girl;

img.classList.add(style.girl)
```

#### 打包字体
打包时如果有字体文件的话打包又会报错，因为不认识字体文件。而对字体文件的打包只需要`file-loader`就可以了
```js
{
    test: /\.(eot|ttf|svg)$/,
    use: {
        loader: 'file-loader'
    }
}
```