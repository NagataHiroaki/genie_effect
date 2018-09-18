module.exports = {
	plugins: [
		require('autoprefixer')({
			browsers: [
				"last 2 versions",
				"not ie < 11",
				"Android >= 4",
				"iOS >= 10"
			],
			grid: true
		})
	],
};