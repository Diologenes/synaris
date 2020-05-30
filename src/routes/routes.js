import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import routes
import index from '@/routes/pages/Index'
import collection from '@/routes/pages/Collection'
import category from '@/routes/pages/Category'
import search from '@/routes/pages/Search'
import settings from '@/routes/pages/Settings'

// route definitions
export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			children: [
				{
					path: '/collection',
					name: 'collection',
					component: collection,
					children: [
						{
							path: ':category',
							name: 'category',
							component: category
						}
					]
				},
				{
					path: '/search',
					name: 'search',
					component: search
				},
				{
					path: '/settings',
					name: 'settings',
					component: settings
				}
			]
		}
	]
})


// before each router entry is resolved
router.beforeEach((to, from, next) => {

	if (from.name === null) {
		next()
		// Database.checkConnection().then(() => {
		// 	next()
		// });
	} else {
		next()
	}
})
