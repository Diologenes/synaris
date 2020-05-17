import Vue from 'vue'
import Vuex from 'vuex'
import library from './modules/library'
var sqlite3 = require('sqlite3').verbose()

const path = require('path')
const dbPath = "./sqlite.db"

console.log(path)
console.log(dbPath)

let db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error(err)
	} else {
		console.log('Connected to the database.')
	}
})

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		library
	}
})
