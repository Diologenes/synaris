import Vue from 'vue'
import Vuex from 'vuex'
import library from './modules/library'
var sqlite3 = require('sqlite3').verbose();

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		library
	}
})