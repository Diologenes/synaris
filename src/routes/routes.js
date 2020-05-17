import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import routes
import index from '@/routes/Index'
import library from '@/routes/Library'
import article from '@/routes/Article'
import search from '@/routes/Search'
import settings from '@/routes/Settings'

// route definitions
export const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			children: [
				{
					path: '/library',
					name: 'library',
					component: library,
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
