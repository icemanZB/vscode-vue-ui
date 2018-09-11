const path = require('path');
const config = require('./config');
const utils = require("./utils");
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const complexEntry = Object.assign(
	utils.getEntries("./src/pages/**/*.js"),
	utils.getComponents('./src/components/common/*.vue')
);

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry  : complexEntry,
	output : {
		path      : config.build.assetsRoot,
		filename  : '[name].js',
		publicPath: config.build.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias     : {
			'vue$': 'vue/dist/vue.esm.js',
			'@'   : resolve('src'),
		}
	},
	module : {
		rules: [
			{
				test   : /\.vue$/,
				loader : 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: `file?name=${config.dev.assetsSubDirectory}/img/[name].[ext]`
			},
			// {
			// 	test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			// 	use: `url-loader?name=${config.dev.assetsSubDirectory}/img/[name].[ext]`
			// },
			{
				test  : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: `file?name=${config.dev.assetsSubDirectory}/fonts/[name].[ext]`
			}
		]
	}
};
