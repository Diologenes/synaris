import electronFileStorage from '@/store/electron/Index'
import constants from '@/config/constants'
const fs = require('fs')
const path = require('path')
const sqlitePath = electronFileStorage.get('sqlitePath')
const templatePath = path.join(process.cwd(), constants.defaults.database.templateFilePath)

export default async function dbInstaller() {
	console.log('DB Installer')
	console.log('Searching DB file in: ' + sqlitePath)
	if (fs.existsSync(sqlitePath)) {
		console.log('File exists. OK')
	} else {
        console.log('File not found. Copy templte sqlite file from: ' + templatePath)
        fs.copyFileSync(templatePath, sqlitePath)
        console.log('File copied in: ' + sqlitePath)
        console.log('DB Installer finished')
	}
}
