const db = require('@/database/models')

// default state
const getDefaultState = () => {
	return {
		collections: null,
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	collections(state) {
		return state.collections
	},
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	collections(state, value) {
		state.collections = value
	},
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	update(context, value) {
		context.commit('collections', value)
	},

	getAll(context) {
		let vm = this
		return new Promise((resolve) => {
			db.Collection.findAll({
				order: [
					['sorting', 'ASC'],
					[db.Category, 'sorting', 'ASC']
				],
				include: [{ model: db.Category }]
			})
				.then((response) => {
					context.commit('collections', response)
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
