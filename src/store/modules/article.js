const db = require('@/database/models')
const Op = db.Sequelize.Op

// default state
const getDefaultState = () => {
	return {
		articles: null,
		currentArticle: null,
		searchWord: '',
		lastRoute: localStorage.getItem('articleLastRoute') || null
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	articles(state) {
		return state.articles
	},

	currentArticle(state) {
		return state.currentArticle
	},

	searchWord(state) {
		return state.searchWord
	},

	lastRoute(state) {
		return state.lastRoute
	}
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	articles(state, value) {
		state.articles = value
	},

	currentArticle(state, value) {
		state.currentArticle = value
	},

	searchWord(state, value) {
		if (value !== '') {
			value.trim().replace(/\s{2,}/g, ' ')
		}
		state.searchWord = value
	},

	lastRoute(state, value) {
		localStorage.setItem('articleLastRoute', JSON.stringify(value))
		state.lastRoute = value
	}
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	resetArticles(context) {
		context.commit('articles', null)
	},

	update(context, value) {
		context.commit('articles', value)
	},

	resetCurrentArticle(context) {
		context.commit('currentArticle', null)
	},

	setCurrentArticle(context, articleId) {
		return new Promise(resolve => {
			db.Article.findOne({
				where: { id: articleId }
			})
				.then(response => {
					setTimeout(function() {
						context.commit('currentArticle', response)
						resolve(response)
					}, 0)
				})
				.catch(e => console.error(e))
		})
	},

	setSearchWord(context, value) {
		context.commit('searchWord', value)
	},

	getByCategory(context, payload) {
		return new Promise(resolve => {
			let query = {}

			query.categoryId = payload.category // join category id
			if (context.state.searchWord.length > 0) {
				// if searchword exists

				// clean up searchword(s) and split it into an array
				let searchWordArray = context.state.searchWord.split(' ')

				// build subqueries
				let subQuery = []
				searchWordArray.forEach(searchWord => {
					searchWord = `%${searchWord}%`
					subQuery.push({
						[Op.or]: [
							{
								title: {
									[Op.like]: searchWord
								}
							},
							{
								description: {
									[Op.like]: searchWord
								}
							}
						]
					})
				})

				// make sure cleaned up array has elements
				if (searchWordArray.length > 0) {
					query[Op.and] = subQuery
				}
			}

			//ordering
			let orderDirection = 'ASC'
			let isOrderReversed = context.rootState.settings.filterReverseOrder
			let orderColumn = context.rootState.settings.filterOrderBy
			if (orderColumn === 'title') {
				orderColumn = db.Sequelize.fn('UPPER', db.Sequelize.col(orderColumn)) // use uppercase for title in where clause since sqlite is case sensitive
				orderDirection = isOrderReversed ? 'DESC' : 'ASC'
			}
			if (orderColumn === 'updatedAt' || orderColumn === 'visitedAt') {
				orderDirection = isOrderReversed ? 'ASC' : 'DESC'
			}

			// query
			db.Article.findAll({
				where: query,
				order: [
					['isFavourite', 'DESC'],
					[orderColumn, orderDirection]
				]
			})
				.then(response => {
					setTimeout(function() {
						context.commit('articles', response)
						resolve(response)
					}, 0)
				})
				.catch(e => console.error(e))
		})
	},

	lastRoute(context, value) {
		context.commit('lastRoute', value)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
