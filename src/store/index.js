import Vue from 'vue'
import Vuex from 'vuex'
import collection from './modules/collection'

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		collection
	}
})
