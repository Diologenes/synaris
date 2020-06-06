import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import routes
import index from '@/views/Index/Index'
import categoryList from '@/views/CategoryList/Index'
import articleList from '@/views/ArticleList/Index'
import articleShow from '@/views/ArticleShow/Index'
import search from '@/views/Search/Index'
import settings from '@/views/Settings/Index'

// route definitions
const routes = [
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

const router = new VueRouter({
	routes
})

export default router
