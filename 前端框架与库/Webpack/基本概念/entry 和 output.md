# entry 和 output

## 入口(entry)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

entry 可以传入一个字符串或者一个字符串数组.

向 entry 属性传入文件路径数组，将创建出一个 多主入口(multi-main entry)。在你想要一次注入多个依赖文件，并且将它们的依赖导向(graph)到一个 chunk 时，这种方式就很有用。

- [入口和上下文(entry and context)](https://webpack.docschina.org/configuration/entry-context/)

多入口

- [webpack 多入口文件页面打包配置](https://juejin.im/post/6844903545922158599)

## 出口(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。

详细配置： https://webpack.docschina.org/configuration/output/

- [filename](https://webpack.docschina.org/configuration/output/#outputfilename)
