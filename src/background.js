'use strict'
const electron = require('electron')
const { app, protocol, BrowserWindow } = electron

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		show: false,
		minWidth: 800,
		width: 800,
		minHeight: 600,
		height: 600,
		frame: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			nodeIntegration: true
		}
	})

	const splash = new BrowserWindow({ width: 280, height: 160, transparent: true, frame: false, alwaysOnTop: true })
	// // @TODO: Is this needed? => createProtocol('app')
	createProtocol('app')
	splash.loadURL('app://./loading.html')

	mainWindow.webContents.on('new-window', function(event) {
		event.preventDefault()
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
	} else {
		createProtocol('app')
		mainWindow.loadURL('app://./index.html')
	}

	mainWindow.once('ready-to-show', () => {
		setTimeout(() => {
			splash.destroy()
			mainWindow.maximize()
			mainWindow.show()
		}, 250)
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

app.on('ready', async () => {
	createWindow()
})

if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
