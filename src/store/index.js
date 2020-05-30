import Vue from 'vue'
import Vuex from 'vuex'
import folder from './modules/folder'

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		folder
	}
})
