import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		category
	}
})
