const PATH = require('path');
const JS_PATH = PATH.join(__dirname, './src/js');
const JS_DIST_PATH = PATH.join(__dirname, './');


module.exports = [{
	entry: {
		'mock/common/js/bundle': JS_PATH + '/Main.js', //ベースとなるjs
	},
	output: {
		path: JS_DIST_PATH,
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							'modules': false
						}]
					]
				}
			}],
			exclude: /node_modules/,
		}]
	},
	devtool: 'source-map'
}];