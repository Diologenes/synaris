import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import collection from './modules/collection'
import article from './modules/article'

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		settings,
		collection,
		article
	}
})
