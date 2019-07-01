### webpack简介

随着前端项目复杂性不断提高，JS的代码量变的越来越大，必须做拆分。但如果仅是拆成几个 js 文件，然后在用`script`标签去引入这些文件又会使导致以下几个问题：
 - 影响加载速度
   - JS文件变多，加载JS文件数量过多导致页面加载速度编码
 - 代码的引入次序
   - 使用script标签引入JS时还必须控制JS的顺序。在单个JS文件编写的时候，如果要使用其他的JS文件中的一些变量和函数，不能直观的知道这个变量或函数是在哪个文件定义的。
 - 命名空间污染
   - JS虽然拆开了，但实际上在浏览器运行时就像把所有文件都何在一起了一样

模块化可以解决上面的问题，但是模块化后的代码是使用`import`或`export`这样的写法来实现的，浏览器不能识别，所以需要一个打包工具。

`webpack`是一个前端模块化打包工具，最开始它只能打包JS文件，但是随着webpack的发展，他还能打包如CSS、图片等文件。主要由入口，出口，loader，plugins四个部分。

### 模块化

 - [What is webpack moudule](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)
 - [Supported Module Types](https://webpack.js.org/concepts/modules/#supported-module-types)
 - [Module Methods](https://webpack.js.org/api/module-methods/)
 - [Module Variables](https://webpack.js.org/api/module-variables/)


### 安装 webpack
在项目中安装
```
npm install webpack webpack-cli --save-dev
```
是否全局安装？

如果电脑上有两个项目，一个 webpack3 打包，一个 webpack4 打包。安装后可能导致你webpack3的项目无法打包，所以一般都是项目内安装。

### npx
项目内安装webpack后，直接在终端输入`webpack -v`是不可以的，但是使用`npx webpack -v`就可以。
```
$ webpack -v
> bash: webpack: command not found
$ npx webpack -v
> 4.35.0
```
这是因为`npx`这个命令可以帮助我们在当前项目的`node_modules`中查找对应的包。

### 安装制定版本webpack
`npm install webpack@4.16.5 -D` 在包名后加‘@’再加版本号
查看某包信息，可以运行 `npm info webpack`

### [package-lock.json](./package-lock.json.md)