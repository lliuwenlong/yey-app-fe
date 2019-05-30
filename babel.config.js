module.exports = {
	presets: [
		'@vue/app'
	],
	
// 	plugins: [
//     ['import', {
//       libraryName: 'vant',
//       libraryDirectory: 'es',
//       style: true
//     }, 'vant']
//   ]，
	"plugins": [
		[
			"component",
			{
				"libraryName": "element-ui",
				"styleLibraryName": "theme-chalk"
			}
		]
	]
}
