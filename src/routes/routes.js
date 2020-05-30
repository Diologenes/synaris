import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import routes
import index from '@/routes/pages/Index'
import category from '@/routes/pages/Category'
import article from '@/routes/pages/Article'
import search from '@/routes/pages/Search'
import settings from '@/routes/pages/Settings'

// route definitions
export const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			children: [
				{
					path: '/category',
					name: 'category',
					component: category,
					children: [
						{
							path: '/:article',
							name: 'article',
							component: article
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
