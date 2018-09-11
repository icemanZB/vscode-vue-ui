const utils = require('./utils');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

let pages = utils.getEntries('./src/pages/**/*.html');

const devWebpackConfig = merge(baseWebpackConfig, {
	module : {
		rules: utils.styleLoaders({sourceMap: false, usePostCSS: true})
	},
	// cheap-module-eval-source-map 在开发环境运行最快
	devtool: config.dev.devtool,

	// devServer 配置
	devServer: {
		clientLogLevel: 'warning',
		hot           : true,
		contentBase   : false, // since we use CopyWebpackPlugin.
		compress      : true,
		host          : HOST || config.dev.host,
		port          : PORT || config.dev.port,
		open          : config.dev.autoOpenBrowser,
		overlay       : config.dev.errorOverlay ? {warnings: false, errors: true} : false,
		publicPath    : config.dev.assetsPublicPath,
		proxy         : config.dev.proxyTable,
		quiet         : true, // 开启需要配合 friendly-errors-webpack-plugin
		watchOptions  : {
			poll: config.dev.poll,
		}
	},
	plugins  : [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR 更新的时候 console 显示正确的名字
		new webpack.NoEmitOnErrorsPlugin(),


		// 复制静态资源
		new CopyWebpackPlugin([
			{
				from  : path.resolve(__dirname, '../static'),
				to    : config.dev.assetsSubDirectory,
				ignore: ['.*']
			}
		])
	]
});

for (let page in pages) {
	if (pages.hasOwnProperty(page)) {
		let conf = {
			filename      : page + '.html',
			template      : pages[ page ],
			inject        : true,
			chunksSortMode: 'dependency',
			excludeChunks : Object.keys(pages).filter(item => item !== page)
		};
		devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
	}

}

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			process.env.PORT = port;
			devWebpackConfig.devServer.port = port;

			// 添加报错提示
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
				},
				// onErrors              : config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
			}));

			resolve(devWebpackConfig)
		}
	})
});
