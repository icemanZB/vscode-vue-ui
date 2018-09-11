const path = require('path');

module.exports = {
	dev: {
		// Path
		assetsSubDirectory: 'static',
		assetsPublicPath  : '/',
		proxyTable        : {
			'/api': {
				target      : ['http://99.248.1.220','http://99.48.7.44:80'][0],
				changeOrigin: true,
				pathRewrite : {
					// '^/api': ''
					'^/api': '/api'
				}
			}
		},

		// devServer 配置
		host           : 'localhost',
		port           : 8090,
		autoOpenBrowser: false,
		errorOverlay   : true,
		notifyOnErrors : true,
		poll           : false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
		// 开发环境这个速度最快
		devtool        : 'cheap-module-eval-source-map'

	},

	build: {
		// 模板文件
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot         : path.resolve(__dirname, '../dist/'),
		assetsSubDirectory : 'static',
		assetsPublicPath   : '/',
		// js 要使用 sourceMap
		productionSourceMap: true,
		devtool            : '#source-map'
	}
};
