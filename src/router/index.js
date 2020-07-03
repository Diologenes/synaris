import constants from '@/config/constants'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/vuex/index'

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

router.afterEach((to, from) => {
	// console.log('ROUTE AFTER', to, from)
	if (to.meta.belongsTo === constants.router.belongsTo.library) {
		store.dispatch('article/lastRoute', to.fullPath)
	}
})

export default router
