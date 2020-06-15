const electron = require('electron')
const path = require('path')
const fs = require('fs')

class FileStorage {
	constructor(parameter) {
		const userDataPath = (electron.app || electron.remote.app).getPath('userData')
		this.path = path.join(userDataPath, parameter.configName + '.json')
		this.data = parseDataFile(this.path, parameter.defaults)
	}

	get(key) {
		return this.data[key]
	}

	set(key, val) {
		this.data[key] = val
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}
}

function parseDataFile(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath))
	} catch (error) {
		return defaults
	}
}

// expose the class
module.exports = FileStorage

// E.G.:
// const store = new Store({
//   configName: 'user-preferences',
//   defaults: {
//     windowBounds: { width: 800, height: 600 }
//   }
// });
// store.set('windowBounds', { width, height });
