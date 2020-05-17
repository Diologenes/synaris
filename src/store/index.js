import Vue from 'vue'
import Vuex from 'vuex'
import library from './modules/library'

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		library
	}
})