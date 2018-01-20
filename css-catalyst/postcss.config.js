module.exports = {
	'use': [
		'postcss-cssnext',
		'postcss-import'
	],
	'autoprefixer': {
		'browsers': '> 5%'
	},
	'postcssCssnext': {
		'features': {
			'autoprefixer': true,
			'customProperties': false,
		}
	}
};
