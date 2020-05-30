const db = require('@/database/models')

// default state
const getDefaultState = () => {
	return {
		articles: null
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	articles(state) {
		return state.articles
	}
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	articles(state, value) {
		state.articles = value
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

	getByCategory(context, payload) {
		let vm = this
		return new Promise((resolve) => {
			db.Article.findAll({
				where: {
					categoryId: payload.category
				}
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
