//基于nodejs 默认采用common.js
const { resolve } = require('path');
//const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');//访问内部插件

module.exports = {
    //配置webpack
    entry: './src/index.js',//入口文件
    output: {
        filename: 'bundle.js',//输出文件js
        path: resolve(__dirname,'dist')
    },
    //loader翻译
    module: {
        //详细的loader配置
        rules: [
            {
                test: /\.css$/,//匹配规则
                //使用那些loader
                use:[
                    'style-loader',//创建style标签，将js文件中样式插入，在header中生效
                    'css-loader',//将css文件转为commonjs加载到js中，里面为样式字符串
                ]
            },{
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']//less-loader,将less转化为css
            },{
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']//sass-loader将scss文件转化为css文件
                
            },
            //匹配图片资源
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',//需要安装file-loader
                options: {
                    //8kb下的图片转化为base64,减少请求次数文件体积会变大
                    limit: 8*1024,
                    name: "['hash:10'].['etx']"
                }
            },
            //解析html中图片,<img>标签引入
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                //排除其他资源
                exclude: /\.(html|js|css|less)/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),//指定位置插入一个html文件
    ],

    mode: 'development',//production
    devServer: {
        contentBase: resolve(__dirname,'build'),
        compress: true,
        port: 3000,
        open: true
    }
}