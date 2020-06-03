import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import routes
import index from '@/routes/pages/Index/Index'
import categoryList from '@/routes/pages/CategoryList/Index'
import articleList from '@/routes/pages/ArticleList/Index'
import articleShow from '@/routes/pages/ArticleShow/Index'
import search from '@/routes/pages/Search/Index'
import settings from '@/routes/pages/Settings/Index'

// route definitions
export const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			children: [
				{
					path: '/categories',
					name: 'categoryList',
					component: categoryList,
					children: [
						{
							path: ':category',
							name: 'articleList',
							component: articleList,
							children: [
								{
									path: ':article',
									name: 'articleShow',
									component: articleShow
								}
							]
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
	console.log('Route from', from, 'Route to', to)

	if (from.name === null) {
		next()
		// Database.checkConnection().then(() => {
		// 	next()
		// });
	} else {
		next()
	}
})
