import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import routes
import index from '@/routes/Index'
import mode from '@/routes/Mode'
import library from '@/routes/Library'
import article from '@/routes/Article'

// route definitions
export const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			children: [
				{
					path: '/:mode',
					name: 'mode',
					component: mode,
					children: [
						{
							path: '/:library',
							name: 'library',
							component: library,
							children: [
								{
									path: '/:article',
									name: 'article',
									component: article
								}
							]
						}
					]
				}
			]
		}
	]
})
