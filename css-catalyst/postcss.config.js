module.exports = {
	use: [
		'postcss-cssnext'
	]
	'autoprefixer': {
		browsers: '> 5%'
	},
	'postcssCssnext': {
		features: {
			autoprefixer: true,
			customProperties: false,
		}
	}
};
