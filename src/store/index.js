import Vue from 'vue'
import Vuex from 'vuex'
import channel from './modules/channel'

// store
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		channel
	}
})