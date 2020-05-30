const db = require('@/database/models')

// default state
const getDefaultState = () => {
	return {
		categories: null,
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	categories(state) {
		return state.categories
	},
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	categories(state, value) {
		state.categories = value
	},
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	update(context, value) {
		context.commit('categories', value)
	},

	getAll(context) {
		let vm = this
		return new Promise((resolve) => {
			db.Folder.findAll({
				order: [
					['sorting', 'ASC'],
					[db.Category, 'sorting', 'ASC']
				],
				include: [{ model: db.Category }]
			})
				.then((response) => {
					context.commit('categories', response)
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
