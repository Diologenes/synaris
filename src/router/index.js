import constants from '@/config/constants'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/index'

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

router.afterEach((to) => {
	if (to.meta.belongsTo === constants.router.belongsTo.library) {
		store.dispatch('article/lastRoute', to.fullPath)
	}
})

export default router
