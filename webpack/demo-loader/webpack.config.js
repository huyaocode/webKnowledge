/**
 * Wepack配置接口
 */
const path = require('path');

module.exports = {
    mode: 'development',
    // 入口
    entry: {
        main: "./src/index.js",
    },
    // 当不知道如何打包一个模块（打包的不是JS的时候），就到这里来
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'file-loader',
                // option 为配置参数
                options: {
                    // 文件名与后缀
                    name: '[name]_[hash].[ext]',
                    // 输出目录
                    outputPath: 'images/'
                }
            }
        }, {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.scss$/,
            // 一种文件多个Loader就使用数组
            use: [
                'style-loader',
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 2,
                        modules: true
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }]
    },
    // 出口
    output: {
        filename: 'bundle.js',
        // path 后必须是一个绝对位置
        path: path.resolve(__dirname, 'dist')
    }
}