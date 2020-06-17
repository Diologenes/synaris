module.exports = {
	css: undefined,
	publicPath: undefined,
	outputDir: undefined,
	runtimeCompiler: true,
	productionSourceMap: undefined,
	parallel: undefined,
	indexPath: 'index.html',
	lintOnSave: false,
	pluginOptions: {
		electronBuilder: {
			// noAppProtocol: true,
			builderOptions: {
				win: {
					icon: './icon.ico'
				},
				files: ['**/*'],
				extraFiles: [
					{
						from: 'src/database/storage',
						to: 'src/database/storage',
						filter: ['**/*']
					}
				],
				appId: 'com.braindump.app', // appId
				// nsis (nullsoft scriptable install system) - windows installer
				nsis: {
					oneClick: true, // oneClick disabled: more options during install
					allowToChangeInstallationDirectory: false // user can change target install directory
				}
			}
		}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => Object.assign(options, { limit: 10240000 }))
		config.externals({
			sqlite3: 'commonjs sqlite3'
		})
	}
}
