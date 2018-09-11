const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pages = utils.getEntries('./src/pages/**/*.html');

const webpackConfig = merge(baseWebpackConfig, {
	module : {
		rules: utils.styleLoaders({
			sourceMap : false,
			extract   : true,
			usePostCSS: true
		})
	},
	devtool: config.build.productionSourceMap ? config.build.devtool : false,
	output : {
		path         : config.build.assetsRoot,
		filename     : `js/[name].js?v=${utils.getVersion()}`,
		chunkFilename: `js/[name].js?v=${utils.getVersion()}`
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			},
		}),

		// 打包前先把原来的文件清除
		new CleanWebpackPlugin('dist/', {
			root   : path.resolve(__dirname, '..'),
			verbose: true
		}),

		// js 压缩
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap    : config.build.productionSourceMap,
			parallel     : true
		}),

		// 提取 css 文件
		new ExtractTextPlugin({
			filename : `css/[name].css?v=${utils.getVersion()}`,
			allChunks: true,
		}),

		// 压缩 css
		new OptimizeCSSPlugin({
			assetNameRegExp    : /\.css|\.less|\.postcss$/g,
			cssProcessorOptions: {
				safe           : true,
				discardComments: {removeAll: true}
			}
		}),

		// vendor 模块不变时，module.id 也不变
		new webpack.HashedModuleIdsPlugin(),
		// 范围提升
		new webpack.optimize.ModuleConcatenationPlugin(),

		new webpack.optimize.CommonsChunkPlugin({
			name     : ['components'],
			minChunks: 2
		}),

		// 提取公共代码
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module) {
				return (
					module.resource &&
					/\.js|\.css$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
					||
					module.resource && /global\.less$/.test(module.resource)
					||
					module.resource && /utils\.js$/.test(module.resource)
				)
			}
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name  : 'manifest',
			chunks: ['vendor']
		}),

		// 复制静态资源
		new CopyWebpackPlugin([
			{
				from  : path.resolve(__dirname, '../static'),
				to    : config.build.assetsSubDirectory,
				ignore: ['.*']
			}
		])
	]
});

for (let page in pages) {
	if (pages.hasOwnProperty(page)) {
		let conf = {
			filename      : page + '.html',
			template      : pages[page],
			inject        : true,
			minify        : {
				removeComments       : true,
				collapseWhitespace   : true,
				removeAttributeQuotes: true
			},
			excludeChunks : Object.keys(pages).filter(item => item !== page),
			chunksSortMode: 'dependency'
		};
		webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
	}

}

module.exports = webpackConfig;
