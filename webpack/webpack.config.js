const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动创建一个html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 给dev生成的dist目录，定时的清除，因为每次使用webpack构建会生成一个隐藏的目录看不到其实会存在
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin') // 抽离单独css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css文件

const config = {
	target:"web",
	entry:{
		app: [path.join(__dirname,'app/js/main.js'), path.join(__dirname,'app/js/viewport.js')]
	},
	output:{
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname,'dist')
	},
	plugins: [
	    new HtmlWebpackPlugin({
            template: './app/views/index.html'
        }),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
    ],
	module:{
		rules:[
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test:/\.(jpg|jpeg|gif|png|svg)$/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:1024,
							name:'[name].[ext]'
						}
					}
				]
			}
		]
	}
};

if (isDev) { // 开发环境
	config.module.rules.push(
		{
			test: /\.scss$/,
			use: [
				{
					loader:'vue-style-loader',
				},
				{
					loader:'css-loader',
					options:{
						minimize: true
					}
				},
				{
					loader:'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'px2rem-loader',
					// options here
					options: {
						remUni: 75,
						remPrecision: 8
					}
				},
				{
					loader:'sass-loader'
				}
			]
		}
	)
	config.devtool = '#cheap-module-eval-source-map'
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: { // 错误显示在页面上
			errors: true
		},
		hot:true
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
} else {
	config.entry = {
		app: [path.join(__dirname,'app/js/main.js'), path.join(__dirname,'app/js/viewport.js')],
		vendor: ['vue']
	},
	config.output.filename = '[name].[chunkhash:8].js' // chunkhash生产dist目录下的文件每一个都有一个新的hash，contenthash会导致dist目录下公用一个hash
	config.module.rules.push(
		{
			test: /\.scss$/,
			use: ExtractPlugin.extract(
			{
				fallback: 'vue-style-loader',
				use: [
				{
					loader:'css-loader'
				},
				{
					loader:'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'px2rem-loader',
					// options here
					options: {
						remUni: 75,
						remPrecision: 8
					}
				},
				{
					loader:'sass-loader'
				}
				]
			}
			)
		}
	)
	config.plugins.push(
		// 因为webpack 4.3包含了contenthash的关键字，所以在ExtractPlugin中无法使用
		// 需要使用md5:contenthash:hex:8
		new ExtractPlugin('style.[md5:contenthash:hex:8].css')
	)
	config.optimization = {
		splitChunks: {
			chunks: 'all'
		},
		runtimeChunk: true,
		minimizer: [
			new OptimizeCSSAssetsPlugin()
		]
	}
}

module.exports = config