module.exports = ctx => ({
	"map": {inline: false},
	"plugins": {
		"cssnano": {preset: 'default'},
		"postcss-cssnext": {},
		"postcss-import": {},
		"postcss-url": {},
		"autoprefixer": {},
		"postcss-custom-properties": {},
		"postcss-calc": {},
	}
});
