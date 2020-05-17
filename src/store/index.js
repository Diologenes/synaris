import Vue from 'vue'
import Vuex from 'vuex'
import library from './modules/library'
var sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

const dbPath = './sqlite.db'

console.log(dbPath)
 
fs.access(dbPath, fs.F_OK, (err) => {
	if (err) {
		console.error(err.message)
		let db = new sqlite3.Database(dbPath, (err) => {
			const sqlTables = [
				'CREATE TABLE "libraries" ("id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,"uuid" TEXT UNIQUE,"group" INTEGER,"title"	TEXT,"sorting" INTEGER);',
				'CREATE TABLE "article" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, "uuid" TEXT UNIQUE, "title" TEXT, "content" TEXT, "labels" TEXT);'
			]
			sqlTables.forEach((value) => {
				console.log(value)
				db.run(value)
			})
			console.log('Database created')
		})
	} else {
		let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
			if (err) {
				console.error(err.message)
			} else {
				console.log('Connected to the chinook database.')
			}
		})
	}
})

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		library
	}
})
