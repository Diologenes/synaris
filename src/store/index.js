import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import collection from './modules/collection'
import article from './modules/article'
import search from './modules/search'

// store
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		settings,
		collection,
		article,
		search
	}
})
