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
			builderOptions: {
        files: ['**/*'],
        extraFiles: [
          {
            "from": "src/database/storage",
            "to": "src/database/storage",
            "filter": ["**/*"]
          },
        ],
				appId: 'com.braindump.app', // appId
				// nsis (nullsoft scriptable install system) - windows installer
				nsis: {
					oneClick: true, // oneClick disabled: more options during install
					allowToChangeInstallationDirectory: false // user can change target install directory
				}
			}
		}
	}
}
