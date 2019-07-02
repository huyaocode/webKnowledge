/**
 * Wepack配置接口
 */
const path = require('path');

 module.exports = {
    mode :'development',
    // 入口
    entry:{
        main: "./src/index.js",
    },
    // 当不知道如何打包一个模块（打包的不是JS的时候），就到这里来
    module: {
        rules: [{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    // 出口
    output: {
        filename: 'bundle.js',
        // path 后必须是一个绝对位置
        path: path.resolve(__dirname, 'dist')
    }
}