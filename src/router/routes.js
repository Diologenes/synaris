// import routes
import constants from '@/config/constants'
import index from '@/views/Index/Index'
import categoryList from '@/views/CategoryList/Index'
import articleList from '@/views/ArticleList/Index'
import articleShow from '@/views/ArticleShow/Index'
import search from '@/views/Search/Index'

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
				meta: {
					belongsTo: constants.router.belongsTo.library
				},
				children: [
					{
						path: ':category',
						name: 'articleList',
						component: articleList,
						meta: {
							belongsTo: constants.router.belongsTo.library
						},
						children: [
							{
								path: ':article',
								name: 'articleShow',
								component: articleShow,
								meta: {
									belongsTo: constants.router.belongsTo.library
								},
							}
						]
					}
				]
			},
			{
				path: '/search',
				name: 'search',
				component: search
			}
		]
	}
]

export default routes
