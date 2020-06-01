const db = require('@/database/models')
const Op = db.Sequelize.Op

// default state
const getDefaultState = () => {
	return {
		articles: null,
		currentArticle: null
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
	}
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	update(context, value) {
		context.commit('articles', value)
	},

	currentArticle(context, value) {
		context.commit('currentArticle', value)
	},

	getByCategory(context, payload) {
		let vm = this

		let query = {}
		query.categoryId = payload.category // join category id
		let searchWord = payload.searchWord // let searchword
		if (typeof searchWord !== 'undefined' && searchWord.length > 0) {
			// if searchword exists

			// clean up searchword(s) and split it into an array
			let searchWordArray = searchWord
				.trim()
				.replace(/\s{2,}/g, ' ')
				.split(' ')

			// build subqueries
			let subQuery = []
			searchWordArray.forEach((searchWord) => {
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

		return new Promise((resolve) => {
			db.Article.findAll({
				where: query
			})
				.then((response) => {
					context.commit('articles', response)
					resolve(response)
				})
				.catch((e) => console.error(e))
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
