import FileStorage from './FileStorage'
const electron = require('electron');
const path = require('path');

const sqlitePath = path.join((electron.app || electron.remote.app).getPath('userData') , 'database.sqlite')
const electronFileStorage = new FileStorage({
	configName: 'user-preferences',
	defaults: {
		databaseDialect: 'sqlite',
    sqlitePath: sqlitePath
	}
})

export default electronFileStorage
