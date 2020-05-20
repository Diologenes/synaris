// var sqlite3 = require('sqlite3').verbose()
// const fs = require('fs')

// // database class
// class Database {
// 	// constructor
// 	constructor() {
// 		this.dbPath = './sqlite.db'
// 	}

// 	// check db connection on start
// 	checkConnection() {
// 		return new Promise((resolve) => {
// 			fs.access(this.dbPath, fs.F_OK, (err) => {
// 				if (err) {
// 					this.createDatabase().then(() => {
// 						resolve()
// 					})
// 				} else {
// 					resolve()
// 				}
// 			})
// 		})
// 	}

// 	// create database
// 	createDatabase() {
// 		return new Promise((resolve) => {
// 			let db = new sqlite3.Database(this.dbPath, (err) => {
// 				const sqlTables = [
// 					'CREATE TABLE "libraries" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,"uuid" TEXT UNIQUE, "parent" INTEGER, "group" INTEGER,"title" TEXT,"sorting" INTEGER);',
// 					'CREATE TABLE "groups" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,"uuid" TEXT UNIQUE, "title" TEXT,"sorting" INTEGER);',
// 					'CREATE TABLE "articles" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, "uuid" TEXT UNIQUE, "title" TEXT, "content" TEXT, "labels" TEXT);'
// 				]
// 				// iterate through table creation
// 				sqlTables.forEach((value) => {
// 					console.log(value)
// 					db.run(value)
// 				})
// 				resolve(db)
// 			})
// 		})
// 	}

// 	addLibrary() {
// 		console.log('check')
// 		let db = new sqlite3.Database(this.dbPath)
// 		db.run(`INSERT INTO libraries(title,sorting) VALUES('2', 3)`, function(err) {
// 			if (err) {
// 				return console.log(err.message)
// 			}
// 			// get the last insert id
// 			console.log(`A row has been inserted with rowid ${this.lastID}`)
// 		})
// 	}

// 	getLibraries() {
// 		return this.sqlQueryAll('SELECT * FROM libraries ORDER BY sorting ASC')
// 	}

// 	updateLibrarySorting(idArray) {
// 		let vm = this
// 		idArray.forEach((item, index) => {
// 			vm.sqlQueryRun('UPDATE libraries SET sorting = ? WHERE id = ?', [index,item])
// 		})
// 	}

// 	sqlQueryAll(query) {
// 		return new Promise((resolve, reject) => {
// 			let db = new sqlite3.Database(this.dbPath)
// 			db.all(query, [], (err, rows) => {
// 				if (err) {
// 					reject(err)
// 				} else {
// 					resolve(rows)
// 				}
// 			})
// 			db.close()
// 		})
// 	}

// 	sqlQueryRun(query, params) {
// 		return new Promise((resolve, reject) => {
// 			let db = new sqlite3.Database(this.dbPath)
// 			db.run(query, params, (err) => {
// 				if (err) {
// 					reject(err)
// 					console.error('sqlQueryRun', error)
// 				} else {
// 					resolve()
// 					console.log('sqlQueryRun', query, params)
// 				}
// 			})
// 			db.close()
// 		})
// 	}
// }

// export default new Database()
