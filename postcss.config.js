module.exports = ctx => ({
	"map": {inline: false},
	"plugins": [
		require("postcss-cssnext"),
		require("postcss-import"),
		require("postcss-url"),
		require("postcss-calc"),
		require("postcss-custom-properties"),
		require("cssnano"),
	]
});
