var sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

// database class
export default class Database {
	// constructor
	constructor() {
		this.dbPath = './sqlite.db'
	}

	// check db connection on start
	checkConnection() {
		return new Promise((resolve) => {
			fs.access(this.dbPath, fs.F_OK, (err) => {
				if (err) {
					this.createDatabase().then(() => {
						resolve()
					})
				} else {
					resolve()
				}
			})
		})
	}

	// create database
	createDatabase() {
		return new Promise((resolve) => {
			let db = new sqlite3.Database(this.dbPath, (err) => {
				const sqlTables = [
					'CREATE TABLE "libraries" ("id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,"uuid" TEXT UNIQUE,"group" INTEGER,"title"	TEXT,"sorting" INTEGER);',
					'CREATE TABLE "article" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, "uuid" TEXT UNIQUE, "title" TEXT, "content" TEXT, "labels" TEXT);'
				]
				// iterate through table creation
				sqlTables.forEach((value) => {
					console.log(value)
					db.run(value)
				})
				resolve(db)
			})
		})
	}
}
