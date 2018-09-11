let glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const notifier = require('node-notifier');

// 生成版本控制号
exports.getVersion = () => {
	let date = new Date();
	let fix = (num) => num < 10 ? `0${num}` : num;

	let year    = date.getFullYear().toString(),
	    month   = fix(date.getMonth() + 1),
	    day     = fix(date.getDate()),
	    hours   = fix(date.getHours()),
	    minutes = fix(date.getMinutes()),
	    seconds = fix(date.getSeconds());

	return year + month + day + hours + minutes + seconds;
};

// 多页配置
exports.getEntries = (globPath) => {

	let entries = {};

	glob.sync(globPath).forEach((entry) => {
		let tmp = entry.split('/').splice(-3);
		let moduleName = tmp.slice(1, 2);
		entries[moduleName] = entry;
	});

	return entries;
};

// 提取公共的 components
exports.getComponents = (globPath) => {
	let aPaths = glob.sync(globPath);
	return aPaths.length === 0 ? null : {'components': aPaths};
};

// cssLoaders
exports.cssLoaders = function (options) {
	options = options || {};

	const cssLoader = {
		loader : 'css-loader',
		options: {
			sourceMap: options.sourceMap
		}
	};

	const postcssLoader = {
		loader : 'postcss-loader',
		options: {
			sourceMap: options.sourceMap
		}
	};

	function generateLoaders(loader, loaderOptions) {
		const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

		if (loader) {
			loaders.push({
				loader : loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}

		// 生产环境要使用 extract-text-webpack-plugin
		if (options.extract) {
			return ExtractTextPlugin.extract({
				use     : loaders,
				fallback: 'vue-style-loader'
			});
		} else {
			return ['vue-style-loader'].concat(loaders)
		}
	}

	return {
		css    : generateLoaders(),
		less   : generateLoaders('less'),
		postcss: generateLoaders(),
	}
};

// 生成css文件(不包括 .vue)
exports.styleLoaders = function (options) {
	const output = [];
	const loaders = exports.cssLoaders(options);

	for (const extension in loaders) {
		const loader = loaders[extension];
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use : loader
		})
	}

	return output
};

exports.createNotifierCallback = () => {

	return (severity, errors) => {
		if (severity !== 'error') return;

		const error = errors[0];
		const filename = error.file && error.file.split('!').pop();

		notifier.notify({
			message : severity + ': ' + error.name,
			subtitle: filename || ''
		})
	}
};